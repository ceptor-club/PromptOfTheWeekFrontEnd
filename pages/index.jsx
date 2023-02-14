// import Head from "next/head";
import { useState, useEffect } from "react";
import CreateHero from "../components/CreateHero";
import { Create } from "../components/Create";
import { Logo } from "../components/Logo"
import HamburgerMenu from "../components/HamburgerMenu";


export default function Home() {
  /*   const [data, setData] = useState({
      race: "",
      class: "",
    }); */

  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
  const [conditionalRender, setConditionalRender] = useState("");
  const [pdfData, setPdfData] = useState(null); //url
  /*   const [prompt, setPrompt] = useState(null); //url
    const [error, setError] = useState(null); //error msg
    const [imageResult, setImageResult] = useState(null); //url
    const [nftStorageProcessing, setNftStorageProcessing] = useState(false); //processing state ie. loading...
    const [CID, setCID] = useState(null); //url */


  const toggleImageProcessing = async () => {
    setImageProcessing(false);
  };

  useEffect(() => {
    if (imageProcessing) {
      console.log(imageProcessing);
      setTimeout(toggleImageProcessing, 3000);
    }
  }, [imageProcessing]);

  /*   const storeImage = async () => {
      setNftStorageProcessing(true);
      const cid = await avatarNFTSTORAGE(imageResult.imageUrl);
      setNftStorageProcessing(false);
      setCID(cid);
    }; */

  /*   const setValue = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
}; */

  /*   const send = async () => {
      setImageProcessing(true);
    }; */

  return (
    <>
      <div className="absolute top-4 z-10 flex flex-col justify-center items-center w-full">
        <p>Version 0.1.13</p>
        <div className="">
          <HamburgerMenu />
        </div>
        <Logo
          setConditionalRender={setConditionalRender}
          setPdfData={setPdfData}
        />
      </div>

      {(conditionalRender) ? (
        <>
          <div className="bg-create">
            <Create
              pdfData={pdfData}
              setPdfData={setPdfData}
            />
          </div>
        </>
      ) : (
        <>
          <div className="bg-start w-full">
            <CreateHero
              conditionalRender={conditionalRender}
              setConditionalRender={setConditionalRender}
            />
          </div>
        </>
      )}

    </>
  );
}
