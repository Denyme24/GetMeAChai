import React from "react";
import Image from "next/image";
import Naman from "@/assets/Naman.jpg";

const page = () => {
  return (
    <>
      {/* create a about us page */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            About Us
          </h2>
          <p className="text-lg text-white text-center max-w-3xl mx-auto mb-12">
            Welcome to{" "}
            <span className="text-indigo-400 font-semibold">Get Me a Chai</span>
            , a platform dedicated to helping creators connect with their
            supporters in a simple, transparent, and meaningful way. Whether
            you&apos;re an artist, writer, podcaster, or any kind of creator, we
            provide the tools to let your fans support you by buying you a chai
            (or many)!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission Section */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                Our Mission
              </h3>
              <p className="text-white text-lg">
                At Get Me a Chai, we believe that creativity deserves to be
                rewarded. Our mission is to empower creators to pursue their
                passions and earn a sustainable income by offering a direct way
                for supporters to show their appreciation.
              </p>
            </div>
            {/* Vision Section */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                Our Vision
              </h3>
              <p className="text-white text-lg">
                We envision a world where creators are free to follow their
                dreams, backed by the unwavering support of their fans. No
                middlemen, no complex fees—just simple, direct support for the
                people who make the world a more creative place.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-white p-6 shadow-md rounded-lg">
        <Image
          src={Naman}
          alt="Naman"
          className="w-24 h-24 mx-auto rounded-full mb-4"
          height={550}
          width={550}
        />
        <h4 className="text-xl font-semibold text-center text-white">Naman</h4>
        <p className="text-white text-center">Founder & Full-Stack Developer</p>
      </div>
    </>
  );
};

export default page;
export const metadata = {
  title: "About- Get Me a Chai",
};
