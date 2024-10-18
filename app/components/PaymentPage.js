"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { initiatePayment } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { fetchuser, fetchPayments } from "@/actions/useractions";
import CountUp from "react-countup";

const PaymentPage = ({ username }) => {
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState({});
  const [dbPayment, setdbPayment] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let dbUser = await fetchuser(username);
    setcurrentUser(dbUser);
    let Payment = await fetchPayments(username);
    setdbPayment(Payment);
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
          className="object-cover h-[30vh] md:h-[45vh] w-full"
          src={currentUser.coverpic}
          alt=""
        />
        <div>
          <img
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 rounded-lg border-[1px] border-white"
            width={80}
            height={80}
            src={currentUser.profilepic}
            alt=""
          />
        </div>
      </div>
      <div className="info flex gap-2 justify-center items-center my-12 mx-4 md:mx-8 text-center flex-col">
        <div className="font-bold text-lg"> @{username}</div>
        <div className="text-slate-400">Help {currentUser.name} get a ☕</div>
        <div className="text-slate-400">
          Payments{" "}
          <span className=" text-white font-bold text-lg">
            {dbPayment.length}
          </span>{" "}
          . Total Amount Raised ₹{" "}
          <span className="font-bold text-lg animate-pulse text-white">
            <CountUp
              end={dbPayment.reduce((acc, item) => acc + item.amount, 0)}
              duration={1}
              separator=","
            />
          </span>
        </div>
      </div>
      <div className="payment flex flex-col md:flex-row gap-3 w-full md:w-[80%] container mx-auto mb-10 px-4 md:px-0">
        <div className="supporters w-full md:min-w-[40vw] max-h-[60vh] bg-slate-900 rounded-lg text-white p-4 md:p-10 z-[1000] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 mb-6 md:mb-0">
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
        <div className="makePayment w-full md:min-w-[40vw] max-h-[60vh] bg-slate-900 rounded-lg text-white p-4 md:p-10 z-[1000]">
          <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
          <div className="flex gap-2 flex-col">
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
                paymentform.name?.length < 3 ||
                paymentform.message?.length < 3 ||
                paymentform.amount?.length < 1
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
          <div className="flex flex-wrap gap-2 mt-6">
            {[1000, 2000, 5000, 10000, 20000].map((amount) => (
              <button
                key={amount}
                onClick={() => pay(amount)}
                className="bg-slate-800 p-2 md:p-3 rounded-lg text-sm md:text-base flex-grow"
              >
                ₹{amount}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
