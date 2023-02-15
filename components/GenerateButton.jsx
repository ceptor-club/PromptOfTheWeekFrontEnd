import { useState, useEffect } from "react";
import Image from "next/image";

const GenerateButton = ({ setConditionalCreate, pdfData, setImageProcessing, setError, setImageResult, imageResult, imageProcessing }) => {



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

                {imageResult ? (
                    <p
                        className="w-fit bg-[#D89A00] hover:bg-[#ab8933] py-1 px-6 rounded-full text-black cursor-pointer animate-pulse"
                    >
                        Reroll
                    </p>
                ) : imageProcessing ? (
                    <p className="w-fit bg-[#D89A00] hover:bg-[#ab8933] py-1 px-6 rounded-full text-black cursor-not-allowed">
                        images loading...
                    </p>
                ) : pdfData ? (
                    <p
                        className="w-fit bg-emerald-600 hover:bg-emerald-500 py-1 px-6 rounded-full text-black cursor-pointer animate-pulse"
                        onClick={generateImages}
                    >
                        Generate Images
                    </p>
                ) : (
                    <p className="w-fit bg-[#D89A00] hover:bg-[#ab8933] py-1 px-6 rounded-full text-black cursor-not-allowed">
                        Generate
                    </p>
                )}
            </div>
        </div>
    );
}

export default GenerateButton;