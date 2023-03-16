import { useState, useEffect } from 'react';
import Image from 'next/image';

const GenerateButton = ({
  setConditionalCreate,
  prompt,
  pdfData,
  setImageProcessing,
  setError,
  setImageResult,
  imageResult,
  imageProcessing,
}) => {
  // Attempting to scroll to the results section whenever imageResult is updated
  useEffect(() => {
    if (imageResult) {
      const resultSection = document.getElementById('results');
      resultSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [imageResult]);

  const generateImages = async () => {
    console.log('Generating images... for ', prompt);
    setError(false);
    setImageProcessing(true);
    setConditionalCreate('results');
    const fetchResult = await fetch('/api/getImage', {
      // <------------- COMMENTED OUT FOR TESTING
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        data: prompt,
      }),
    }); //result is given as base64 encoded images
    const result = await fetchResult.json();

    // const result = { images: [CONSTANTS.testBase64Image] }; // <------------- THIS IS FOR TESTING

    // console.log("result: ", result)
    console.log('res prompt:', result.prompted);
    setImageProcessing(false);
    if (result.error) {
      return setError(result.error);
    }
    setImageResult(result);
  };

  return (
    <>
      <div
        className='relative flex justify-center text-center align-center mt-6 cursor-pointer w-96 h-28 m-4'
        onClick={generateImages}
        disabled={pdfData ? false : true}
      >
        <Image
          src='/images/Buttons/generateBackground.png'
          alt=''
          width={200}
          height={150}
          className='absolute my-auto w-full h-full'
        />
        <Image
          src='/images/Buttons/generateBackground2.png'
          alt=''
          width={200}
          height={120}
          className='absolute my-auto w-full h-full bottom-[2px] left-[2px] -z-10'
        />
        <Image
          src='/images/CREATE/dice.svg'
          alt=''
          width={36}
          height={36}
          className='mr-4 my-auto'
        />
        <div className='flex justify-center items-center text-4xl text-white'>
          {imageResult ? (
            <p className='w-fit py-1 px-6 cursor-pointer'>Reroll</p>
          ) : imageProcessing ? (
            <p className='w-fit py-1 px-6 cursor-not-allowed'>
              images loading...
            </p>
          ) : pdfData ? (
            <p className='w-fit py-1 px-6 cursor-pointer'>Generate</p>
          ) : (
            <p className='w-fit py-1 px-6 cursor-not-allowed'>Generate</p>
          )}
        </div>
      </div>
      <p className='m-0'>Character Images</p>
    </>
  );
};

export default GenerateButton;
