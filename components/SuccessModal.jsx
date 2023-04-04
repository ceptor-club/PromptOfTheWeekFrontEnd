import Image from 'next/image';

const SuccessModal = ({ selectedImage, modalOpen, setModalOpen }) => {
  const handleX = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && selectedImage ? (
        <>
          <div className='fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-80 flex items-center justify-center text-black'>
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
              <a
                href='https://ceptor.club/feedback/'
                target='_blank'
                rel='noreferrer'
                className='mt-2 hover:text-[#e137b1]'
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
