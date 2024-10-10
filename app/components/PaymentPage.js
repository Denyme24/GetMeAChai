"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { initiatePayment } from "@/actions/useractions";
import { useSession } from "next-auth/react";

const PaymentPage = ({ username }) => {
  //   const { data: session } = useSession();
  const [paymentform, setpaymentform] = useState({});
  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const pay = async (amount) => {
    let a = await initiatePayment(amount, username, paymentform);

    let orderId = a.id;
    var options = {
      key: process.env.KEY_ID,
      amount: amount,
      currency: "INR",
      name: "Get Me a Chai",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: `${process.env.URL}/api/razorpay`,
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
    };
    var rzp1 = new Razorpay(options);
    document.getElementById("rzp-button1").onclick = function (e) {
      rzp1.open();
    };
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full relative">
        <img
          className="object-cover h-[45vh] w-full "
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/8396999/b7785c2bdfc64f23aeeebab0321e0b21/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/13.png?token-time=1730678400&token-hash=-IBAzQXirPo-XLINGiMhTLZdvXcxWDIrc31-TYaaub0%3D"
          alt=""
        />
        <div>
          <img
            className="absolute -bottom-10 right-[46%] rounded-lg border-[1px] border-white"
            width={100}
            height={100}
            src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/8396999/63ffb8058081458bbad29aa538533bee/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/15.gif?token-time=1729468800&token-hash=psksoqqhEpnwRJ2qA10_jsEGQlJFT-l2fCiHwIZmldc%3D"
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
        <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-10 z-[1000] ">
          {/* Show list of all the supporters as a leaderboard */}
          <h2 className="my-2 font-bold text-2xl">Supporters</h2>
          <div className="line bg-white h-[1px] opacity-15 mb-2"></div>
          <ul className="text-lg">
            <li className="flex  items-center gap-2">
              <div className="image">
                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                <lord-icon
                  src="https://cdn.lordicon.com/xcxzayqr.json"
                  trigger="loop"
                  style={{ width: "25px", height: "25px" }}
                ></lord-icon>
              </div>
              <div>
                Priyanshu Donated <span className="font-bold"> Rs.1400</span>{" "}
                with a message "lots of ☕ for you"
              </div>
            </li>
            <li className="flex  items-center gap-2">
              <div className="image">
                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                <lord-icon
                  src="https://cdn.lordicon.com/xcxzayqr.json"
                  trigger="loop"
                  style={{ width: "25px", height: "25px" }}
                ></lord-icon>
              </div>
              <div>
                Priyanshu Donated <span className="font-bold"> Rs.1400</span>{" "}
                with a message "lots of ☕ for you"
              </div>
            </li>
            <li className="flex  items-center gap-2">
              <div className="image">
                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                <lord-icon
                  src="https://cdn.lordicon.com/xcxzayqr.json"
                  trigger="loop"
                  style={{ width: "25px", height: "25px" }}
                ></lord-icon>
              </div>
              <div>
                Priyanshu Donated <span className="font-bold"> Rs.1400</span>{" "}
                with a message "lots of ☕ for you"
              </div>{" "}
            </li>
          </ul>
        </div>
        <div className="makePayment w-1/2 bg-slate-900 rounded-lg text-white p-10 z-[1000]">
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
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Pay
            </button>
            {/* or choose from these amounts */}
          </div>
          <div className="flex gap-2 mt-6">
            <button
              onclick={() => {
                pay(10);
              }}
              className="bg-slate-800 p-3 rounded-lg"
            >
              ₹10
            </button>
            <button
              onClick={() => {
                pay(20);
                {
                  console.log("20 is clicked");
                }
              }}
              className="bg-slate-800 p-3 rounded-lg"
            >
              ₹20
            </button>
            <button
              onClick={() => {
                pay(50000);
              }}
              className="bg-slate-800 p-3 rounded-lg"
              id="rzp-button1"
            >
              ₹50
            </button>
            <button
              onClick={() => {
                pay(100);
              }}
              className="bg-slate-800 p-3 rounded-lg"
            >
              ₹100
            </button>
            <button className="bg-slate-800 p-3 rounded-lg">₹1000</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
