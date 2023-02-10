import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import hero1 from "../public/images/CREATE-hero/samplepic1.png";
import hero2 from "../public/images/CREATE-hero/samplepic2.png";
import hero3 from "../public/images/CREATE-hero/samplepic3.png";
import LandingPage from "../public/images/CREATE-hero/LandingPage.jpeg";
import Logo2 from "../public/images/CREATE-hero/Logo2.jpeg";
import HamburgerMenu from "./HamburgerMenu";
import VectorImage from "./VectorImage";
import StartButton from "./StartButton";


export default function CreateHero({ setConditionalRender }) {
  return (
    <div>
      <div className="relative flex justify-center">
        <div className="object-cover h-screen">
          <Image
            src={LandingPage}
            alt="LandingPage"
            className="object-cover h-screen"
          />
          <div className="relative mx-auto h-96 w-96 bottom-3/4">
            <VectorImage />
          </div>
          <div className="relative mx-auto bottom-3/4 h-32 w-32">
            <StartButton
              setConditionalRender={setConditionalRender}
            />
          </div>
        </div>
      </div>

    </div>

  );

}