import mongoose, { Schema, Model, Types } from 'mongoose';
import config from '../../config';
import { IRentalHouse } from './landloard.interface';

const findBasaDB = mongoose.connection.useDb(config.database_name as string);

// Feature Schema
const FeatureSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
  },
  { _id: false },
);

// Comment Schema
const CommentSchema = new Schema(
  {
    userId: { type: String, required: true },
    comment: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
  },
  { timestamps: true, _id: false },
);

// Main Rental House Schema
const RentalHouseSchema = new Schema<IRentalHouse>(
  {
    rentalHouseLocation: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    rentAmount: { type: Number, required: true },
    bedroomNumber: { type: Number, required: true },
    landloardId: { type: Types.ObjectId, required: true, ref: 'users' },
    features: { type: [FeatureSchema], required: false },
    comments: { type: [CommentSchema], required: false },
    images: { type: [String], required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'rentalHouses',
  },
);



export const RentalHouseModel = findBasaDB.model<IRentalHouse>('rentalHouses', RentalHouseSchema);


