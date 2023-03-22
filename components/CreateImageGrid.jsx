import Image from 'next/image';
import React from 'react';
import { useEffect } from 'react';
import { LoadingTips } from './LoadingTips';
import Placeholder from '../public/images/CREATE/placeholder.png';
import { useState } from 'react';
import Script from 'next/script';
import { NextScript } from 'next/document';

export const CreateImageGrid = ({
  imageProcessing,
  imageResult,
  error,
  pdfData,
  setSelectedImage,
}) => {
  const [currentSelection, setCurrentSelection] = useState(false);

  useEffect(() => {
    if (imageProcessing) console.log('imageProcessing: ', imageProcessing);
    // console.log("imageProcessing: ", imageProcessing);
    // console.log("imageResult: ", imageResult);
  }, [imageProcessing, imageResult]);

  function handleImageSelect(image, e) {
    e.preventDefault();
    setSelectedImage(image);
    setCurrentSelection(parseInt(e.target.id));
    console.log(image);
    console.log('currentselection', currentSelection);
  }

  function handleDblClick(e) {
    e.preventDefault();
    // this needs written to display double clicked result image full screen
  }

  if (error)
    return (
      <div className='flex justify-center items-center h-full text-3xl'>
        <p className=' text-red-400'>{error}</p>
      </div>
    );
  if (imageProcessing)
    //TODO: RENDER TIPS
    return;

  // <div className="flex justify-center items-center h-full text-3xl">
  // <LoadingTips />
  /* <Image
          src="https://media.tenor.com/43s33wGTNo0AAAAC/sweating-nervous.gif"
          alt="sweating-nervous"
          width={256}
          height={256}
        /> */
  // </div>

  if (!pdfData)
    return (
      <div className='flex justify-center items-center h-full text-3xl'>
        <p className=' text-yellow-400 '>Please upload a character sheet!</p>
      </div>
    );
  else if (imageResult)
    return (
      <>
        <div className='flex gap-4 justify-center items-center flex-wrap lg:flex-nowrap'>
          {imageResult.images.map((image, i) => {
            return (
              <>
                <div className='flex flex-col justify-center items-center max-w-[512px] max-h-[512px]'>
                  <Image
                    className={`cursor-pointer m-2 ${
                      currentSelection === i ? 'border border-8' : null
                    }`}
                    key={i}
                    id={i}
                    onClick={(e) => handleImageSelect(image, e)}
                    onDoubleClick={(e) => handleDblClick(e)}
                    src={image}
                    alt=''
                    width={512}
                    height={512}
                  />
                  {currentSelection === i ? (
                    <>
                      {/*                       <Script
                        type='text/javascript'
                        async
                        src='https://platform.twitter.com/widgets.js'
                      />
                      <a
                        className='twitter-share-button'
                        href='https://twitter.com/intent/tweet?text=Check%20out%20my%20new%20DnD%20avatar%20made%20with%20Ceptor%20Club'
                      >
                        Tweet
                      </a> */}
                    </>
                  ) : null}
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  else if (pdfData) {
    return (
      <div className='flex justify-center items-center h-full text-3xl'>
        <p className=' text-emerald-400'>
          We have your character sheet parsed, you can now generate your image!
        </p>
      </div>
    );
  }
  return (
    <div className='grid grid-cols-1 gap-0 p-4 border'>
      <div className={`${imgState}`}>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
      <div className=''>
        <Image src={Placeholder} alt='' />
      </div>
    </div>
  );
};
