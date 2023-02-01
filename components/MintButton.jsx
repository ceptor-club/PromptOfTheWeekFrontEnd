import Image from "next/image";

const MintButton = (selectedImage) => {
  return (
    <>
      <a
        href={selectedImage.selectedImage}
        onClick={() => {
          alert(
            "clicked on the MINT BUTTON",
            selectedImage.selectedImage
          );
        }}
        className="grid grid-cols-1 grid-rows-2 text-black text-4xl mt-6"
      >
        <Image
          src="/images/Buttons/mint-btn.svg"
          alt="button-image"
          width={260}
          height={201}
          className="col-span-full row-span-full self-center"
        />
        <p className="flex items-end justify-center col-span-full row-start-1 p-1">MINT</p>
        <div className="flex justify-center content-center col-span-full row-start-2 row-end-3 mb-4">
          <div className="flex items-center mr-2">
            <Image
              src="/images/Buttons/mint-icon.svg"
              alt="button-image"
              width={20}
              height={20}
            />
          </div>
          <p className="flex items-center text-xl">ERC-721 NFT</p>
        </div>
      </a>
    </>
  );
};

export default MintButton;
