import React from 'react';
import { useEffect, useState } from 'react';
import { createPrompt } from '../utils/promptGen';
import { CharacterBackstory } from './CharacterBackstory';
import { CreateImageGrid } from './CreateImageGrid';
import PDFParser from './PDFParser';
import Placeholder from '../public/images/CREATE/placeholder.png';
import HelpToggle from './HelpToggle';
import SaveButton from './SaveButton';
import CopyButton from './CopyButton';
import CharacterStats from './CharacterStats';
import ToolTip from './ToolTip';
import MintButton from './MintButton';
import GenerateButton from './GenerateButton';
import GenerateLoading from './GenerateLoading';
import Image from 'next/image';
import AdvancedButton from './AdvancedButton';
import OCRParser from './OCRParser';

import {
  useAccount,
  useDisconnect,
  useContractReads,
  useContractRead,
} from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { CONSTANTS } from '../utils/CONSTANTS';
import { LoadingTips } from './LoadingTips';

// wallet connect
// buy dice/ display dice + timer
// burn dice for time
// show stats/create character stuff
// generate image
// select image
// mint image

//time dongxi:   const timeLeft = userTimer - Math.floor(Date.now() / 1000)

export const Create = () => {
  const [prompt, setPrompt] = useState(null); //url
  const [imageProcessing, setImageProcessing] = useState(false); //processing state ie. loading...
  const [error, setError] = useState(null); //error msg
  const [imageResult, setImageResult] = useState(null); //url
  const [selectedImage, setSelectedImage] = useState(null); //image chosen by user
  const [conditionalCreate, setConditionalCreate] = useState('');
  const [isMinting, setIsMinting] = useState(false); //minting nft state ie. loading...
  const [userDice, setUserDice] = useState([0, 0, 0, 0, 0, 0]); //dice balance
  const [pdfData, setPdfData] = useState({
    race: 'DnDDragonbornGeneral',
    class: '',
    armorWorn: '',
    background: '',
    alignment: '',
    feature: '',
    gender: '',
    color: '',
    weapon: '',
  });
  const [advanced, setAdvanced] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const { address, isConnected } = useAccount();
  const { open, isOpen, close } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const { data: userTimer } = useContractRead({
    address: CONSTANTS.ceptorAddress,
    abi: CONSTANTS.ceptorABI,
    functionName: 'userTimers',
    args: [address],
  });

  const diceContract = {
    address: CONSTANTS.diceAddress,
    abi: CONSTANTS.diceABI,
  };

  const {
    data: diceBalance,
    isError,
    isLoading,
  } = useContractReads({
    contracts: [
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 0],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 1],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 2],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 3],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 4],
      },
      {
        ...diceContract,
        functionName: 'balanceOf',
        args: [address, 5],
      },
    ],
    // allowFailure: true,
  });

  //states: no data, pdf uploaded, images generated, nft minted

  /*   useEffect(() => {
    if (pdfData) {
      console.log("pdfData: ", pdfData);
      //create text prompt using pdfData and other data
      const prompt = createPrompt(pdfData);
      console.log("prompt: ", prompt);
      setPrompt(prompt);
      setError(null);
    }
  }, [pdfData]); */

  /*   useEffect(() => {
    if (prompt) {
      console.log("prompt update: ", prompt);
      // setPrompt(prompt);
      setError(null);
    }
  }, [prompt]); */

  useEffect(() => {
    if (isConnected && diceBalance) {
      console.log('wallet is connected', address);
      //call the dice contract

      console.log('userTimer: ', parseInt(userTimer));

      console.log('diceBalance: ', diceBalance);

      diceBalance.map((balance, i) => {
        console.log('balance: ', i, parseInt(balance));
      });
    }
  }, [isConnected, diceBalance, address, userTimer]);

  const retry = () => {
    setConditionalCreate('');
    setError(null);
  };

  const advancedSection = () => {
    setAdvanced(!advanced);
    /*     const manualInput = document.getElementById('manualInput');
    manualInput.scrollIntoView({ behavior: 'smooth' }); */
  };

  const handleX = () => {
    setModalOpen(false);
  };

  return (
    <>
      {error ? (
        <>
          <div
            className='relative text-2xl w-full h-[400px] md:w-[500px] cursor-pointer'
            onClick={retry}
          >
            <div className='absolute top-0 w-full h-[300px] bg-black opacity-70 p-4 rounded-xl mt-6'></div>
            <div className='absolute top-0 flex flex-col align-center items-center justify-center h-[300px] p-4 mt-6 w-full'>
              <p className='opacity-100 cursor-pointer text-center w-full'>
                theres an error
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex xl:flex-nowrap w-screen gap-2 justify-center items-center'>
            <div className='flex flex-col w-full justify-center items-center'>
              {imageProcessing ? (
                <>
                  <LoadingTips />
                </>
              ) : !imageProcessing ? (
                <>
                  {/* <div className="relative text-center text-2xl w-full h-[350px] md:w-[500px]">
                    <div className="absolute top-0 w-full h-[300px] bg-black opacity-70 p-4 rounded-xl mt-6"></div>
                    <div className="absolute top-0 flex flex-col align-center items-center justify-between h-[300px] p-4 mt-6">
                      <p className="opacity-100 text-red-300">
                        Since we are in the early prototyping stage, our GPU is
                        currently down while we continue working.
                      </p>
                      <br></br>
                      <a
                        href="https://discord.gg/kPC8GMK5"
                        className="bg-gray-300 rounded-xl text-black hover:bg-gray-100 p-4 cursor-pointer"
                      >
                        Join our Discord and clamor for more!{" "}
                        <span className="">https://discord.gg/kPC8GMK5</span>
                      </a>
                    </div>
                  </div> */}
                  <OCRParser
                    pdfData={pdfData}
                    setError={setError}
                    setPdfData={setPdfData}
                    imageProcessing={imageProcessing}
                    setImageProcessing={setImageProcessing}
                  />
                  <CharacterStats
                    pdfData={pdfData}
                    prompt={prompt}
                    setPrompt={setPrompt}
                    setError={setError}
                    setPdfData={setPdfData}
                    imageResult={imageResult}
                    advanced={advanced}
                  />
                </>
              ) : null}

              {imageResult && !imageProcessing ? (
                <>
                  <div className='flex flex-col items-center bg-black mt-8'>
                    <h3 id='results' className='text-4xl mb-4'>
                      RESULTS
                    </h3>
                    <p>Select an image to save or mint</p>
                    {/* images grid */}
                    <div className='m-4 mb-6'>
                      {/* a grid of 9 images */}
                      <CreateImageGrid
                        imageResult={imageResult}
                        imageProcessing={imageProcessing}
                        error={error}
                        pdfData={pdfData}
                        setSelectedImage={setSelectedImage}
                      />
                    </div>
                  </div>
                </>
              ) : null}

              {imageResult && !imageProcessing ? (
                <div className='flex gap-4 justify-center items-center'>
                  <MintButton
                    selectedImage={selectedImage}
                    pdfData={pdfData}
                    setIsMinting={setIsMinting}
                    isMinting={isMinting}
                    prompt={prompt}
                  />
                  <SaveButton selectedImage={selectedImage} />
                  {/* <CopyButton selectedImage={currentSelection} /> */}
                </div>
              ) : null}

              {!error && !imageProcessing ? (
                <GenerateButton
                  setConditionalCreate={setConditionalCreate}
                  setImageProcessing={setImageProcessing}
                  setError={setError}
                  setImageResult={setImageResult}
                  imageResult={imageResult}
                  pdfData={pdfData}
                  isMinting={isMinting}
                  imageProcessing={imageProcessing}
                  prompt={prompt}
                />
              ) : null}

              {imageResult ? (
                <>
                  <div
                    className='flex cursor-pointer'
                    onClick={advancedSection}
                  >
                    <p className='text-2xl mr-4'>ADVANCED</p>
                    <span
                      className='arrow-down'
                      onClick={advancedSection}
                    ></span>
                  </div>
                </>
              ) : null}

              {advanced && !imageProcessing ? (
                <>
                  <h3 className='mt-8 text-2xl'>PROMPT SMITH</h3>
                  <h3>Edit Your Prompt Manually</h3>
                  <div className='bg-black text-left text-sm p-2'>
                    <h3 className='mb-4'>
                      Your Prompt Was Recovered from the Fires of the Forge!
                    </h3>
                    <textarea
                      onChange={(e) => setPrompt(e.target.value)}
                      className='w-full h-[150px] bg-transparent resize-none'
                      value={prompt ? prompt : ''}
                      id='manualInput'
                    ></textarea>
                  </div>
                </>
              ) : imageResult ? null : null}
              <a
                href='https://ceptor.club/feedback/'
                target='_blank'
                rel='noreferrer'
                className='mt-12 mb-4 hover:text-[#e137b1]'
              >
                FEEBACK / BUG REPORT
              </a>
              <a
                href='https://discord.gg/kPC8GMK5'
                className='bg-gray-300 bg-opacity-50 rounded-sm text-black hover:bg-gray-100 p-4 cursor-pointer'
              >
                Join our Discord and clamor for more!{' '}
                <span className=''>https://discord.gg/kPC8GMK5</span>
              </a>
            </div>
          </div>
        </>
      )}
      {modalOpen ? (
        <>
          <div className='w-screen h-screen absolute top-0 z-20 bg-black bg-opacity-80 flex items-center justify-center text-black'>
            <div className='p-6 pt-2 bg-white text-center rounded-lg flex flex-col items-center'>
              <p
                className='w-full text-right text-4xl cursor-pointer'
                onClick={handleX}
              >
                <b>&times;</b>
              </p>
              <p className=''>Congratulations!</p>
              <p className='pb-2'>Share your creation with a friend</p>
              <Image
                src={
                  selectedImage ? selectedImage : 'https://picsum.photos/200'
                }
                alt=''
                width={200}
                height={200}
                className='w-full'
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
