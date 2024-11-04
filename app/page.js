import Link from "next/link";
import Image from "next/image";
import BizImg from "@/assets/biz.png";
import Dollar from "@/assets/dollar.png";
import Followers from "@/assets/followers.png";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center min-h-[27vh] md:min-h-[44vh] flex-col text-white gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <div className="text-white font-bold text-3xl sm:text-4xl md:text-5xl z-[1000] text-center">
            Buy me a chai
          </div>
          <div className="chai-gif">
            <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
            <lord-icon
              src="https://cdn.lordicon.com/rmhtxunj.json"
              trigger="loop"
              style={{ width: "50px", height: "50px" }}
            ></lord-icon>
          </div>
        </div>
        <p className="text-white text-center max-w-2xl">
          A Crowdfunding platform for creators. Get funded by your fans and
          followers. Start Now!
        </p>
        <div className="flex gap-2 z-[1000] flex-wrap justify-center">
          <Link href="/login">
            <button
              type="button"
              className="z-[1000] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 text-center me-2 mb-2"
            >
              Get Started
            </button>
          </Link>

          <Link href="/about">
            <button
              type="button"
              className="z-[1000] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 text-center me-2 mb-2"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-px opacity-10"></div>
      <div className="text-white container mx-auto z-[1000] p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center my-6 sm:my-10 z-[1000]">
          Your fans can buy you a Chai
        </h2>
        <div className="flex flex-col sm:flex-row gap-5 justify-around items-center">
          <div className="item z-[1000] p-4 sm:p-7 flex flex-col items-center justify-center text-center">
            <Image
              className="rounded-md"
              src={BizImg}
              alt="Business Image"
              width={60}
              height={60}
            />
            <p className="font-bold mt-2">Community</p>
            <p className="text-sm">
              {" "}
              Create a Strong Community that helps you{" "}
            </p>
          </div>
          <div className="item z-[1000] p-4 sm:p-7 flex flex-col items-center justify-center text-center">
            <Image
              className="rounded-md"
              src={Dollar}
              alt="Business Image"
              width={60}
              height={60}
            />
            <p className="font-bold mt-2">Funding</p>
            <p className="text-sm"> Fund Inspiration, Brew Connections. </p>
          </div>
          <div className="item z-[1000] p-4 sm:p-7 flex flex-col items-center justify-center text-center">
            <Image
              className="rounded-md"
              src={Followers}
              alt="Business Image"
              width={60}
              height={60}
            />
            <p className="font-bold mt-2">Fans</p>
            <p className="text-sm"> Support Creators, Sip by Sip. </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-px opacity-10"></div>
      <div className="text-white container mx-auto z-[1000] p-4 sm:p-10 flex flex-col justify-center items-center gap-6">
        <h2 className="font-bold text-2xl sm:text-3xl text-center">
          My Recent Project
        </h2>
        <div className="w-full max-w-[560px] aspect-video z-[1000] ">
          <iframe
            className="md:rounded-lg rounded-2xl z-[1000] md:w-full md:h-full w-[50vw] h-[20vh] m-auto"
            src="https://www.youtube.com/embed/NEWT4eQMLEE?si=6E04FCYqXgDagm_m"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
