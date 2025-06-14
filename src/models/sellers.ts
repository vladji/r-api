import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

const Seller = new Schema({
  uniq: { type: String, required: true },
  name: { type: String, required: true },
  hash: { type: String, required: true },
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
});

export const SellerSchema = mongoose.model("seller", Seller);
