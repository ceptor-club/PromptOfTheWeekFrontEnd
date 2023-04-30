import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Alchemy, Network } from "alchemy-sdk";
import NftCard from "../components/NftCard";

export async function getServerSideProps() {
  const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY;
  const ALCHEMY_SEPOLIA_API_KEY = process.env.ALCHEMY_SEPOLIA_API_KEY;

  return {
    props: {
      ALCHEMY_GOERLI_API_KEY,
      ALCHEMY_SEPOLIA_API_KEY,
    },
  };
}

const NFTPage = ({ ALCHEMY_GOERLI_API_KEY, ALCHEMY_SEPOLIA_API_KEY }) => {
  const [alchemy, setAlchemy] = useState(null);
  const [latestBlock, setLatestBlock] = useState(null);
  const [nfts, setNfts] = useState([]);
  const cardsPerPage = 20;
  const [displayedCards, setDisplayedCards] = useState(cardsPerPage);
  const [enlargedCard, setEnlargedCard] = useState(null);
  
  useEffect(() => {
    const initializeAlchemy = async () => {
      if (ALCHEMY_GOERLI_API_KEY) {
        const goerliSettings = {
          apiKey: ALCHEMY_GOERLI_API_KEY,
          network: Network.ETH_GOERLI,
        };
        const goerliAlchemyInstance = new Alchemy(goerliSettings);
        setAlchemy((prev) => ({ ...prev, goerli: goerliAlchemyInstance }));
      }
  
      if (ALCHEMY_SEPOLIA_API_KEY) {
        const sepoliaSettings = {
          apiKey: ALCHEMY_SEPOLIA_API_KEY,
          network: Network.ETH_SEPOLIA,
        };
        const sepoliaAlchemyInstance = new Alchemy(sepoliaSettings);
        setAlchemy((prev) => ({ ...prev, sepolia: sepoliaAlchemyInstance }));
      }
  
    };
    initializeAlchemy();
  }, [ALCHEMY_GOERLI_API_KEY, ALCHEMY_SEPOLIA_API_KEY]);
  
  
  useEffect(() => {
    console.log("nfts state updated:", nfts);
  }, [nfts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
  
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setDisplayedCards((prev) => prev + cardsPerPage);
    }
  };
  
  
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
    const exploreCeptor = [
      {
        network: 'goerli',
        address: '0x4379044facb5f0879de15e70b45afd495a197674',
      },
      {
        network: 'goerli',
        address: '0x60fAF5FAe9F2EA10504d505B50104E783bf505B1',
      },
      {
        network: 'sepolia',//Sep Ceptors
        address: '0x4dBe3E96d429b9fE5F2Bb89728E39138aC4F817A',
      },
      {
        network: 'sepolia',//Sep Dice
        address: '0xEd1dbc1f6E5e9f4066AAa341c87e157Ad40328A9', 
      },
    ];
  
    let allNfts = [];
  
    for (const { network, address } of exploreCeptor) {
      // Get the Alchemy instance for the current network
      const currentAlchemy = alchemy[network];
  
      // Call the method to fetch metadata for the current network's address
      const response = await currentAlchemy.nft.getNftsForContract(address);
  
      // Add the fetched NFTs to the allNfts array
      allNfts = allNfts.concat(response.nfts);
    }
  
    // Log the response to the console and update the NFTs state
    console.log(allNfts);
    updateNfts({ nfts: allNfts });
  };
  

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
      <div className="flex flex-wrap">
        {Array.isArray(nfts) &&
          nfts.slice(0, displayedCards).map((nft) => {
            return (
              <NftCard
                key={nft.tokenId}
                nft={nft}
                isEnlarged={enlargedCard === nft.tokenId}
                onCardClick={handleCardClick}
              />
            );
          })}
      </div>
    </div>
  );
};

export default NFTPage;