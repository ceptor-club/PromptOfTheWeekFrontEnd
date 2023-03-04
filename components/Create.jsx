import React from "react";
import { useEffect, useState } from "react";
import { createPrompt } from "../utils/promptGen";
import { CharacterBackstory } from "./CharacterBackstory";
import { CreateImageGrid } from "./CreateImageGrid";
import PDFParser from "./PDFParser";
import Placeholder from "../public/images/CREATE/placeholder.png";
import HelpToggle from "./HelpToggle";
import SaveButton from "./SaveButton";
import CopyButton from "./CopyButton";
import CharacterStats from "./CharacterStats";
import ToolTip from "./ToolTip";
import MintButton from "./MintButton";
import GenerateButton from "./GenerateButton";
import GenerateLoading from "./GenerateLoading";
import Image from "next/image";
import midPageImage from "../public/images/CREATE-midpage/midPageImage.png";

export const Create = ({ pdfData, setPdfData }) => {
  const [prompt, setPrompt] = useState(null); //url
  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
  const [error, setError] = useState(null); //error msg
  const [imageResult, setImageResult] = useState(null); //url
  const [selectedImage, setSelectedImage] = useState(null); //image chosen by user
  const [conditionalCreate, setConditionalCreate] = useState("");
  const [isMinting, setIsMinting] = useState(false); //minting nft state ie. loading...

  //states: no data, pdf uploaded, images generated, nft minted

  useEffect(() => {
    if (pdfData) {
      console.log("pdfData: ", pdfData);
      //create text prompt using pdfData and other data
      const prompt = createPrompt(pdfData);
      console.log("prompt: ", prompt);
      setPrompt(prompt);
      setError(null);
    }
  }, [pdfData]);

  useEffect(() => {
    if (prompt) {
      console.log("prompt update: ", prompt);
      // setPrompt(prompt);
      setError(null);
    }
  }, [prompt]);

  const retry = () => {
    setConditionalCreate("");
    setError(null);
  };

  return (
    <>
      {/*       {(!pdfData) ? (
        <GenerateHero
          setPdfData={setPdfData}
          pdfData={pdfData}
          setError={setError}
          setConditionalRender={setConditionalRender}
        />
      ) : null} */}

      <div className="flex flex-col xl:flex-nowrap w-screen gap-2 justify-center items-center">
        <Image
          src={midPageImage}
          alt="midPage"
          className="object-fit: cover h-screen"
        />
        <div className="absolute top-24 flex flex-col w-full justify-center items-center">
          {imageProcessing ? (
            <>
              <GenerateLoading />
            </>
          ) : error ? (
            <>
              <h1
                className="text-4xl bg-red-400 text-red-800 cursor-pointer mt-48 animate-pulse"
                onClick={retry}
              >
                {error}
              </h1>
            </>
          ) : !imageProcessing ? (
            <>
              <CharacterStats
                pdfData={pdfData}
                prompt={prompt}
                setPrompt={setPrompt}
                setError={setError}
                setPdfData={setPdfData}
              />
            </>
          ) : null}

          {imageResult ? (
            <>
              <div className="flex flex-col items-center bg-black mt-8">
                <h3 id="results" className="text-4xl mb-4">
                  RESULTS
                </h3>
                <p>Select an image to save or mint</p>
                {/* images grid */}
                <div className="m-4 mb-6">
                  {/* a grid of 9 images */}
                  <CreateImageGrid
                    imageResult={imageResult}
                    imageProcessing={imageProcessing}
                    error={error}
                    pdfData={pdfData}
                    setSelectedImage={setSelectedImage}
                  />
                </div>
              </div>
            </>
          ) : null}

          {error ? null : (
            <GenerateButton
              setConditionalCreate={setConditionalCreate}
              setImageProcessing={setImageProcessing}
              setError={setError}
              setImageResult={setImageResult}
              imageResult={imageResult}
              pdfData={pdfData}
              isMinting={isMinting}
              imageProcessing={imageProcessing}
              prompt={prompt}
            />
          )}

          {imageResult ? (
            <div className="flex gap-4 justify-center items-center">
              <MintButton
                selectedImage={selectedImage}
                pdfData={pdfData}
                setIsMinting={setIsMinting}
                isMinting={isMinting}
                prompt={prompt}
              />
              <SaveButton selectedImage={selectedImage} />
              {/* <CopyButton selectedImage={currentSelection} /> */}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
