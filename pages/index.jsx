// import Head from "next/head";
import { useState, useEffect } from "react";
import CreateHero from "../components/CreateHero";
import { Create } from "../components/Create";
import { Logo } from "../components/Logo";
import HamburgerMenu from "../components/HamburgerMenu";
import VectorImage from "../components/VectorImage";
import Meta from "../components/Meta";
import Image from "next/image";
import Link from "next/link";


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
      <div className="flex flex-col justify-center items-center w-full">
        <p className="z-10">Version 0.3.27*</p>
        <p className="z-10">
          *Now with ORCS--Optical Character Recognition System!
        </p>
                <Link href="/nftpage">
          <span
            style={{
              fontSize: `20px`,
              zIndex: 10,
              position: 'relative',
              color: 'white',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontFamily: 'Arial Black',
            }}
          >
            NFT Explorer
          </span>
        </Link>
        <Logo setConditionalRender={setConditionalRender} />

        <div className="fixed top-0 w-screen h-screen z-0">
          <Image
            src="/images/CREATE-midpage/midPageImage.png"
            fill
            alt="midPage"
            className=" object-cover h-screen z-0"
            priority
          />
        </div>

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
