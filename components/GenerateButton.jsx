import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CONSTANTS } from '../utils/CONSTANTS';
import { useRouter } from 'next/router';

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
  const router = useRouter();

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
    //const result = await fetchResult.json();

    const result = { images: [CONSTANTS.testBase64Image] }; // <------------- THIS IS FOR TESTING

    console.log('result: ', result);
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
        className='relative flex justify-center text-center align-center mt-6 cursor-pointer w-80 h-28 m-'
        onClick={generateImages}
        disabled={pdfData ? false : true}
      >
        <Image
          src='/images/Buttons/generateBackground2.png'
          alt=''
          width={200}
          height={120}
          className='absolute my-auto w-full h-full bottom-[2px] left-[2px] -z-20'
        />
        <Image
          src={
            imageResult
              ? '/images/Buttons/rerollbackground.png'
              : '/images/Buttons/generateBackground.png'
          }
          alt=''
          width={200}
          height={150}
          className='absolute my-auto w-full h-full -z-10'
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
            <p className='w-fit py-1 px-6 cursor-pointer'>REROLL</p>
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
      {imageResult ? (
        <p className='w-[250px] text-center bg-black bg-opacity-30 rounded-lg p-2 m-2'>
          Regenerate your avatar with the EXACT same prompt or{' '}
          <b> make changes below in ADVANCED </b> and then REROLL.
        </p>
      ) : null}

      {imageResult ? (
        <p
          onClick={() => router.reload('/')}
          className='my-24 cursor-pointer bg-black bg-opacity-30 rounded-lg p-5'
        >
          &#60;&#60; BACK TO START
        </p>
      ) : null}
    </>
  );
};

export default GenerateButton;
