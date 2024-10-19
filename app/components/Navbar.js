"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Script from "next/script";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [showDropDown, setshowDropDown] = useState(false);
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <>
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="lazyOnload"
      />
      <nav className="bg-gray-900 text-white flex justify-between items-center px-4 h-16 relative">
        <Link href={"/"}>
          <div className="text-white flex justify-between items-center">
            <span>
              <lord-icon
                src="https://cdn.lordicon.com/rmhtxunj.json"
                trigger="loop"
                style={{ width: "55px", height: "55px" }}
              ></lord-icon>
            </span>
            <div className="logo font-bold text-lg flex ">GetMeaChai!</div>
          </div>
        </Link>

        <div className="session-check">
          {session && (
            <>
              <button
                onClick={() => setshowDropDown(!showDropDown)}
                onBlur={() => {
                  setTimeout(() => {
                    setshowDropDown(false);
                  }, 500);
                }}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-blue-700 md:mx-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:font-medium rounded-lg md:text-sm md:px-5 md:py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[40vw] h-[3vh] md:w-auto md:h-auto overflow-hidden text-[10px] "
                type="button"
              >
                <div className="flex justify-center items-center gap-2">
                  <img
                    src={session.user.image}
                    alt="image"
                    height={25}
                    width={25}
                    className="rounded-full md:ml-0 ml-1"
                  />
                  <span>Welcome, {session.user.email}</span>
                </div>
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdown"
                className={`z-10  ${
                  showDropDown ? "" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow md:w-44 md:dark:bg-gray-900 dark:bg-gray-900  absolute md:right-12 md:mt-4 cursor-pointer text-center md:h-auto  h-[8vh] w-[30vw] right-6  `}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li className="cursor-pointer">
                    <Link
                      href={"/Dashboard"}
                      className="block md:px-4 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white md:w-full text-xs md:text-lg"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <div className="line h-[1px] opacity-10 bg-white"></div>
                  <li className="cursor-pointer">
                    <Link
                      href={"#"}
                      onClick={handleLogout}
                      className="block md:px-4 px-2 py-1 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white md:w-full cursor-pointer text-xs md:text-lg"
                    >
                      Logout
                    </Link>
                  </li>
                  <li className="cursor-pointer">
                    <Link
                      href={`/${session.user.name}`}
                      className="block  md:px-4 px-2 py-1 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-xs md:text-lg"
                    >
                      Your page
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}

          {!session && (
            <Link href={"/login"}>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
