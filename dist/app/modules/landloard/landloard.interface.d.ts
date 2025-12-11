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
    rentalHouseLocation: string;
    description: string;
    rentAmount: number;
    bedroomNumber: number;
    landloardId: Types.ObjectId;
    images: string[];
    features?: IFeature[];
    comments?: IComment[];
}
export interface TRealHomeModel {
    findByLocation(location: string): Promise<IRentalHouse[]>;
    addComment(houseId: string, comment: IComment): Promise<IRentalHouse | null>;
}
//# sourceMappingURL=landloard.interface.d.ts.map