import React from "react"
import { useEffect, useState } from "react"
import { createPrompt } from "../utils/promptGen"
import { CharacterBackstory } from "./CharacterBackstory"
import { CreateImageGrid } from "./CreateImageGrid"
import PDFParser from "./PDFParser"
import Placeholder from "../public/images/CREATE/placeholder.png"
import HelpToggle from "./HelpToggle"
import SaveButton from "./SaveButton"
import CopyButton from "./CopyButton"
import CharacterStats from "./CharacterStats"
import ToolTip from "./ToolTip"
import MintButton from "./MintButton"
import GenerateButton from "./GenerateButton"
import GenerateLoading from "./GenerateLoading"
import Image from "next/image"

import { useAccount, useDisconnect, useContractReads, useContractRead } from "wagmi"
import { useWeb3Modal } from "@web3modal/react"
import { CONSTANTS } from "../utils/CONSTANTS"

export const Create = ({ pdfData, setPdfData }) => {
  const [prompt, setPrompt] = useState(null) //url
  const [imageProcessing, setImageProcessing] = useState(false) //processing state ie. loading...
  const [error, setError] = useState(null) //error msg
  const [imageResult, setImageResult] = useState(null) //url
  const [selectedImage, setSelectedImage] = useState(null) //image chosen by user
  const [conditionalCreate, setConditionalCreate] = useState("")
  const [isMinting, setIsMinting] = useState(false) //minting nft state ie. loading...
  const [userDice, setUserDice] = useState([0, 0, 0, 0, 0, 0]) //dice balance

  const { address, isConnected } = useAccount()
  const { open, isOpen, close } = useWeb3Modal()
  const { disconnect } = useDisconnect()

  const { data: userTimer } = useContractRead({
    address: CONSTANTS.ceptorAddress,
    abi: CONSTANTS.ceptorABI,
    functionName: "userTimers",
    args: [address],
  })

  const diceContract = {
    address: CONSTANTS.diceAddress,
    abi: CONSTANTS.diceABI,
  }

  const {
    data: diceBalance,
    isError,
    isLoading,
  } = useContractReads({
    contracts: [
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 0],
      },
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 1],
      },
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 2],
      },
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 3],
      },
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 4],
      },
      {
        ...diceContract,
        functionName: "balanceOf",
        args: [address, 5],
      },
    ],
    // allowFailure: true,
  })

  //states: no data, pdf uploaded, images generated, nft minted

  useEffect(() => {
    if (pdfData) {
      console.log("pdfData: ", pdfData)
      //create text prompt using pdfData and other data
      const prompt = createPrompt(pdfData)
      console.log("prompt: ", prompt)
      setPrompt(prompt)
      setError(null)
    }
  }, [pdfData])

  useEffect(() => {
    if (prompt) {
      console.log("prompt update: ", prompt)
      // setPrompt(prompt);
      setError(null)
    }
  }, [prompt])

  useEffect(() => {
    if (isConnected) {
      console.log("wallet is connected", address)
      //call the dice contract

      console.log("userTimer: ", parseInt(userTimer))

      diceBalance.map((balance, i) => {
        console.log("balance: ", i, parseInt(balance))
      })
    }
  }, [isConnected, diceBalance])

  const retry = () => {
    setConditionalCreate("")
    setError(null)
  }

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

      <div className="bobby flex xl:flex-nowrap w-screen gap-2 justify-center items-center">
        <div className="flex flex-col w-full justify-center items-center">
          {!isConnected ? (
            <div onClick={() => open()}>Connect</div>
          ) : imageProcessing ? (
            <>
              <GenerateLoading />
            </>
          ) : error ? (
            <>
              <h1 className="text-4xl bg-red-400 text-red-800 cursor-pointer mt-48 animate-pulse" onClick={retry}>
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
  )
}
