// import Head from "next/head";
import { useState, useEffect } from "react";
import CreateHero from "../components/CreateHero";
import { Create } from "../components/Create";
import { Logo } from "../components/Logo"
import HamburgerMenu from "../components/HamburgerMenu";
import VectorImage from "../components/VectorImage";


export default function Home() {
  /*   const [data, setData] = useState({
      race: "",
      class: "",
    }); */

  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
  const [conditionalRender, setConditionalRender] = useState("");
  const [pdfData, setPdfData] = useState({
    race: "DnDDragonbornGeneral",
    class: "",
    armorWorn: "",
    background: "",
    alignment: "",
    feature: "",
    gender: ""
  }); //url
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
      <div className="absolute top-0 flex flex-col justify-center items-center w-full">
        <p className="z-10">Version 0.1.13</p>
       
        <Logo
          setConditionalRender={setConditionalRender}
          setPdfData={setPdfData}
        />
        
        {(conditionalRender) ? (
          <>
           <div className="absolute top-0 w-full">
              <Create
                pdfData={pdfData}
                setPdfData={setPdfData}
              />
           </div>
          </>
        ) : (
          <>
            <div className="absolute top-0 w-full">
              <CreateHero
                conditionalRender={conditionalRender}
                setConditionalRender={setConditionalRender}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
