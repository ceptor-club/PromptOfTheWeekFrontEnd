import Image from "next/image";


const CopyButton = ({ selectedImage }) => {
    return (
        <>
            <a
                onClick={() => {
                    try {
                        navigator.clipboard.write([
                            new ClipboardItem({
                                selectedImage: pngImageBlob
                            })
                        ]);
                    } catch (error) {
                        console.error(error);
                    }
                }}
                className="grid grid-cols-1 grid-rows-2 text-black text-4xl mt-6"

            >
                <Image
                    src="/images/Buttons/copy-btn.svg"
                    alt="button-image"
                    width={260}
                    height={201}
                    className="col-span-full row-span-full self-center"
                />
                <p className="flex items-end justify-center col-span-full row-start-1 p-1">COPY</p>
                <div className="flex justify-center content-center col-span-full row-start-2 row-end-3 mb-4">
                    <div className="flex items-center mr-2">
                        <Image
                            src="/images/Buttons/copy-icon.svg"
                            alt="button-image"
                            width={20}
                            height={20}
                        />
                    </div>
                    <p className="flex items-center text-xl">COPY TO CLIPBOARD</p>
                </div>
            </a>
        </>
    );
};

export default CopyButton;