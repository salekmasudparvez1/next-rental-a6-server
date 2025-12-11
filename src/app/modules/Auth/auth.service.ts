import { IUserCreate, TLoginUser } from './auth.interface';
import { Signup } from './auth.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from './auth.utils';
import config from '../../config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


const signupFunc = async (registraionDoc: IUserCreate) => {
  console.log(registraionDoc);
  if (registraionDoc?.role === 'admin') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Admin registration is not allowed');
  }
  if (registraionDoc?.username) {
    const existingUser = await Signup.findOne({ username: registraionDoc?.username });
    if (existingUser) {
      throw new AppError(StatusCodes.CONFLICT, 'Username already exists');
    }
  }
  if (registraionDoc?.email) {
    const existingEmail = await Signup.findOne({ email: registraionDoc?.email });
    if (existingEmail) {
      throw new AppError(StatusCodes.CONFLICT, 'Email already exists');
    }
   
  } 
  if (registraionDoc?.username && /\s/.test(registraionDoc?.username)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Username cannot contain whitespace');
  }
  const res = await Signup.create(registraionDoc);
  return res;
};

// Helper to safely build a case-insensitive exact-match RegExp from arbitrary input
const escapeRegExp = (s: string) =>s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Allow login using either username OR email + password.
 * - Accepts payload.email or payload.username or payload.identifier (preferred generic name).
 * - Performs case-insensitive lookup for both username and email.
 */
export const loginFunc = async (payload: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Accept multiple possible identifier fields for flexibility
    const rawIdentifier =
      (payload?.identifier ?? payload?.email ?? payload?.username)?.toString().trim();
    const password = payload?.password;

    if (!rawIdentifier || !password) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Identifier (email or username) and password are required'
      );
    }

    // Use case-insensitive exact-match search on both email and username.
    // Escaping prevents regex injection if identifier contains special chars.
    const safe = escapeRegExp(rawIdentifier);
    const query = {
      $or: [
        { email: new RegExp(`^${safe}$`, 'i') },
        { username: new RegExp(`^${safe}$`, 'i') },
      ],
    };

    const user = await Signup.findOne(query).session(session);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found 😒');
    }

    if (user?.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked 🤡');
    }

    // Assuming Signup.isPasswordMatched(plainText, hashed) is a static helper
    if (!(await Signup.isPasswordMatched(password, user?.password))) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Incorrect Password 😵‍💫');
    }

    const jwtPayload = {
      id: user._id,
      email: user?.email,
      role: user?.role,
    };

    const accessToken = generateToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );

    const refreshToken = generateToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );

    await session.commitTransaction();
    session.endSession();

    return {
      accessToken,
      refreshToken,
      userInfo: {
        username: user?.username,
        email: user?.email,
        role: user?.role,
        photoURL: user?.photoURL,
      },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllUsersFunc = async () => {
  const users = await Signup.find();
  return users;
}
interface TUpdateDoc {
  id: string,
  action: string
}
const statusFuc = async (payload: TUpdateDoc) => {
  const users = await Signup.findById(payload?.id);
  if (!users) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
  }
  if (users?.role === "admin") {
    throw new AppError(StatusCodes.FORBIDDEN, `Admin's status can not be changed`)
  }
  if (!payload?.action) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid action')
  }
  if (payload?.action === 'block') {
    const res = await Signup.findByIdAndUpdate(payload?.id, { isBlocked: true });
    return res;
  }
  if (payload?.action === 'active') {
    const res = await Signup.findByIdAndUpdate(payload?.id, { isActive: true });
    return res;
  }
  if (payload?.action === 'deactive') {
    const res = await Signup.findByIdAndUpdate(payload?.id, { isActive: false });
    return res;
  }

}
const updatePasswordFunc = async (payload: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await Signup.findOne({ email: payload?.email }).session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const isMatchPassword = await bcrypt.compare(payload?.cpassword, user?.password);
    if (!isMatchPassword) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Incorrect current password');
    }

    const newpass = await bcrypt.hash(
      payload?.npassword,
      Number(config.bcrypt_salt_rounds)
    );
    if (!newpass) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error in password hash');
    }

    const res = await Signup.updateOne({ email: payload?.email }, { password: newpass }).session(session);

    await session.commitTransaction();
    session.endSession();

    return res;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getSingleUserFunc = async (email: string) => {

  const res = await Signup.findOne({ email });
  return res
};
const updateNameFunc = async (payload: any) => {

  if (!payload?.email) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not found');
  }
  if (!payload?.name) {
    throw new AppError(StatusCodes.NO_CONTENT, "NO name found")
  }
  try {

    const data = await Signup.updateOne({ email: payload?.email }, {
      $set: {
        name: payload?.name
      }
    })
    const result = data?.modifiedCount > 0 ? { name: payload?.name } : {}
    return result;
  } catch (error) {

    throw new AppError(StatusCodes.BAD_REQUEST, 'Can not update Profile');
  }
};

export const authService = {
  signupFunc,
  loginFunc,
  getAllUsersFunc,
  statusFuc,
  updatePasswordFunc,
  getSingleUserFunc,
  updateNameFunc
};
