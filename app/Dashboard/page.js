import React from "react";

const dashboard = () => {
  return (
    <>
      {/* Dashboard */}
      <div className="container mx-auto w-[40vw]  mt-6 z-[1000] relative">
        <h1 className="font-bold text-3xl text-center">
          Welcome To Your Dashboard
        </h1>
        <div className="inputs flex flex-col justify-center gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-3 rounded-lg bg-slate-800 h-[40px]"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-3 rounded-lg bg-slate-800 h-[40px]"
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="w-full p-3 rounded-lg bg-slate-800 h-[40px]"
          />
          <label htmlFor="profile">Profile Picture</label>
          <input
            type="text"
            id="profile"
            className="w-full p-3 rounded-lg bg-slate-800 h-[40px]"
          />
          <label htmlFor="cover">Cover Picture</label>
          <input
            type="text"
            id="cover"
            className="w-full p-3 rounded-lg bg-slate-800 h-[40px]"
          />
          <label htmlFor="razorpay">Razorpay Credentials</label>
          <input
            type="text"
            id="razorpay"
            className="w-full p-3 rounded-lg bg-slate-800 h-[40px]"
          />
          <button
            type="button"
            className="text-white mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default dashboard;
