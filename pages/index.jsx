// import Head from "next/head";
import { useState, useEffect } from "react"
import CreateHero from "../components/CreateHero"
import { Create } from "../components/Create"
import { Logo } from "../components/Logo"
import HamburgerMenu from "../components/HamburgerMenu"
import VectorImage from "../components/VectorImage"
import Meta from "../components/Meta"
import Image from "next/image"

export default function Home() {
  /*   const [data, setData] = useState({
      race: "",
      class: "",
    }); */

  const [imageProcessing, setImageProcessing] = useState(false) //processing state ie. loading...
  const [conditionalRender, setConditionalRender] = useState("")
  const [pdfData, setPdfData] = useState({
    race: "DnDDragonbornGeneral",
    class: "",
    armorWorn: "",
    background: "",
    alignment: "",
    feature: "",
    gender: "",
  }) //url
  /*   const [prompt, setPrompt] = useState(null); //url
    const [error, setError] = useState(null); //error msg
    const [imageResult, setImageResult] = useState(null); //url
    const [nftStorageProcessing, setNftStorageProcessing] = useState(false); //processing state ie. loading...
    const [CID, setCID] = useState(null); //url */

  const toggleImageProcessing = async () => {
    setImageProcessing(false)
  }

  useEffect(() => {
    if (imageProcessing) {
      console.log(imageProcessing)
      setTimeout(toggleImageProcessing, 3000)
    }
  }, [imageProcessing])

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
      <Meta />
      <div className="flex flex-col justify-center items-center w-full">
        <p className="z-10">Version 0.2.28*</p>

        <Logo setConditionalRender={setConditionalRender} setPdfData={setPdfData} />

        <div className="absolute top-0 w-screen h-screen z-0">
          <Image
            src="/images/CREATE-midpage/midPageImage.png"
            fill
            alt="midPage"
            className=" object-cover h-screen z-0"
          />
        </div>

        <div className="z-10 flex w-full">
          {/* <div className="w-1/6 h-screen bg-slate-300">
            <p className="">SIDEBAR</p>
          </div> */}

          <div className=" z-10">
            <Create pdfData={pdfData} setPdfData={setPdfData} />
          </div>
        </div>
      </div>
    </>
  )
}
