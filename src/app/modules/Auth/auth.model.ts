import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import { IUserCreate, TLogin } from './auth.interface';
import config from '../../config';


const portfolioDB = mongoose.connection.useDb(config.database_name as string);

const signUpSchema = new Schema(
  {
    name: { type: String, required: true,  },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'landlord','tenant'], required: true },
    isBlocked: { type: Boolean, default: false, required: true },
    isActive: { type: Boolean, default: true, required: true },
    photoURL: { type: String, required:true},
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users',
  },
);
signUpSchema.pre('save', async function () {
  const data = this;
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bcrypt_salt_rounds),
  );
});
signUpSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
signUpSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await Signup.findOne({ email }).select('+password');
};

export const Signup = portfolioDB.model<IUserCreate, TLogin>('users', signUpSchema);
