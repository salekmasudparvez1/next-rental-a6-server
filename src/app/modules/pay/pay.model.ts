import mongoose, { Schema } from "mongoose";
import config from "../../config";
import { IpayProduct } from "./pay.interface";
import { Signup } from "../auth/auth.model";
import { RentalHouseModel } from "../landloard/landloard.model";


const findBasaDB = mongoose.connection.useDb(config.database_name as string);

const paySchema = new Schema(
    {
        houseName: { type: String, requird: true },
        rentalAmout: { type: String, requird: true },
        countDay: { type: Number, requird: true },
        tenandId: { type: Schema.Types.ObjectId, requird: true, ref: Signup },
        landloardid: { type: Schema.Types.ObjectId, requird: true, ref: Signup },
        rentalHouseId: { type: Schema.Types.ObjectId, requird: true, ref: RentalHouseModel },
        currency: { type: String, requird: true },
        paymentStatus: { type: String, enum: ["pending", "failed", "success"], default: "pending", requird: true, }
    },
    {}
)

export const PayModel = findBasaDB.model<IpayProduct>('payment', paySchema);

