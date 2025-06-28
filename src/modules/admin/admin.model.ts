import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  uniqId: {
    type: String,
    required: true,
    unique: true,
  },
  passHash: { type: String, required: true },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const AdminSchema = mongoose.model("admin", adminSchema);
