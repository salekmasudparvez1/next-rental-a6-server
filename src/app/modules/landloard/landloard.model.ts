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

// Location Schema
const LocationSchema = new Schema(
  {
    division: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    subDistrict: { type: String, required: true, trim: true },
    streetAddress: { type: String, required: true, trim: true },
    map: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { _id: false },
);

// Main Rental House Schema
const RentalHouseSchema = new Schema<IRentalHouse>(
  {
    title: { type: String, required: true, trim: true },
    location: { type: LocationSchema, required: true },
    description: { type: String, required: true },
    rentAmount: { type: Number, required: true },
    bedroomNumber: { type: Number, required: true },
    status: { type: String, enum: ["available", "rented", "maintenance"], default: "available" },
    isPublished: { type: Boolean, default: false },
    landloardId: { type:  mongoose.Schema.Types.ObjectId, required: true },
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



export const RentalHouseModel = findBasaDB.model<IRentalHouse>('RentalHouses', RentalHouseSchema);


