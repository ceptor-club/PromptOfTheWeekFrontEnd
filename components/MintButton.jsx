import Image from "next/image"
import React from "react"
import { avatarNFTSTORAGE } from "../utils/web3utils"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { CONSTANTS } from "../utils/CONSTANTS"
import { useEffect, useState } from "react"
import { useAccount, useDisconnect } from "wagmi"
import { useWeb3Modal } from "@web3modal/react"

const MintButton = ({ selectedImage, pdfData, setIsMinting, prompt, isMinting }) => {
  const [metadataUrl, setMetadataUrl] = useState(null) //url
  const grayDisable = selectedImage ? "grayscale-0 cursor-pointer" : "grayscale opacity-50"
  const { data, isLoading, isSuccess, write } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: CONSTANTS.ceptorAddress,
    abi: CONSTANTS.ceptorABI,
    functionName: "mint",
    // args: [],
    chainId: 5,
  })

  const { address, isConnected } = useAccount()
  const { open, isOpen, close } = useWeb3Modal()
  const { disconnect } = useDisconnect()

  const mintAvatar = async () => {
    if (!selectedImage) {
      console.log("no image slected")
      return
    }

    if (!isConnected) {
      open()
    } else if (isConnected) {
      console.log("wallet is connected")
    }

    setIsMinting(true)
    console.log("Minting avatar...")

    const _metadataUrl = await avatarNFTSTORAGE(selectedImage, prompt, pdfData) //returns url of metadata json
    console.log("metadata url: ", _metadataUrl)
    setMetadataUrl(_metadataUrl)

    //mint nft
    const mintResult = write({
      recklesslySetUnpreparedArgs: [_metadataUrl],
    })
    console.log("mintResult: ", mintResult)
    //check for error
    setIsMinting(false)
  }

  return (
    <>
      <a onClick={mintAvatar} className={`${grayDisable} grid grid-cols-1 grid-rows-2 text-black text-4xl mt-6`}>
        <Image
          src="/images/Buttons/mint-btn.svg"
          alt="button-image"
          width={260}
          height={201}
          className="col-span-full row-span-full self-center"
        />
        {isMinting ? (
          <p className="flex items-end justify-center col-span-full row-start-1 p-1">MINTING</p>
        ) : (
          <p className="flex items-end justify-center col-span-full row-start-1 p-1">MINT</p>
        )}

        <div className="flex justify-center content-center col-span-full row-start-2 row-end-3 mb-4">
          <div className="flex items-center mr-2">
            <Image src="/images/Buttons/mint-icon.svg" alt="button-image" width={20} height={20} />
          </div>
          <p className="flex items-center text-xl">ERC-721 NFT</p>
        </div>
      </a>
    </>
  )
}

export default MintButton
