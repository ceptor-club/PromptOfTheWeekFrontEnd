import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { LoadingTips } from "./LoadingTips";
import Placeholder from "../public/images/CREATE/placeholder.png";
import { useState } from "react";

export const CreateImageGrid = ({
  imageProcessing,
  imageResult,
  error,
  pdfData,
  setSelectedImage,
}) => {
  useEffect(() => {
    if (imageProcessing) console.log("imageProcessing: ", imageProcessing);
    // console.log("imageProcessing: ", imageProcessing);
    // console.log("imageResult: ", imageResult);
  }, [imageProcessing, imageResult]);

  const [currentSelection, setCurrentSelection] = useState(false)

  function handleImageSelect(image, e) {
    e.preventDefault();
    setSelectedImage(image);
    setCurrentSelection(parseInt(e.target.id))
  }


  if (error)
    return (
      <div className="flex justify-center items-center h-full text-3xl">
        <p className=" text-red-400">{error}</p>
      </div>
    );
  if (imageProcessing)
    //TODO: RENDER TIPS
    return (
      <div className="flex justify-center items-center h-full text-3xl">
        <LoadingTips />
        {/* <Image
          src="https://media.tenor.com/43s33wGTNo0AAAAC/sweating-nervous.gif"
          alt="sweating-nervous"
          width={256}
          height={256}
        /> */}
      </div>
    );
  if (!pdfData)
    return (
      <div className="flex justify-center items-center h-full text-3xl">
        <p className=" text-yellow-400 ">Please upload a character sheet!</p>
      </div>
    );
  else if (imageResult)
    return (
      <div className="flex justify-center items-center">
        {imageResult.images.map((image, i) => {
          return (
            <Image
              className={`w-1/2 cursor-pointer m-2 ${currentSelection === i ? "border border-8" : null}`}
              key={i}
              id={i}
              onClick={(e) => handleImageSelect(image, e)}
              src={image}
              alt=""
              width={128}
              height={128}
            />
          );
        })}
      </div>
    );
  else if (pdfData) {
    return (
      <div className="flex justify-center items-center h-full text-3xl">
        <p className=" text-emerald-400">
          We have your character sheet parsed, you can now generate your image!
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className={`${imgState}`}>
        <Image src={Placeholder} alt="" />
      </div>
      <div className="">
        <Image src={Placeholder} alt="" />
      </div>
      <div className="">
        <Image src={Placeholder} alt="" />
      </div>
      <div className="">
        <Image src={Placeholder} alt="" />
      </div>
      <div className="">
        <Image src={Placeholder} alt="" />
      </div>
      <div className="">
        <Image src={Placeholder} alt="" />
      </div>
      <div className="">
        <Image src={Placeholder} alt="" />
      </div>
      <div className="">
        <Image src={Placeholder} alt="" />
      </div>
      <div className="">
        <Image src={Placeholder} alt="" />
      </div>
    </div>
  );
};
