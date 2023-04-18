import React from "react";
import Image from "next/image";

const NftCard = ({ nft }) => {
    const { rawMetadata } = nft;  
  const cardStyle = {
    backgroundColor: "rgba(44, 62, 80, 1)",
    borderRadius: "5px",
    color: "white",
    padding: "1rem",
    margin: "1rem",
    width: "300px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    marginBottom: "0.5rem",
    borderRadius: "5px",
  };

  return (
    <div className="nft-card">
      {rawMetadata.name && rawMetadata.image && rawMetadata.description ? (
        <>
          <h3>{rawMetadata.name}</h3>
          <Image
            src={rawMetadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
            alt={rawMetadata.name}
            width={250}
            height={250}
          />
          <p>{rawMetadata.description}</p>
        </>
      ) : (
        <div className="loading">
          <p>Loading NFT info...</p>
        </div>
      )}
    </div>
  );
  
};

export default NftCard;
