// import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { avatarNFTSTORAGE } from "../utils/web3utils";
import elfImage from "../public/elf-3600557344.png";
import PDFParser from "../components/PDFParser";
import CreateHero from "../components/CreateHero";
import CreateMidpage from "../components/CreateMidpage";
// import { createPrompt } from "../utils/promptGen";
import { Create } from "../components/Create";
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
      <CreateHero />
      <Create />
    </div>
  );
}
