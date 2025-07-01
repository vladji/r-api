import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

export interface ShopProps {
  uniqId: string;
  rootProfile?: {
    rootPhone?: string;
  };
  shopProfile: {
    name: string | null;
    shopImage: string | null;
    rating: number | null;
    shopPhone?: string;
    openHours?: {
      from: string | null;
      to: string | null;
    };
    readyTime?: {
      min: number | null;
      max: number | null;
    };
  };
  profileCompleted: boolean;
  hasMenu: boolean;
  enabled: boolean;
  published: boolean;
  credentials: {
    rootPass?: string;
    rootPassHash: string;
    shopAdminPass: string;
    shopAdminPassHash: string;
  };
  menu_id?: mongoose.Types.ObjectId;
}

export type ShopDocument = Document & ShopProps;

const Shop = new Schema<ShopDocument>({
  uniqId: { type: String, unique: true, required: true, },
  rootProfile: {
    rootPhone: { type: String, unique: true, sparse: true },
  },
  shopProfile: {
    name: { type: String, default: null },
    shopPhone: { type: String, unique: true, sparse: true },
    shopImage: { type: String, default: null },
    openHours: {
      from: { type: String, default: null },
      to: { type: String, default: null },
    },
    readyTime: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
    },
    rating: { type: Number, default: null },
  },
  profileCompleted: { type: Boolean, default: false, required: true },
  hasMenu: { type: Boolean, default: false, required: true },
  enabled: { type: Boolean, default: false, required: true },
  published: { type: Boolean, default: false, required: true },
  credentials: {
    rootPass: { type: String },
    rootPassHash: { type: String, required: true },
    shopAdminPass: { type: String, required: true },
    shopAdminPassHash: { type: String, required: true },
  },
  menu_id: { type: ObjectId, ref: "menu" },
}, {
  toJSON: {
    transform(doc: mongoose.Document, ret: any) {
      delete ret._id;
      delete ret.__v;
      delete ret.menu_id;
      delete ret.credentials.rootPassHash;
      delete ret.credentials.shopAdminPassHash;
    }
  }
});

export const ShopSchema = mongoose.model<ShopDocument>("shop", Shop);
