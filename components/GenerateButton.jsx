import { useState, useEffect } from "react";
import Image from "next/image";

const GenerateButton = ({ setConditionalCreate, pdfData, setImageProcessing, setError, setImageResult, imageResult }) => {
    const [isMinting, setIsMinting] = useState(false); //minting nft state ie. loading...


    const generateImages = async () => {
        console.log("Generating images... for ", prompt);
        setError(false);
        setImageProcessing(true);
        const fetchResult = await fetch("/api/getImage", {
            // <------------- COMMENTED OUT FOR TESTING
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                data: prompt,
            }),
        }); //result is given as base64 encoded images
        const result = await fetchResult.json();

        // const result = { images: [CONSTANTS.testBase64Image] }; // <------------- THIS IS FOR TESTING

        // console.log("result: ", result)
        setConditionalCreate("results")
        setImageProcessing(false);
        if (result.error) {
            return setError(result.error);
        }
        setImageResult(result);
    };

    return (
        <div
            className="flex w-72 item-center justify-center text-center align-center bg-black p-4 mt-6 animate-pulse cursor-pointer rounded-md"
            onClick={generateImages}
            disabled={pdfData ? false : true}
        >
            <Image
                src="/images\CREATE\dice.svg"
                alt=""
                width={64}
                height={64}
                className="mr-4"
            />
            <div
                className="flex items-center text-4xl"
            >
                {(!imageResult) ? (
                    <>
                        GENERATE
                    </>

                ) : (
                    <>
                        REROLL
                    </>
                )}
                {isMinting ? (
                    <p className="w-fit bg-[#D89A00] hover:bg-[#ab8933] py-1 px-6 rounded-full text-black cursor-not-allowed">
                        Minting...
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export default GenerateButton;