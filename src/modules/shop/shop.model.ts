import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

const Shop = new Schema({
  uniqId: { type: String, unique: true, required: true, },
  name: { type: String, default: null, required: true, },
  phone: { type: String, default: null, unique: true, required: true },
  passHash: { type: String, required: true },
  cover: {
    image: { type: String, default: null },
  },
  openHours: {
    from: { type: String, default: null, required: true },
    to: { type: String, default: null, required: true },
  },
  rating: { type: Number, default: null },
  readyTime: {
    min: { type: Number, default: null, required: true },
    max: { type: Number, default: null, required: true },
  },
  menu_id: { type: ObjectId, ref: "menu", default: null, },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const ShopSchema = mongoose.model("shop", Shop);
