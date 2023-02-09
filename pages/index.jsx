// import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { avatarNFTSTORAGE } from "../utils/web3utils";
import CreateHero from "../components/CreateHero";
// import { createPrompt } from "../utils/promptGen";
import { Create } from "../components/Create";
import { Logo } from "../components/Logo"


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
  const [isStart, setIsStart] = useState(false);


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
    <div>
      {/*       <Logo
        isStart={isStart}
        setIsStart={setIsStart}
      /> */}
      {isStart ? (
        <Create />
      ) : (
        <CreateHero
          isStart={isStart}
          setIsStart={setIsStart}
        />
      )}
    </div>
  );
}
