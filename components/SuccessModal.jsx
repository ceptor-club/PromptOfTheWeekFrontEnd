import Image from 'next/image';

const SuccessModal = ({
  selectedImage,
  modalOpen,
  setModalOpen,
  modalMessage,
  successTxnHash,
}) => {
  /*   const handleX = () => {
    setModalOpen(false);
  }; */

  const closeModal = (e) => {
    console.log(e);
    const search = e.target.className;
    if (search.includes('modal')) {
      setModalOpen(false);
    }
  };

  return (
    <>
      {modalOpen && selectedImage ? (
        <>
          <div
            className='modal fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-80 flex items-center justify-center text-black'
            onClick={closeModal}
          >
            <div className='p-6 pt-2 bg-white text-center rounded-lg flex flex-col items-center'>
              <p className='w-full text-right text-4xl'>
                <b className='modal cursor-pointer' onClick={closeModal}>
                  &times;
                </b>
              </p>
              <p className='mb-2 '>{modalMessage}</p>

              {successTxnHash && (
                <>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${successTxnHash}`}
                    target={_blank}
                    className='text-blue-500'
                  >
                    See your Transaction on Etherscan
                  </a>
                  <a
                    href={`https://testnets.opensea.io/`}
                    target={_blank}
                    className='text-blue-500'
                  >
                    See your Avatar on OpenSea
                  </a>
                </>
              )}

              <Image
                src={
                  selectedImage ? selectedImage : 'https://picsum.photos/200'
                }
                alt=''
                width={200}
                height={200}
                className='w-full'
              />
              <a
                href='https://ceptor.club/feedback/'
                target='_blank'
                rel='noreferrer'
                className='mt-2 hover:text-[#e137b1] text-blue-500 underline'
              >
                Submit Feedback
              </a>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SuccessModal;
