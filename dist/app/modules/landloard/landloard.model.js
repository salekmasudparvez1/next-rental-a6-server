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
exports.RentalHouseModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const findBasaDB = mongoose_1.default.connection.useDb(config_1.default.database_name);
// Feature Schema
const FeatureSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
}, { _id: false });
// Comment Schema
const CommentSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    comment: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
}, { timestamps: true, _id: false });
// Main Rental House Schema
const RentalHouseSchema = new mongoose_1.Schema({
    rentalHouseLocation: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    rentAmount: { type: Number, required: true },
    bedroomNumber: { type: Number, required: true },
    landloardId: { type: mongoose_1.Types.ObjectId, required: true, ref: 'users' },
    features: { type: [FeatureSchema], required: false },
    comments: { type: [CommentSchema], required: false },
    images: { type: [String], required: false },
}, {
    timestamps: true,
    versionKey: false,
    collection: 'rentalHouses',
});
exports.RentalHouseModel = findBasaDB.model('rentalHouses', RentalHouseSchema);
//# sourceMappingURL=landloard.model.js.map