import React from "react";
import { useEffect, useState } from "react";
import { createPrompt } from "../utils/promptGen";
import AdvancedButton from "./AdvancedButton";
import { CONSTANTS } from "../utils/CONSTANTS";
import Image from "next/image";

const CharacterStats = ({
  pdfData,
  prompt,
  setPrompt,
  setError,
  setPdfData,
}) => {
  const [advanced, setAdvanced] = useState(false);

  useEffect(() => {
    if (pdfData) {
      /* console.log("pdfData: ", pdfData); */
      //create text prompt using pdfData and other data
      const prompt = createPrompt(pdfData);
      setPrompt(prompt);
      setError(null);
    }
  }, [pdfData, setPrompt, setError]);


  const handleClassSelect = (e) => {
    const input = document.getElementById("classInput");

    if (
      document.getElementById("classCheck").checked === true &&
      input.value !== ""
    ) {
      setPdfData({ ...pdfData, class: input.value });
    } else {
      setPdfData({ ...pdfData, class: "" });
    }
  };

  const handleArmorSelect = (e) => {
    const input = document.getElementById("armorInput");
    if (
      document.getElementById("armorCheck").checked === true &&
      input.value !== ""
    ) {
      setPdfData({ ...pdfData, armorWorn: input.value });
      createPrompt(pdfData);
    } else {
      setPdfData({ ...pdfData, armorWorn: "" });
    }
  };

  const handleBackgroundSelect = (e) => {
    const input = document.getElementById("backgroundInput");
    if (
      document.getElementById("backgroundCheck").checked === true &&
      input.value !== ""
    ) {
      setPdfData({ ...pdfData, background: input.value });
    } else {
      setPdfData({ ...pdfData, background: "" });
    }
  };

  const handleAlignmentSelect = (e) => {
    const input = document.getElementById("alignmentInput");
    if (
      document.getElementById("alignmentCheck").checked === true
    ) {
      setPdfData({ ...pdfData, alignment: input.value });
    } else {
      setPdfData({ ...pdfData, alignment: "" });
    }
  };

  const handleFeatureSelect = (e) => {
    const input = document.getElementById("featureInput");
    if (
      document.getElementById("featureCheck").checked === true &&
      input.value !== ""
    ) {
      setPdfData({ ...pdfData, feature: input.value });
    } else {
      setPdfData({ ...pdfData, feature: "" });
    }
  };

  const handleColorSelect = (e) => {
    const input = document.getElementById("colorInput");
setPdfData(input.value)
    if (
      document.getElementById("colorCheck").checked === true
    ) {
      setPdfData({ ...pdfData, color: input.value });
    } else {
      setPdfData({ ...pdfData, color: "" });
    }
  };

  const handleGenderSelect = (e) => {
    const input = document.getElementById("genderInput");
setPdfData(input.value)
    if (
      document.getElementById("genderCheck").checked === true
    ) {
      setPdfData({ ...pdfData, gender: input.value });
    } else {
      setPdfData({ ...pdfData, gender: "" });
    }
  };

  return (
    <>
      {true ? (
        <>
          <div className="relative">
            <div className="text-sm relative top-0 text-white w-screen sm:w-full overflow-visible mt-2 opacity-in opacity-load">


              <h4 className="text-center text-2xl pt-4">Character Stats</h4>

              <p className="mx-[48px] mb-2 mt-4">ON</p>
              <div className="h-full">
              <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    type="checkbox"
                    className="checkbox-stats"
                    checked
                  ></input>
                  <p className="mx-4">SYSTEM: D&D 5e (LOCKED)</p>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    type="checkbox"
                    className="checkbox-stats"
                    checked
                  ></input>
                  <p className="mx-4">RACE: Dragonborn (LOCKED)</p>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    id="classCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleClassSelect}
                    defaultChecked
                    readOnly
                  ></input>
                  <p className="mx-4">CLASS: </p>
                  <select
                    id="classInput"
                    placeholder="Class"
                    className="bg-transparent resize-none h-6 w-[200px]"
                    onChange={handleClassSelect}
                  >
                    <option value="" disabled selected hidden>
                      {pdfData.class ? pdfData.class : "Select a Class"}
                      </option>
                      {CONSTANTS.characterClass.map((characterClass) => (
                        <option key={characterClass}>{characterClass}</option>
                      ))}
                  </select>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
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
                    placeholder="Armor"
                    className="bg-transparent resize-none h-6 overflow-hidden"
                    onChange={handleArmorSelect}
                    value={pdfData.armorWorn ? pdfData.armorWorn : null}
                  >{pdfData.armorWorn}</textarea>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    id="backgroundCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleBackgroundSelect}
                    defaultChecked
                  ></input>
                  <p className="mx-4">BACKGROUND: </p>
                  <select
                    id="backgroundInput"
                    placeholder="Background"
                    className="bg-transparent resize-none h-6 w-[200px]"
                    onChange={handleBackgroundSelect}
                  >
                    <option value="" selected>
                    {pdfData.background ? pdfData.background : "Background..."}
                    </option>
                    {CONSTANTS.characterBackground.map((characterBackground) => (
                        <option key={characterBackground}>{characterBackground}</option>
                      ))}
                  </select>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4 overflow-hidden">
                  <input
                    id="alignmentCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleAlignmentSelect}
                    defaultChecked
                  ></input>
                  <p className="mx-4">ALIGNMENT: </p>
                  <select
                    id="alignmentInput"
                    placeholder="Neutral Good"
                    className="bg-transparent resize-none h-6 w-[200px]"
                    onChange={handleAlignmentSelect}
                  >
                    <option value="" selected>
                      {pdfData.alignment ? pdfData.alignment : "Alignment..."}
                      </option>
                    {CONSTANTS.characterAlignment.map((characterAlignment) => (
                        <option key={characterAlignment}>{characterAlignment}</option>
                      ))}
                  </select>
                </div>
                <div className="flex items-center ml-[48px] mt-2 mb-4">
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
                    placeholder="Feature"
                    className="bg-transparent resize-none h-6 overflow-hidden"
                    onChange={handleFeatureSelect}
                  >{pdfData.feature}</textarea>
                </div>

                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    id="colorCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleColorSelect}
                    defaultChecked
                  ></input>
                  <p className="mx-4">COLOR: </p>
                  <select
                    id="colorInput"
                    placeholder="Colors"
                    className="bg-transparent resize-none h-6 w-[200px]"
                    onChange={handleColorSelect}
                  >
                    <option value="" selected>
                    {pdfData.color ? pdfData.color : "Color..."}
                    </option>
                    {CONSTANTS.colors.map((colors) => (
                        <option key={colors}>{colors}</option>
                      ))}
                  </select>
                </div>

                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    id="genderCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleGenderSelect}
                    defaultChecked
                  ></input>
                  <p className="mx-4">GENDER : </p>
                  <textarea
                    id="genderInput"
                    placeholder="Gender"
                    className="bg-transparent resize-none h-6"
                    onChange={handleGenderSelect}
                    >{pdfData.gender}</textarea>
                </div>
              </div>
            </div>
            <Image
        src="/images/CREATE/char-stat-bg.svg"
        alt=""
        width={400}
        height={400}
        className="absolute top-0 w-full mx-auto -z-10"
      />
            <AdvancedButton advanced={advanced} setAdvanced={setAdvanced} />
            {advanced ? (
              <>
                <h3>Edit Your Prompt Manually</h3>
                <div className="bg-black text-left text-sm p-2">
                  <h3 className="mb-4">
                    Your Prompt Was Recovered from the Fires of the Forge!
                  </h3>
                  <textarea
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-[150px] bg-transparent resize-none"
                    value={prompt}
                  ></textarea>
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default CharacterStats;
