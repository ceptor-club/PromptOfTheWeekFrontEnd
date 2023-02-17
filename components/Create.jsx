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
import CharacterStats from "./CharacterStats"
import ToolTip from "./ToolTip"
import MintButton from "./MintButton"
import GenerateHero from "../components/GenerateHero";
import GenerateButton from "./GenerateButton";

export const Create = ({ pdfData, setPdfData, conditionalRender, setConditionalRender }) => {

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
  console.log("pdfData: ", pdfData);

  return (
    <>
      {(!pdfData) ? (
        <GenerateHero
          setPdfData={setPdfData}
          pdfData={pdfData}
          setError={setError}
          setConditionalRender={setConditionalRender}
        />
      ) : null}

      <div className="flex flex-col xl:flex-nowrap w-screen gap-2 justify-start items-center mt-24">
        <div className="flex flex-col xl:w-2/5 w-full p-4 gap-4 justify-around">
          <div className="w-full h-full text-left flex flex-row space-between">
          </div>

          <div className="flex flex-col items-center justify-center">

            {(pdfData) ? (
              <>
                <CharacterStats
                  pdfData={pdfData}
                  prompt={prompt}
                  setPrompt={setPrompt}
                  setError={setError}
                  setPdfData={setPdfData}
                />
                <GenerateButton
                  setConditionalCreate={setConditionalCreate}
                  setImageProcessing={setImageProcessing}
                  setError={setError}
                  setImageResult={setImageResult}
                  imageResult={imageResult}
                  pdfData={pdfData}
                  isMinting={isMinting}
                  imageProcessing={imageProcessing}
                />
              </>
            ) : null}
            {(conditionalCreate === "results") ? (
              <>
                <div className="flex flex-col items-center bg-black mt-8">
                  <h3 className="text-4xl mb-4">RESULTS</h3>
                  <p>Select an image to save or mint</p>
                  {/* images grid */}
                  <div className="md:w-2/3 m-4 mb-6">
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
                <MintButton
                  selectedImage={selectedImage}
                  pdfData={pdfData}
                  setIsMinting={setIsMinting}
                  isMinting={isMinting}
                  prompt={prompt}
                />
                <SaveButton selectedImage={selectedImage} />
                <CopyButton selectedImage={selectedImage} />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
