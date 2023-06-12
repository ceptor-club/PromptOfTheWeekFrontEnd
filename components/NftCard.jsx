import React from "react";
import Image from "next/image";
import { useState, useContext } from "react";
import { SocketContext } from '../utils/socketContext'; // import the SocketContext
import { Alchemy, Network } from "alchemy-sdk";

const NftCard = ({ nft, isEnlarged, id, onCardClick }) => {
  const { rawMetadata } = nft;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const socket = useContext(SocketContext); // use the SocketContext


  /**
   * ***************************
   * ***************************
   * ** CSS objects 
   * ***************************
   * ***************************
  */

  /** 
  * CSS property-value pair object for the Cards that display the NFTs
  */
  const cardStyle = {
    backgroundColor: "rgba(16, 62, 218, 1)",
    borderRadius: "5px",
    color: "white",
    padding: "1rem",
    margin: "1rem",
    width: "300px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
    transition: "transform 0.3s ease",
    position:"relative",
  };

  /** 
  * CSS property-value pair object for titles in the NFT cards
  */
  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  };

  /** 
  * CSS property-value pair object for image in the NFT cards
  */
  const imageStyle = {
    width: "100%",
    height: "auto",
    marginBottom: "0.5rem",
    borderRadius: "5px",
  };

  /** 
  * CSS property-value pair object for NFT card when it's expanded
  */
  const cardEnlargedStyle = isEnlarged ? {
    ...cardStyle, // inherit cardStyle properties to OVERRIDE
    width: "400px",
    transform: "scale(1.2)",
    zIndex: 2,
    position: "relative",
    transition: "transform 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  }
    : {};
  
  /** 
  * CSS property-value pair object for image of NFT card when it's expanded
  */
  const cardEnlargedImageStyle = isEnlarged ? {
    ...imageStyle,
    marginBottom: "0.5rem",
    borderRadius: "5px",
  } : {};

  const heartButtonStyle = {
    cursor: "pointer", // Change cursor to pointer to indicate a clickable area
    position: "absolute", // Position the button relative to the NftCard div
    top: "10px", // Position from the top of the NftCard div
    right: "10px", // Position from the right of the NftCard div
    backgroundColor: "transparent", // Transparent background
    border: "none", // Remove default button border
    fontSize: "1.5rem", // Increase heart icon size
    color: isLiked ? "red" : "grey", // Change color based on isLiked state
  };

  /** 
   * ***************************
   * ***************************
   * ** Functions to display HTML 
   * ** And handle Card click
   * ***************************
   * ***************************
  */


  /** 
  * Used for bookkeeping to ensure only one Card is enlarged at a time
  */

  const handleClick = () => {
    onCardClick(nft.tokenId);
  };
  
  /** 
  * HTML for NFT Card at base state
  */
  const DefaultView = () => (
    <div>
      <h3 style={titleStyle}>{rawMetadata.name}</h3>
      <p>Token ID: {nft.tokenId}</p>
      <p>LV: {rawMetadata.attributes.find(attr => attr.trait_type === "Level").value}</p>
      <Image
        src={rawMetadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        alt={rawMetadata.name}
        width={250}
        height={250}
        style={imageStyle}
      />
        <button onClick={handleLikeClick} style={heartButtonStyle}>
        {isLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
   
  /** 
  * HTML for NFT Card at when Enlarged
  */

  const handleLikeClick = async (e) => {
    e.stopPropagation(); // prevent click event from bubbling up to the card
    if (isLiked == false) {
      console.log(`${id} liked! NFT ${nft.tokenId} created by ${nft.owner} from contract ${nft.contract.address}!`);

      const updateData = {
        id: id,
        contractAddress: nft.contract.address,
        tokenId: nft.tokenId,
        ownerId: nft.owner
      }
      const response = await fetch('/api/updateLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
    };
    setIsLiked(!isLiked); // toggle heart filled state

}


  const EnlargedView = () => {
  
    const displayedAttributes = rawMetadata.attributes.filter((_, index) => index >= 3 && index <= 9 || index === 10);
    const descriptionStyle = {
      fontStyle: "italic",
      fontSize: "75%", // Reducing the font size by 25%
    };
    return (
      <div>
      <Image
        src={rawMetadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        alt={rawMetadata.name}
        width={250}
        height={250}
        style={cardEnlargedImageStyle}
      />
        <p style={descriptionStyle}>{rawMetadata.description}</p>
        <ul>
        {displayedAttributes.map((attr, index) => (
          <li key={index}>
            {attr.trait_type ? attr.trait_type : "Creator"}: {attr.value}
          </li>
        ))}
      </ul>


    </div>
    );
  };

  /**
   * 
   * Final NFT card div 
   */
  return (
    <div className="nft-card"
      onClick={handleClick}
      style={{ ...cardStyle, ...cardEnlargedStyle }}>
      {rawMetadata.name && rawMetadata.image ? (
          isEnlarged ? <EnlargedView /> : <DefaultView />
      ) : (
        <div className="loading">
          <p>Loading NFT info...</p>
        </div>
      )}
    </div>
  );
};

export default NftCard;
