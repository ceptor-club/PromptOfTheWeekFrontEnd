// import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { avatarNFTSTORAGE } from "../utils/web3utils";
import CreateHero from "../components/CreateHero";
// import { createPrompt } from "../utils/promptGen";
import { Create } from "../components/Create";
import { Logo } from "../components/Logo"
import HamburgerMenu from "../components/HamburgerMenu";
import GenerateHero from "../components/GenerateHero";


export default function Home() {
  const [data, setData] = useState({
    race: "",
    class: "",
  });
  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
  const [error, setError] = useState(null); //error msg
  const [imageResult, setImageResult] = useState(null); //url
  const [nftStorageProcessing, setNftStorageProcessing] = useState(false); //processing state ie. loading...
  const [CID, setCID] = useState(null); //url
  // const [pdfData, setPdfData] = useState(null); //url
  // const [prompt, setPrompt] = useState(null); //url
  const [conditionalRender, setConditionalRender] = useState("");
  const [pdfData, setPdfData] = useState(null); //url



  const setValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const send = async () => {
    setImageProcessing(true);
  };

  const toggleImageProcessing = async () => {
    setImageProcessing(false);
  };
  useEffect(() => {
    if (imageProcessing) {
      console.log(imageProcessing);
      setTimeout(toggleImageProcessing, 3000);
    }
  }, [imageProcessing]);

  const storeImage = async () => {
    setNftStorageProcessing(true);
    const cid = await avatarNFTSTORAGE(imageResult.imageUrl);
    setNftStorageProcessing(false);
    setCID(cid);
  };

  return (
    <>
      <div className="absolute top-4 z-10 flex flex-col justify-center items-center w-full">
        <p>Version 0.1.13</p>
        <div className="">
          <HamburgerMenu />
        </div>
        <Logo
          setConditionalRender={setConditionalRender}
        />
      </div>
      {(pdfData) ? (
        <>
          <Create
            setPdfData={setPdfData}
            pdfData={pdfData}
          />
        </>
      ) : (conditionalRender === "start") ? (
        <GenerateHero
          setPdfData={setPdfData}
          pdfData={pdfData}
          setError={setError}
        />
      ) : (
        <CreateHero
          conditionalRender={conditionalRender}
          setConditionalRender={setConditionalRender}
        />
      )}
    </>
  );
}
