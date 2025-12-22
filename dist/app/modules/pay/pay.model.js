"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const auth_model_1 = require("../auth/auth.model");
const landloard_model_1 = require("../landloard/landloard.model");
const findBasaDB = mongoose_1.default.connection.useDb(config_1.default.database_name);
const paySchema = new mongoose_1.Schema({
    houseName: { type: String, requird: true },
    rentalAmout: { type: String, requird: true },
    countDay: { type: Number, requird: true },
    tenandId: { type: mongoose_1.Schema.Types.ObjectId, requird: true, ref: auth_model_1.Signup },
    landloardid: { type: mongoose_1.Schema.Types.ObjectId, requird: true, ref: auth_model_1.Signup },
    rentalHouseId: { type: mongoose_1.Schema.Types.ObjectId, requird: true, ref: landloard_model_1.RentalHouseModel },
    currency: { type: String, requird: true },
    paymentStatus: { type: String, enum: ["pending", "failed", "success"], default: "pending", requird: true, }
}, {});
exports.PayModel = findBasaDB.model('payment', paySchema);
//# sourceMappingURL=pay.model.js.map