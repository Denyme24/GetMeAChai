import Link from "next/link";
import Image from "next/image";
import BizImg from "./assets/biz.png";
import Dollar from "./assets/dollar.png";
import Followers from "./assets/followers.png";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-[44vh] flex-col text-white gap-4">
        <div className="flex justify-center items-center gap-2">
          <div className="text-white font-bold text-5xl z-[1000]">
            Buy me a chai
          </div>
          <div className="chai-gif">
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <lord-icon
              src="https://cdn.lordicon.com/rmhtxunj.json"
              trigger="loop"
              style={{ width: "75px", height: "75px" }}
            ></lord-icon>
          </div>
        </div>
        <p className="text-white">
          A Crowdfunding platform for creators. Get funded by your fans and
          followers. Start Now!
        </p>
        <div className="flex gap-2 z-[1000] ">
          <Link href="/login">
            <button
              type="button"
              className=" z-[1000] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Get Started
            </button>
          </Link>

          <Link href="/about">
            <button
              type="button"
              className=" z-[1000] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto z-[1000] p-8">
        <h2 className="text-3xl font-bold text-center my-10 z-[1000]">
          Your fans can buy you a Chai
        </h2>
        <div className="flex gap-5 justify-around items-center">
          <div className="item z-[1000] p-7 flex flex-col items-center justify-center">
            <Image
              className="rounded-md "
              src={BizImg}
              alt="Business Image"
              width={80}
              height={80}
            />
            <p className="font-bold">Fund yourself</p>
            <p> Create a Strong Community that helps you </p>
          </div>
          <div className="item z-[1000] p-7 flex flex-col items-center justify-center">
            <Image
              className="rounded-md "
              src={Dollar}
              alt="Business Image"
              width={80}
              height={80}
            />
            <p className="font-bold">Fund yourself</p>
            <p> Create a Strong Community that helps you </p>
          </div>
          <div className="item z-[1000] p-7 flex flex-col items-center justify-center">
            <Image
              className="rounded-md "
              src={Followers}
              alt="Business Image"
              width={80}
              height={80}
            />
            <p className="font-bold">Fans want to Help</p>
            <p> Create a Strong Community that helps you </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto z-[1000] p-10 flex flex-col justify-center items-center gap-6">
        <h2 className=" font-bold text-3xl text-center">My Recent Project</h2>
        <iframe
          className="rounded-lg z-[1000]"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/NEWT4eQMLEE?si=6E04FCYqXgDagm_m"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}
// flowbite.com
