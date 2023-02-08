import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { createPrompt } from "../utils/promptGen";
import { avatarNFTSTORAGE } from "../utils/web3utils";
import { CharacterBackstory } from "./CharacterBackstory";
import { CreateImageGrid } from "./CreateImageGrid";
import PDFParser from "./PDFParser";
import Placeholder from "../public/images/CREATE/placeholder.png";
import HelpToggle from "./HelpToggle";
import { CONSTANTS } from "../utils/CONSTANTS";
import SaveButton from "./SaveButton";
import CopyButton from "./CopyButton";
import CharacterStats from "./CharacterStats"
import ToolTip from "./ToolTip"
import WalletConnectButton from "./WalletConnectButton";
import MintButton from "./MintButton"
import GenerateHero from "../components/GenerateHero";

import { useContractWrite, usePrepareContractWrite } from "wagmi";

export const Create = () => {
  const [pdfData, setPdfData] = useState(null); //url
  const [prompt, setPrompt] = useState(null); //url
  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
  const [error, setError] = useState(null); //error msg
  const [imageResult, setImageResult] = useState(null); //url
  const [selectedImage, setSelectedImage] = useState(null); //image chosen by user
  const [isMinting, setIsMinting] = useState(false); //minting nft state ie. loading...
  const [metadataUrl, setMetadataUrl] = useState(null); //url

  const { data, isLoading, isSuccess, write } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: CONSTANTS.contractAddress,
    abi: CONSTANTS.contractABI,
    functionName: "mint",
    // args: [],
    chainId: 5,
  });

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

  const mintAvatar = async () => {
    setIsMinting(true);
    console.log("Minting avatar...");

    const _metadataUrl = await avatarNFTSTORAGE(selectedImage, prompt, pdfData); //returns url of metadata json
    console.log("metadata url: ", _metadataUrl);
    setMetadataUrl(_metadataUrl);

    //mint nft
    const mintResult = write({
      recklesslySetUnpreparedArgs: [_metadataUrl],
    });
    console.log("mintResult: ", mintResult);
    //check for error
    setIsMinting(false);
  };

  const generateImages = async () => {
    console.log("Generating images... for ", prompt);
    setError(false);
    setImageProcessing(true);
    const fetchResult = await fetch("/api/getImage", {
      // <------------- COMMENTED OUT FOR TESTING
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: prompt,
      }),
    }); //result is given as base64 encoded images
    const result = await fetchResult.json();

    // const result = { images: [CONSTANTS.testBase64Image] }; // <------------- THIS IS FOR TESTING

    // console.log("result: ", result)

    setImageProcessing(false);
    if (result.error) {
      return setError(result.error);
    }
    setImageResult(result);
  };


  return (
    <>
      <GenerateHero
        setPdfData={setPdfData}
        pdfData={pdfData}
        setError={setError}
      />
      <ToolTip />
      <div className="flex flex-col xl:flex-nowrap w-screen gap-2 justify-start items-center">
        <div className="flex flex-col xl:w-2/5 w-full p-4 gap-4 justify-around">
          <div className="w-full h-full text-left flex flex-row space-between">
          </div>

          <div className="flex flex-col items-center justify-center">
            {pdfData ? (
              <>
                <CharacterStats
                  pdfData={pdfData}
                  prompt={prompt}
                  setPrompt={setPrompt}
                  setError={setError}
                  setPdfData={setPdfData}
                />
                <h3>Edit Your Prompt Manually</h3>
                <div className="bg-black text-left text-sm min-h-[150px] p-2 w-full">
                  <h3 className="mb-4">Your Prompt Was Recovered from the Fires of the Forge!</h3>
                  <textarea
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-[200px] bg-transparent resize-none"
                    value={prompt || ""}
                  />
                </div>

                <div className="flex w-72 item-center justify-center text-center align-center bg-black p-4 mt-6 animate-pulse">
                  <Image
                    src="/images\CREATE\dice.svg"
                    alt=""
                    width={64}
                    height={64}
                    className="mr-4"
                  />
                  <div
                    className="flex items-center text-4xl"
                    onClick={generateImages}
                    disabled={pdfData ? false : true}
                  >
                    GENERATE
                    {isMinting ? (
                      <p className="w-fit bg-[#D89A00] hover:bg-[#ab8933] py-1 px-6 rounded-full text-black cursor-not-allowed">
                        Minting...
                      </p>
                    ) : null}

                  </div>
                </div>
                <p>CHARACTER IMAGES</p>

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
                <MintButton selectedImage={selectedImage} />
                <SaveButton selectedImage={selectedImage} />
                <CopyButton selectedImage={selectedImage} />
                <WalletConnectButton />
              </>
            ) : <></>
            }

            {isMinting ? (
              <p className="w-fit bg-[#D89A00] hover:bg-[#ab8933] py-1 px-6 rounded-full text-black cursor-not-allowed">
                Minting...
              </p>
            ) : imageResult ? (
              <p
                className="w-fit bg-[#D89A00] hover:bg-[#ab8933] py-1 px-6 rounded-full text-black cursor-pointer animate-pulse"
                onClick={mintAvatar}
              >
                Mint Avatar
              </p>
            ) : imageProcessing ? (
              <p className="w-fit bg-[#D89A00] hover:bg-[#ab8933] py-1 px-6 rounded-full text-black cursor-not-allowed">
                images loading...
              </p>
            ) : pdfData ? (
              <p
                className="w-fit bg-emerald-600 hover:bg-emerald-500 py-1 px-6 rounded-full text-black cursor-pointer animate-pulse"
                onClick={generateImages}
              >
                Generate Images
              </p>
            ) : (
              <p className="w-fit bg-[#D89A00] hover:bg-[#ab8933] py-1 px-6 rounded-full text-black cursor-not-allowed">
                Upload first!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
