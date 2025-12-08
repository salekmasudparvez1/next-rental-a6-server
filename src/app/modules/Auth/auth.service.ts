import { IUserCreate, TLoginUser } from './auth.interface';
import { Signup } from './auth.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from './auth.utils';
import config from '../../config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


const signupFunc = async (registraionDoc: IUserCreate) => {
  const res = await Signup.create(registraionDoc);
  return res;
};

const loginFunc = async (payload: TLoginUser) => {
  const session = await mongoose.startSession(); 
  session.startTransaction();

  try {
    const user = await Signup.findOne({ email: payload?.email }).session(session);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found😒');
    }
    if (user?.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked 🤡');
    }
    if (!(await Signup.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Incorrect Password😵‍💫');
    }

    const jwtPayload = {
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
        name: user?.name,
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
