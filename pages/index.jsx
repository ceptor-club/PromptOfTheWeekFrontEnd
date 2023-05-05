// import Head from "next/head";
import { useState, useEffect } from "react";
import CreateHero from "../components/CreateHero";
import { Create } from "../components/Create";
import { Logo } from "../components/Logo";
import HamburgerMenu from "../components/HamburgerMenu";
import VectorImage from "../components/VectorImage";
import Meta from "../components/Meta";
import Image from "next/image";

export default function Home() {
  /*   const [data, setData] = useState({
      race: "",
      class: "",
    }); */

  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
  const [conditionalRender, setConditionalRender] = useState("");

  const toggleImageProcessing = async () => {
    setImageProcessing(false);
  };

  useEffect(() => {
    if (imageProcessing) {
      console.log(imageProcessing);
      setTimeout(toggleImageProcessing, 3000);
    }
  }, [imageProcessing]);

  return (
    <>
      <Meta />
      <div className="fixed top-0 h-screen w-screen">
        <Image
          src="/images/CREATE-midpage/midPageImage.png"
          width={1000}
          height={1000}
          alt="midPage"
          className="object-cover w-full h-full -z-10"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="z-10">Version 0.5.5*</p>
        <p className="z-10">*Now with SuccessModal! NavBar coming soon :D</p>

        <Logo setConditionalRender={setConditionalRender} />

        <div className="z-10 flex w-full justify-center">
          {/* <div className="w-1/6 h-screen bg-slate-300">
            <p className="">SIDEBAR</p>
          </div> */}

          <div className=" z-10">
            <Create />
          </div>
        </div>
      </div>
    </>
  );
}
