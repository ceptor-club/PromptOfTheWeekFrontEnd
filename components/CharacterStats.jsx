import React from "react";
import { useEffect, useState } from "react";
import { createPrompt } from "../utils/promptGen";
import AdvancedButton from "./AdvancedButton";

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
  }, [pdfData]);

  const handleGenderSelect = (e) => {
    const input = document.getElementById("genderInput");
    if (
      document.getElementById("genderCheck").checked === true &&
      input.value !== ""
    ) {
      setPdfData({ ...pdfData, gender: input.value });
    } else {
      setPdfData({ ...pdfData, gender: "" });
    }
  };

  const handleLevelSelect = (e) => {
    const input = document.getElementById("levelInput");
    if (
      document.getElementById("levelCheck").checked === true &&
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
      document.getElementById("alignmentCheck").checked === true &&
      input.value !== ""
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

  return (
    <>
      {true ? (
        <>
          <div>
            <div className="stats text-white py-10 w-full md:3/6 overflow-visible mt-10">
              <h3>Your Stats</h3>

              <h4 className="text-center">From your Character Sheet</h4>

              <p className="mx-[48px] mb-2 mt-4">ON</p>
              <div className="h-full">
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
                    placeholder="Class"
                    className="bg-transparent resize-none h-6"
                    onChange={handleLevelSelect}
                  ></textarea>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    type="checkbox"
                    className="checkbox-stats"
                    id="armorCheck"
                    onChange={handleArmorSelect}
                  ></input>
                  <p className="mx-4">ARMOR: </p>
                  <textarea
                    id="armorInput"
                    placeholder="Armor"
                    className="bg-transparent resize-none h-6 overflow-hidden"
                    onChange={handleArmorSelect}
                  ></textarea>
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
                  <textarea
                    id="backgroundInput"
                    placeholder="Background"
                    className="bg-transparent resize-none h-6"
                    onChange={handleBackgroundSelect}
                  ></textarea>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    id="alignmentCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleAlignmentSelect}
                  ></input>
                  <p className="mx-4">ALIGNMENT: </p>
                  <textarea
                    id="alignmentInput"
                    placeholder="Neutral Good"
                    className="bg-transparent resize-none h-6"
                    onChange={handleAlignmentSelect}
                  ></textarea>
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
                  ></textarea>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
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
                    value={prompt || ""}
                  />
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
