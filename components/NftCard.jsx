import React from "react";
import Image from "next/image";
import { useState } from "react";

const NftCard = ({ nft, isEnlarged, onCardClick }) => {
  const { rawMetadata } = nft;
  const [isExpanded, setIsExpanded] = useState(false);


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
    </div>
  );
   
  /** 
  * HTML for NFT Card at when Enlarged
  */

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
