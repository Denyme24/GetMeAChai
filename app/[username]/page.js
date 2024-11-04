// "use client";
import React from "react";
import PaymentPage from "../../components/PaymentPage";
import User from "@/models/user";
import connectDb from "@/db/connectDB";
import { notFound } from "next/navigation";

const Username = async ({ params }) => {
  const checkExistingUsername = async () => {
    await connectDb();
    let user = await User.findOne({ username: params.username });
    if (!user) {
      return notFound();
    }
  };
  await checkExistingUsername();
  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default Username;
export async function generateMetadata({ params }) {
  return {
    title: `${params.username}-Get me a Chai`,
  };
}
