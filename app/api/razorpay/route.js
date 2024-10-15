import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDB";

export const POST = async (req) => {
  await connectDb();
  let body = await req.formData();
  body = Object.fromEntries(body);
  let p = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ success: false, message: "Order ID not found" });
  }
  let verifyPayment = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    process.env.KEY_SECRET
  );

  if (verifyPayment) {
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true }
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URl}/${updatedPayment.to_user}?paymentdone=true`
    );
  } else {
    return NextResponse.json({ success: false, message: "Payment Failed" });
  }
};
