import Image from 'next/image';
import React from 'react';
import { avatarNFTSTORAGE } from '../utils/web3utils';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { CONSTANTS } from '../utils/CONSTANTS';
import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import SuccessModal from './SuccessModal';

const MintButton = ({
  selectedImage,
  pdfData,
  setIsMinting,
  prompt,
  isMinting,
  setModalOpen,
}) => {
  const [metadataUrl, setMetadataUrl] = useState(null); //url
  const [mintError, setMintError] = useState(null); //error

  const grayDisable = selectedImage
    ? 'grayscale-0 cursor-pointer'
    : 'grayscale opacity-50';

  const { data, isLoading, isSuccess, write, writeAsync, isError, config } =
    useContractWrite({
      mode: 'recklesslyUnprepared',
      address: CONSTANTS.ceptorAddress,
      abi: CONSTANTS.ceptorABI,
      functionName: 'mint',
      // args: [],
      /* chainId: process.env.NEXT_PUBLIC_NETWORK_ID, */
    });

  /*   const contractWrite = useContractWrite(config); */
  const { isSuccess: txnSuccess, isLoading: txnPending } =
    useWaitForTransaction({
      hash: data?.hash,
      onSuccess(dataSuccess) {
        console.log('Success', dataSuccess);
        console.log('Hash passed to useWaitForTransaction', data?.hash);
      },
    });

  if (data?.hash) {
    console.log('Hash passed to useWaitForTransaction in the IF', data?.hash);
  }

  // wait for actual txn success
  // if true, run waitFor
  useEffect(() => {
    if (txnSuccess) {
      console.log('HEY IT WORKED, TXN SUCCESSFUL', data?.hash);
      setModalOpen(true);
    }
  }, [txnSuccess]);

  const { address, isConnected } = useAccount();
  const { open, isOpen, close } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    console.log('ISCONNECTED: ', isConnected);
  }, [isConnected]);

  const mintAvatar = async () => {
    if (!selectedImage) {
      console.log('no image slected');
      return;
    }

    try {
      if (!isConnected) {
        open();
      } else if (isConnected) {
        console.log('wallet is connected');
      }

      setIsMinting(true);
      console.log('Minting avatar...');

      const _metadataUrl = await avatarNFTSTORAGE(
        selectedImage,
        prompt,
        pdfData
      ); //returns url of metadata json
      console.log('metadata url: ', _metadataUrl);
      setMetadataUrl(_metadataUrl);

      //mint nft
      const mintResult = await writeAsync({
        recklesslySetUnpreparedArgs: [_metadataUrl],
      });
      console.log('mintResult: ', mintResult); //this one isn't async, so it will never have the right data

      //check for error
      // setIsMinting(false)
    } catch (error) {
      console.log('MINT ERROR CATCH: ', error.reason);
      setMintError(error.reason);
    }
  };

  useEffect(() => {
    data && console.log('MINT DATA: ', data);
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.log('MINT ERROR: ', isError);
      setIsMinting(false);
    }
  }, [isError, setIsMinting]);

  useEffect(() => {
    if (isSuccess) {
      console.log('MINT SUCCESS: ', isSuccess);
      setIsMinting(false);
    }
  }, [isSuccess, setIsMinting]);

  return (
    <>
      <SuccessModal />
      <a
        onClick={mintAvatar}
        className={`${grayDisable} grid grid-cols-1 grid-rows-2 text-black text-4xl mt-6`}
      >
        <Image
          src='/images/Buttons/mint-btn.svg'
          alt='button-image'
          width={260}
          height={201}
          className='col-span-full row-span-full self-center'
        />
        {mintError && (
          <p className='text-red-500 font-bold text-sm col-span-full row-start-1 w-42'>
            {mintError}
          </p>
        )}
        {txnPending ? (
          <p className='flex items-end justify-center col-span-full row-start-1 p-1'>
            MINTING
          </p>
        ) : (
          <p className='flex items-end justify-center col-span-full row-start-1 p-1'>
            MINT
          </p>
        )}

        <div className='flex justify-center content-center col-span-full row-start-2 row-end-3 mb-4'>
          <div className='flex items-center mr-2'>
            <Image
              src='/images/Buttons/mint-icon.svg'
              alt='button-image'
              width={20}
              height={20}
            />
          </div>
          <p className='flex items-center text-xl'>ERC-721 NFT</p>
        </div>
      </a>
    </>
  );
};

export default MintButton;
