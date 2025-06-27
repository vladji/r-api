import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

const Seller = new Schema({
  uniqId: { type: String, required: true, unique: true, },
  name: { type: String, required: true },
  phone: { type: String, unique: true },
  passHash: { type: String, required: true },
  cover: {
    image: { type: String, required: true },
  },
  hours: {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  rating: { type: Number },
  delivery: {
    period_min: { type: Number, required: true },
    period_max: { type: Number, required: true },
  },
  menu_id: { type: ObjectId },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const SellerSchema = mongoose.model("seller", Seller);
