import React from "react";
import { useEffect, useState } from "react";
import { createPrompt } from "../utils/promptGen";


const CharacterStats = ({ pdfData, setPrompt, setError, setPdfData, }) => {

    useEffect(() => {
        if (pdfData) {
            console.log("pdfData: ", pdfData);
            //create text prompt using pdfData and other data
            const prompt = createPrompt(pdfData);
            setPrompt(prompt);
            setError(null);
        }
    }, [pdfData]);


    const handleGenderSelect = (e) => {
        const input = document.getElementById("genderInput")
        if (document.getElementById("genderCheck").checked === true && input.value !== "") {
            setPdfData({ ...pdfData, gender: input.value })
        } else {
            setPdfData({ ...pdfData, gender: "" })
        }
    };

    const handleLevelSelect = (e) => {
        const input = document.getElementById("levelInput")
        if (document.getElementById("levelCheck").checked === true && input.value !== "") {
            setPdfData({ ...pdfData, class: input.value })
        } else {
            setPdfData({ ...pdfData, class: "" })
        }
    };

    const handleArmorSelect = (e) => {
        const input = document.getElementById("armorInput")
        if (document.getElementById("armorCheck").checked === true && input.value !== "") {
            setPdfData({ ...pdfData, armorWorn: input.value })
        } else {
            setPdfData({ ...pdfData, armorWorn: "" })
        }
    };

    const handleBackgroundSelect = (e) => {
        const input = document.getElementById("backgroundInput")
        if (document.getElementById("backgroundCheck").checked === true && input.value !== "") {
            setPdfData({ ...pdfData, background: input.value })
        } else {
            setPdfData({ ...pdfData, background: "" })
        }
    };

    const handleAlignmentSelect = (e) => {
        const input = document.getElementById("alignmentInput")
        if (document.getElementById("alignmentCheck").checked === true && input.value !== "") {
            setPdfData({ ...pdfData, alignment: input.value })
        } else {
            setPdfData({ ...pdfData, alignment: "" })
        }
    };

    const handleFeatureSelect = (e) => {
        const input = document.getElementById("featureInput")
        if (document.getElementById("featureCheck").checked === true && input.value !== "") {
            setPdfData({ ...pdfData, feature: input.value })
        } else {
            setPdfData({ ...pdfData, feature: "" })
        }
    };

    return (
        <>
            {pdfData ? (
                <>
                    <div>
                        <div className="stats text-white pt-20 w-full md:3/6 h-[600px]">
                            <h3>Your Stats</h3>

                            <h4 className="text-center">From your Character Sheet</h4>

                            <p className="mx-[48px] mb-2 mt-6">ON</p>
                            <div>
                                <div className="flex items-center mx-[48px] mt-2 mb-6">
                                    <input type="checkbox" className="checkbox-stats" checked></input>
                                    <p className="mx-4">RACE: Dragonborn (LOCKED)</p>
                                </div>
                                <div className="flex items-center mx-[48px] mt-2 mb-6">
                                    <input
                                        id="levelCheck"
                                        type="checkbox"
                                        className="checkbox-stats"
                                        onChange={handleLevelSelect}
                                        defaultChecked
                                        readOnly
                                    ></input>
                                    <p className="mx-4">CLASS: </p>
                                    <textarea
                                        id="levelInput"
                                        placeholder={pdfData.class}
                                        className="bg-transparent resize-none h-6"
                                        onChange={handleLevelSelect}
                                    ></textarea>
                                </div>
                                <div className="flex items-center mx-[48px] mt-2 mb-6">
                                    <input
                                        type="checkbox"
                                        className="checkbox-stats"
                                        id="armorCheck"
                                        onChange={handleArmorSelect}
                                        defaultChecked
                                    ></input>
                                    <p className="mx-4">ARMOR: </p>
                                    <textarea
                                        id="armorInput"
                                        placeholder={pdfData.armorWorn}
                                        className="bg-transparent resize-none h-6 overflow-hidden"
                                        onChange={handleArmorSelect}
                                    ></textarea>
                                </div>
                                <div className="flex items-center mx-[48px] mt-2 mb-6">
                                    <input
                                        id="backgroundCheck"
                                        type="checkbox"
                                        className="checkbox-stats"
                                        onChange={handleBackgroundSelect}
                                        defaultChecked
                                    ></input>
                                    <p className="mx-4">BACKGROUND: </p>
                                    <textarea
                                        id="backgroundInput"
                                        placeholder={pdfData.background}
                                        className="bg-transparent resize-none h-6"
                                        onChange={handleBackgroundSelect}
                                    ></textarea>
                                </div>
                                <div className="flex items-center mx-[48px] mt-2 mb-6">
                                    <input
                                        id="alignmentCheck"
                                        type="checkbox"
                                        className="checkbox-stats"
                                        onChange={handleAlignmentSelect}
                                        defaultChecked
                                    ></input>
                                    <p className="mx-4">ALIGNMENT: </p>
                                    <textarea
                                        id="alignmentInput"
                                        placeholder={pdfData.alignment}
                                        className="bg-transparent resize-none h-6"
                                        onChange={handleAlignmentSelect}
                                    ></textarea>
                                </div>
                                <div className="flex items-center ml-[48px] mt-2 mb-6">
                                    <input
                                        id="featureCheck"
                                        type="checkbox"
                                        className="checkbox-stats"
                                        onChange={handleFeatureSelect}
                                        defaultChecked
                                    ></input>
                                    <p className="mx-4">FEATURE: </p>
                                    <textarea
                                        id="featureInput"
                                        placeholder={pdfData.feature}
                                        className="bg-transparent resize-none h-6 overflow-hidden"
                                        onChange={handleFeatureSelect}
                                    ></textarea>
                                </div>
                                <div className="flex items-center mx-[48px] mt-2 mb-6">
                                    <input
                                        id="genderCheck"
                                        type="checkbox"
                                        className="checkbox-stats"
                                        onChange={handleGenderSelect}
                                    ></input>
                                    <p className="mx-4">GENDER : </p>
                                    <textarea
                                        id="genderInput"
                                        placeholder="Gender"
                                        className="bg-transparent resize-none h-6"
                                        onChange={handleGenderSelect}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="stats text-white h-[600px] w-[500px] pt-20">
                    <h1 className="text-2xl">Your Stats</h1>
                    <h4 className="text-center">From your Character Sheet</h4>
                    <div>
                        <p className="mx-[48px] mb-2 mt-6">ON</p>
                        <div className="flex items-center mx-[48px] mt-2 mb-6">
                            <input type="checkbox" className="checkbox-stats" checked readOnly></input>
                            <p className="mx-4">RACE: Dragonborn (LOCKED)</p>
                        </div>
                        <div className="flex items-center mx-[48px] my-6">
                            <input type="checkbox" className="checkbox-stats" disabled></input>
                            <p className="mx-4">CLASS: </p>
                        </div>
                        <div className="flex items-center mx-[48px] my-6">
                            <input type="checkbox" className="checkbox-stats" disabled></input>
                            <p className="mx-4">ARMOR: </p>
                        </div>
                        <div className="flex items-center mx-[48px] my-6">
                            <input type="checkbox" className="checkbox-stats" disabled></input>
                            <p className="mx-4">BACKGROUND: </p>
                        </div>
                        <div className="flex items-center mx-[48px] my-6">
                            <input type="checkbox" className="checkbox-stats" disabled></input>
                            <p className="mx-4">ALIGNMENT: </p>
                        </div>
                        <div className="flex items-center mx-[48px] my-6">
                            <input type="checkbox" className="checkbox-stats" disabled></input>
                            <p className="mx-4">FEATURE: </p>
                        </div>
                        <div className="flex items-center mx-[48px] my-6">
                            <input type="checkbox" className="checkbox-stats" disabled></input>
                            <p className="mx-4">GENDER: </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CharacterStats;