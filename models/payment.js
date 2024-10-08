import mongoose from "mongoose";
const { Schema, model } = mongoose;
import connectDB from "@/db/connectDB";

const paymentSchema = new Schema({
  name: { type: String, required: true },
  to_user: { type: String, required: true },
  oid: { type: String, required: true },
  message: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  done: { type: Boolean, default: false },
});
await connectDB();
// Check if the model already exists before defining it
const Payment = mongoose.models.payment || model("payment", paymentSchema);

export default Payment;
