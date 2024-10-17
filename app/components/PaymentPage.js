"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { initiatePayment } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { fetchuser, fetchPayments } from "@/actions/useractions";

const PaymentPage = ({ username }) => {
  const [paymentform, setpaymentform] = useState({});
  const [currentUser, setcurrentUser] = useState({});
  const [dbPayment, setdbPayment] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   console.log("currentUser updated:", currentUser); // Log currentUser whenever it changes
  // }, [currentUser]);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let dbUser = await fetchuser(username);
    setcurrentUser(dbUser);
    let Payment = await fetchPayments(username);
    setdbPayment(Payment);
    console.log(dbUser);
    // console.log(currentUser);
  };

  const pay = async (amount) => {
    let a = await initiatePayment(amount, username, paymentform);
    let orderId = a.id;

    var options = {
      key: currentUser.razorpayid,
      amount: amount,
      currency: "INR",
      name: "Get Me a Chai",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      handler: function (response) {
        // Handle the response from Razorpay
        console.log(response);
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full relative">
        <img
          className="object-cover h-[45vh] w-full "
          src={currentUser.coverpic}
          alt=""
        />
        <div>
          <img
            className="absolute -bottom-10 right-[46%] rounded-lg border-[1px] border-white"
            width={100}
            height={100}
            src={currentUser.profilepic}
            alt=""
          />
        </div>
      </div>
      <div className="info flex justify-center items-center my-12 text-center flex-col">
        <div className="font-bold text-lg"> @{username}</div>
        <div className="text-slate-400">
          Total Conversion Mod for Bannerlord
        </div>
        <div className="text-slate-400">2 posts</div>
      </div>
      <div className="payment flex gap-3 w-[80%] container mx-auto mb-10 ">
        <div className="supporters min-w-[40vw] max-h-[60vh] bg-slate-900 rounded-lg text-white p-10 z-[1000] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 ">
          <h2 className="my-2 font-bold text-2xl">Supporters</h2>
          <div className="line bg-white h-[1px] opacity-15 mb-2"></div>
          <ul className="text-lg">
            {dbPayment.length == 0 && (
              <ul className="text-white shadow-lg rounded-lg p-4 m-4 relative z-10">
                No payments yet! 😣
              </ul>
            )}
            {dbPayment.map((items) => {
              return (
                <li key={items.id} className="flex items-center gap-2">
                  <div className="image">
                    <script src="https://cdn.lordicon.com/lordicon.js"></script>
                    <lord-icon
                      src="https://cdn.lordicon.com/xcxzayqr.json"
                      trigger="loop"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                  </div>
                  <div>
                    {items.name} Donated{" "}
                    <span className="font-bold">
                      Rs.{Number.parseInt(items.amount)}
                    </span>{" "}
                    with a message "{items.message}"
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="makePayment min-w-[40vw] max-h-[60vh] bg-slate-900 rounded-lg text-white p-10 z-[1000]">
          <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
          <div className="flex gap-2 flex-col">
            {/* input for name and message */}
            <input
              name="name"
              value={paymentform.name ? paymentform.name : ""}
              onChange={handleChange}
              type="text"
              id="name"
              className="w-full p-3 rounded-lg bg-slate-800"
              placeholder="Enter name"
            />
            <input
              name="message"
              onChange={handleChange}
              value={paymentform.message ? paymentform.message : ""}
              type="text"
              className="w-full p-3 rounded-lg bg-slate-800"
              placeholder="Enter message"
            />
            <input
              name="amount"
              onChange={handleChange}
              value={paymentform.amount ? paymentform.amount : ""}
              type="text"
              className="w-full p-3 rounded-lg bg-slate-800"
              placeholder="Enter amount"
            />
            <button
              id="rzp-button1"
              onClick={() => {
                pay(Number.parseInt(paymentform.amount) * 100);
              }}
              type="button"
              className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
                paymentform.name?.length < 3 || paymentform.message?.length < 3
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                paymentform.name?.length < 3 || paymentform.message?.length < 3
              }
            >
              Pay
            </button>
          </div>
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => {
                pay(1000);
              }}
              className="bg-slate-800 p-3 rounded-lg"
            >
              ₹1000
            </button>
            <button
              onClick={() => {
                pay(2000);
              }}
              className="bg-slate-800 p-3 rounded-lg"
            >
              ₹2000
            </button>
            <button
              onClick={() => {
                pay(5000);
              }}
              className="bg-slate-800 p-3 rounded-lg"
            >
              ₹5000
            </button>
            <button
              onClick={() => {
                pay(10000);
              }}
              className="bg-slate-800 p-3 rounded-lg"
            >
              ₹10000
            </button>
            <button
              onClick={() => {
                pay(20000);
              }}
              className="bg-slate-800 p-3 rounded-lg"
            >
              ₹20000
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
