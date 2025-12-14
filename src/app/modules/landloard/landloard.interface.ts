import { Types } from "mongoose";

export interface IFeature {
  name: string;
  color: string;
}

export interface IComment {
  userId: string;
  comment: string;
  rating: number;
}

export interface IRentalHouse {
  title: string;
  location: string;
  description: string;
  rentAmount: number;
  bedroomNumber: number;
  landloardId: Types.ObjectId;
  images: string[];
  status: "available" | "rented" | "maintenance";
  isPublished: boolean;
  features?: IFeature[];
  comments?: IComment[];
}

export interface TRealHomeModel {
  findByLocation(location: string): Promise<IRentalHouse[]>;
  addComment(houseId: string, comment: IComment): Promise<IRentalHouse | null>;
}

