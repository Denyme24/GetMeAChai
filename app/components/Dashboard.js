"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getdata();
    }
  }, [router, session]);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const getdata = async () => {
    let fillData = await fetchuser(session.user.name);
    setform(fillData);
  };
  const handleSubmit = async (e) => {
    // update();
    let updProf = await updateProfile(e, session.user.name);
    toast.success("Profile Updated !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      {/* Dashboard */}
      <div className="relative">
        <div className="container mx-auto py-5 px-10">
          <h1 className="text-center my-5 text-3xl font-bold">
            Welcome to your Dashboard
          </h1>
          <form className="max-w-2xl mx-auto" action={handleSubmit}>
            <div className="my-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name ? form.name : ""}
                onChange={handleChange}
                id="name"
                placeholder="Enter your name"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="email"
                className="flex flex-row gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={form.email ? form.email : ""}
                onChange={handleChange}
                id="email"
                placeholder="Enter your email"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="username"
                className="flex flex-row gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username ? form.username : ""}
                onChange={handleChange}
                id="username"
                placeholder="Enter your username"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="profilepic"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Profile Picture (as URL)
              </label>
              <input
                type="text"
                name="profilepic"
                value={form.profilepic ? form.profilepic : ""}
                onChange={handleChange}
                id="profilepic"
                placeholder="Enter your profile picture"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="coverpic"
                className="flex flex-row gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cover Picture (as URL)
              </label>
              <input
                type="text"
                name="coverpic"
                value={form.coverpic ? form.coverpic : ""}
                onChange={handleChange}
                id="coverpic"
                placeholder="Enter the name to be displayed"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="razorpay id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Razorpay Id
              </label>
              <input
                type="text"
                name="razorpayid"
                value={form.razorpayid ? form.razorpayid : ""}
                onChange={handleChange}
                id="razorpayid"
                placeholder="Enter your razorpay id"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="razorpay secret"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Razorpay Secret
              </label>
              <input
                type="text"
                name="razorpaysecret"
                value={form.razorpaysecret ? form.razorpaysecret : ""}
                onChange={handleChange}
                id="razorpaysecret"
                placeholder="Enter your razorpay secret"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-6">
              <button
                type="submit"
                className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-b focus:ring-4 focus:outline-noned dark:focus:ring-blue-800 font-medim text-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
