import { IUserCreate } from "../auth/auth.interface";
export interface IpayProduct extends IPayLoadData {
    rentalAmout: string;
    countDay: number;
    currency: string;
    paymentStatus: "pending" | "failed" | "success";
}
export interface IPayLoadData {
    houseName: string;
    tenandId: IUserCreate;
    landloardid: string;
    rentalHouseId: string;
}
//# sourceMappingURL=pay.interface.d.ts.map