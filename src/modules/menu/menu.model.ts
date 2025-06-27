import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

const Menu = new Schema({
  seller_id: { type: ObjectId },
  menu: [
    {
      section: { type: String, required: true },
      products: [
        {
          image: { type: String },
          name: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
          disabled: { type: Boolean, default: false },
          hide: { type: Boolean, default: false },
        }
      ]
    }
  ]
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const MenuSchema = mongoose.model("menus", Menu);
