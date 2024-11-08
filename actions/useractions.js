"use server";
import Razorpay from "razorpay";
import User from "@/models/user";
import connectDb from "@/db/connectDB";
import Payment from "@/models/payment";

export const initiatePayment = async (amount, to_username, paymentform) => {
  // connecting to the database.
  await connectDb();

  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;
  const id = user.razorpayid;

  //  creating a new Razorpay object with API credentials.
  var instance = new Razorpay({
    key_id: id,
    key_secret: secret,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };
  // it will generate order id
  let x = await instance.orders.create(options);
  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });
  return x;
};
export default initiatePayment;

export const fetchuser = async (username) => {
  await connectDb();
  let user = await User.findOne({ username: username });
  let userobj = user.toObject({ flattenObjectIds: true });
  return userobj;
};

export const fetchPayments = async (username) => {
  await connectDb();
  // to fetch payments only which have "done : true" status
  let payment = Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean();
  return payment;
};

export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata = Object.fromEntries(data);
  // if the username is updated , check if the username is available
  if (oldusername !== ndata.username) {
    let existingData = await User.findOne({ username: ndata.username });
    if (existingData) {
      return { error: "username already exist" };
    }
    await User.updateOne({ email: ndata.email }, ndata);
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username }
    );
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
};
