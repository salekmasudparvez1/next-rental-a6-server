import mongoose, { Types } from 'mongoose';
import { IRentalHouse } from './landloard.interface';
export declare const RentalHouseModel: mongoose.Model<IRentalHouse, {}, {}, {}, mongoose.Document<unknown, {}, IRentalHouse, {}, mongoose.DefaultSchemaOptions> & IRentalHouse & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, IRentalHouse>;
//# sourceMappingURL=landloard.model.d.ts.map