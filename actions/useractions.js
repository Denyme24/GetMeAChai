"use server";
import Razorpay from "razorpay";
import User from "@/models/user";
import connectDb from "@/db/connectDB";
import Payment from "@/models/payment";

export const initiatePayment = async (amount, to_username, paymentform) => {
  // connecting to the database.
  await connectDb();

  //  creating a new Razorpay object with API credentials.
  var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };
  // it will generate order id
  let x = await instance.orders.create(options);
  await Payment.create({
    oid: x.id,
    amount: amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });
  return x;
};
export default initiatePayment;
