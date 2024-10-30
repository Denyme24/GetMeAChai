import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDB";
import User from "@/models/user";

export const POST = async (req) => {
  await connectDb();
  let body = await req.formData();
  body = Object.fromEntries(body);
  let p = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ success: false, message: "Order ID not found" });
  }
  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: p.to_user });
  const secret = user.razorpaysecret;
  let verifyPayment = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret
  );

  if (verifyPayment) {
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true }
    );
    
    // Using temporary redirect with status 302
    return NextResponse.redirect(
      'https://get-me-a-chai-theta.vercel.app/' + updatedPayment.to_user + '?paymentdone=true',
      { status: 302 }
    );
  }
  
   else {
    return NextResponse.json({ success: false, message: "Payment Failed" });
  }
};
