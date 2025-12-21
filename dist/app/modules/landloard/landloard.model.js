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
// Location Schema
const LocationSchema = new mongoose_1.Schema({
    division: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    subDistrict: { type: String, required: true, trim: true },
    streetAddress: { type: String, required: true, trim: true },
    map: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
}, { _id: false });
// Main Rental House Schema
const RentalHouseSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    location: { type: LocationSchema, required: true },
    description: { type: String, required: true },
    rentAmount: { type: Number, required: true },
    bedroomNumber: { type: Number, required: true },
    status: { type: String, enum: ["available", "rented", "maintenance"], default: "available" },
    isPublished: { type: Boolean, default: false },
    landloardId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    features: { type: [FeatureSchema], required: false },
    comments: { type: [CommentSchema], required: false },
    images: { type: [String], required: false },
}, {
    timestamps: true,
    versionKey: false,
    collection: 'rentalHouses',
});
exports.RentalHouseModel = findBasaDB.model('RentalHouses', RentalHouseSchema);
//# sourceMappingURL=landloard.model.js.map