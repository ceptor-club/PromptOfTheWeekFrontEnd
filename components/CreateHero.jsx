import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import LandingPage from "../public/images/CREATE-hero/LandingPage.jpeg";
import Logo2 from "../public/images/CREATE-hero/Logo2.jpeg";
import HamburgerMenu from "./HamburgerMenu";
import VectorImage from "./VectorImage";
import StartButton from "./StartButton";


export default function CreateHero({ setConditionalRender }) {
  return (
    <div className="flex flex-col w-full mt-96">
      <div className="relative mx-auto h-96 w-96 bottom-3/4">
        <VectorImage />
      </div>
      <div className="relative mx-auto bottom-3/4 h-32 w-32">
        <StartButton
          setConditionalRender={setConditionalRender}
        />
      </div>
    </div>

  );

}