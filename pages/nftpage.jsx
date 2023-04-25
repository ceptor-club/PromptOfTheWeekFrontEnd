import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Alchemy, Network } from "alchemy-sdk";
import NftCard from "../components/NftCard";

// https://docs.alchemy.com/reference/getnftsforcollection

const NFTPage = ({ serverSideProviderUrl }) => {
  const [alchemy, setAlchemy] = useState(null);
  const [latestBlock, setLatestBlock] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const [enlargedCard, setEnlargedCard] = useState(null);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  useEffect(() => {
    const initializeAlchemy = async () => {
      if (serverSideProviderUrl) {
        const settings = {
          apiKey: serverSideProviderUrl,
          network: Network.ETH_GOERLI,
        };

        const alchemyInstance = new Alchemy(settings);
        setAlchemy(alchemyInstance);

        // Perform any additional async operations here
      }
    };
    initializeAlchemy();

  }, [serverSideProviderUrl]);
  
  useEffect(() => {
    console.log("nfts state updated:", nfts);
  }, [nfts]);
  

  // New getblockNum function
  const getblockNum = async () => {
    try {
      const blockNumber = await alchemy.core.getBlockNumber();
      setLatestBlock(blockNumber);
      console.log("The latest block number is", blockNumber);
    } catch (error) {
      console.error("Error fetching the latest block number:", error);
    }
  };

  const updateNfts = (newNfts) => {
    console.log("Type of newNfts:", typeof newNfts);
    if (Array.isArray(newNfts.nfts)) {
      console.log("newNfts is an array:", newNfts);
      setNfts(newNfts.nfts);
    } else {
      console.log("newNfts is not an array:", newNfts);
    }
  };
  

  const getNfts = async () => {
    // define the contract address whose NFTs you want to fetch
    const address = "0x4379044facb5f0879de15e70b45afd495a197674";

    //Call the method to fetch metadata
    const response = await alchemy.nft.getNftsForContract(address)

    //Logging the response to the console
    console.log(response)
    updateNfts(response);
  }


  const logNfts = () => {
    if (Array.isArray(nfts)) {
      console.log("nfts is an array:", nfts);
    } else {
      console.log("nfts is not an array:", nfts);
    }
  };

  const handleCardClick = (cardId) => {
    if (enlargedCard === cardId) {
      setEnlargedCard(null);
    } else {
      setEnlargedCard(cardId);
    }
  };
  
  

  return (
    <div>
      <button onClick={getNfts}>Get NFTs</button>
      <button onClick={logNfts}>Log NFTs</button>
      <div className="flex flex-wrap">
        {Array.isArray(nfts) &&
          nfts.slice(startIndex, endIndex).map((nft) => {
            return <NftCard
              key={nft.tokenId}
              nft={nft}
              isEnlarged={enlargedCard === nft.tokenId}
              onCardClick={handleCardClick}
            />;
          })}
              <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage * cardsPerPage >= nfts.length}
      >
        Next
      </button>
      </div>
    </div>
  );

};

export async function getServerSideProps() {
  const serverSideProviderUrl = process.env.ALCHEMY_API_KEY;

  return {
    props: {
      serverSideProviderUrl,
    },
  };
}

export default NFTPage;
