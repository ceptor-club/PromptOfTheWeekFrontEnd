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
    <div className="flex flex-col mt-36 h-full">
      <div className="mx-auto h-96 w-96">
        <VectorImage />
      </div>
      <div className="mx-auto h-32 w-32">
        <StartButton
          setConditionalRender={setConditionalRender}
        />
      </div>
    </div>

  );

}