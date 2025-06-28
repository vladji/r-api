import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

const Shop = new Schema({
  uniqId: { type: String, unique: true, required: true, },
  name: { type: String, default: null, required: true, },
  phone: { type: String, default: null, unique: true, required: true },
  passHash: { type: String, required: true },
  cover: {
    image: { type: String, default: null, required: true },
  },
  openHours: {
    from: { type: String, default: null, required: true },
    to: { type: String, default: null, required: true },
  },
  readyTime: {
    min: { type: Number, default: null, required: true },
    max: { type: Number, default: null, required: true },
  },
  rating: { type: Number },
  menu_id: { type: ObjectId, ref: "menu" },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.passHash;
      delete ret.menu_id;
    }
  }
});

export const ShopSchema = mongoose.model("shop", Shop);
