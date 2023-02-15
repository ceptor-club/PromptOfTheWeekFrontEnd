import Image from "next/image";

const SaveButton = (selectedImage) => {
  return (
    <>
      <a
        href={selectedImage.selectedImage}
        download="character_image"
        className="grid grid-cols-1 grid-rows-2 text-black text-4xl mt-6"

      >
        <Image
          src="/images/Buttons/save-btn.svg"
          alt="button-image"
          width={260}
          height={201}
          className="col-span-full row-span-full self-center"
        />
        <p className="flex items-end justify-center col-span-full row-start-1 p-1">SAVE</p>
        <div className="flex justify-center content-center col-span-full row-start-2 row-end-3 mb-4">
          <div className="flex items-center mr-2">
            <Image
              src="/images/Buttons/download-icon.svg"
              alt="button-image"
              width={20}
              height={20}
            />
          </div>
          <p className="flex items-center text-xl">PNG</p>
        </div>
      </a>
    </>
  );
};

export default SaveButton;
