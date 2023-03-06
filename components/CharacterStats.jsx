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
                    id="levelCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleLevelSelect}
                    defaultChecked
                    readOnly
                  ></input>
                  <p className="mx-4">CLASS: </p>
                  <select
                    id="levelInput"
                    placeholder="Class"
                    className="bg-transparent resize-none h-6 w-[200px]"
                    onChange={handleLevelSelect}
                  >
                    <option value="0" selected>
                      Select Class...
                    </option>
                    <option value="Artificer Alchemist">
                      Artificer (Alchemist) (TCoE)
                    </option>
                    <option value="Artificer Armorer">
                      Artificer (Armorer) (TCoE)
                    </option>
                    <option value="Artificer Artillerist">
                      Artificer (Artillerist) (TCoE)
                    </option>
                    <option value="Artificer BattleSmith">
                      Artificer (Battle Smith) (TCoE)
                    </option>
                    <option value="Artificer">
                      Artificer (Other Custom Subclass)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="Barbarian Ancestral">
                      Barbarian (Ancestral Guardian) (XGtE)
                    </option>
                    <option value="Barbarian Beast">
                      Barbarian (Path of the Beast) (TCoE)
                    </option>
                    <option value="Barbarian Berserker">
                      Barbarian (Berserker) (PHB)
                    </option>
                    <option value="Barbarian Storm">
                      Barbarian (Storm Herald) (XGtE)
                    </option>
                    <option value="Barbarian Totem Bear">
                      Barbarian (Bear Totem Warrior) (PHB)
                    </option>
                    <option value="Barbarian Totem Eagle">
                      Barbarian (Eagle Totem Warrior) (PHB)
                    </option>
                    <option value="Barbarian Totem Wolf">
                      Barbarian (Wolf Totem Warrior) (PHB)
                    </option>
                    <option value="Barbarian Wild Magic">
                      Barbarian (Wild Magic) (TCoE)
                    </option>
                    <option value="Barbarian Zealot">
                      Barbarian (Zealot) (XGtE)
                    </option>
                    <option value="Barbarian">
                      Barbarian (Other Custom Subclass)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="Bard Creation">
                      Bard (College of Creation) (TCoE)
                    </option>
                    <option value="Bard Eloquence">
                      Bard (College of Eloquence) (TCoE)
                    </option>
                    <option value="Bard Glamour">
                      Bard (College of Glamour) (XGtE)
                    </option>
                    <option value="Bard Lore">
                      Bard (College of Lore) (PHB)
                    </option>
                    <option value="Bard Sword">
                      Bard (College of Swords) (XGtE)
                    </option>
                    <option value="Bard Valor">
                      Bard (College of Valor) (PHB)
                    </option>
                    <option value="Bard Whispers">
                      Bard (College of Whispers) (XGtE)
                    </option>
                    <option value="Bard">Bard (Other Custom Subclass)</option>
                    <option value="0"> -------------- </option>
                    <option value="Cleric Death">
                      Cleric (Domain of Death) (DMG)
                    </option>
                    <option value="Cleric Forge">
                      Cleric (Domain of the Forge) (XGtE)
                    </option>
                    <option value="Cleric Grave">
                      Cleric (Domain of the Grave) (XGtE)
                    </option>
                    <option value="Cleric Knowledge">
                      Cleric (Domain of Knowledge) (PHB)
                    </option>
                    <option value="Cleric Life">
                      Cleric (Domain of Life) (PHB)
                    </option>
                    <option value="Cleric Light">
                      Cleric (Domain of Light) (PHB)
                    </option>
                    <option value="Cleric Nature">
                      Cleric (Domain of Nature) (PHB)
                    </option>
                    <option value="Cleric Order">
                      Cleric (Domain of Order) (TCoE)
                    </option>
                    <option value="Cleric Peace">
                      Cleric (Domain of Peace) (TCoE)
                    </option>
                    <option value="Cleric Tempest">
                      Cleric (Domain of Tempest) (PHB)
                    </option>
                    <option value="Cleric Trickery">
                      Cleric (Domain of Trickery) (PHB)
                    </option>
                    <option value="Cleric Twilight">
                      Cleric (Domain of Twilight) (TCoE)
                    </option>
                    <option value="Cleric War">
                      Cleric (Domain of War) (PHB)
                    </option>
                    <option value="Cleric City">
                      Cleric (Dom. of the Modern City) (UA:MM)
                    </option>
                    <option value="Cleric">
                      Cleric (Other Custom Subclass)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="DruidArctic">
                      Druid (Circle of the Arctic) (PHB)
                    </option>
                    <option value="DruidCoastal">
                      Druid (Circle of the Coastal) (PHB)
                    </option>
                    <option value="DruidDesert">
                      Druid (Circle of the Desert) (PHB)
                    </option>
                    <option value="DruidDreams">
                      Druid (Circle of Dreams) (XGtE)
                    </option>
                    <option value="DruidForest">
                      Druid (Circle of the Forest) (PHB)
                    </option>
                    <option value="DruidGrassland">
                      Druid (Circle of the Grassland) (PHB)
                    </option>
                    <option value="DruidMoon">
                      Druid (Circle of the Moon) (PHB)
                    </option>
                    <option value="DruidMountain">
                      Druid (Circle of the Mountain) (PHB)
                    </option>
                    <option value="DruidShepherd">
                      Druid (Circle of the Shepherd) (XGtE)
                    </option>
                    <option value="DruidSpores">
                      Druid (Circle of Spores) (TCoE)
                    </option>
                    <option value="DruidStars">
                      Druid (Circle of Stars) (TCoE)
                    </option>
                    <option value="DruidSwamp">
                      Druid (Circle of the Swamp) (PHB)
                    </option>
                    <option value="DruidUnderdark">
                      Druid (Circle of the Underdark) (PHB)
                    </option>
                    <option value="DruidWildfire">
                      Druid (Circle of Wildfire) (TCoE)
                    </option>
                    <option value="DruidOther">
                      Druid (Other Custom Subclass)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="FighterArcaneArcher">
                      Fighter (Arcane Archer/Dex-based) (XGtE)
                    </option>
                    <option value="FighterBattleMasterDEX">
                      Fighter (Battle Master/Dex-based) (PHB)
                    </option>
                    <option value="FighterBattleMasterSTR">
                      Fighter (Battle Master/Str-based) (PHB)
                    </option>
                    <option value="FighterCavalierDEX">
                      Fighter (Cavalier/Dex-based) (XGtE)
                    </option>
                    <option value="FighterCavalierSTR">
                      Fighter (Cavalier/Str-based) (XGtE)
                    </option>
                    <option value="FighterChampionDEX">
                      Fighter (Champion/Dex-based) (PHB)
                    </option>
                    <option value="FighterChampionSTR">
                      Fighter (Champion/Str-based) (PHB)
                    </option>
                    <option value="FighterEldritchKnightDEX">
                      Fighter (Eldritch Knight/Dex-based) (PHB)
                    </option>
                    <option value="FighterEldritchKnightSTR">
                      Fighter (Eldritch Knight/Str-based) (PHB)
                    </option>
                    <option value="FighterPsiWarriorDEX">
                      Fighter (Psi Warrior/Dex-based) (TCoE)
                    </option>
                    <option value="FighterPsiWarriorSTR">
                      Fighter (Psi Warrior/Str-based) (TCoE)
                    </option>
                    <option value="FighterRuneKnight">
                      Fighter (Rune Knight/Str-based) (TCoE)
                    </option>
                    <option value="FighterSamuraiDEX">
                      Fighter (Samurai/Dex-based) (XGtE)
                    </option>
                    <option value="FighterSamuraiSTR">
                      Fighter (Samurai/Str-based) (XGtE)
                    </option>
                    <option value="FighterOtherDEX">
                      Fighter (Other Subclass, Dexterity-based)
                    </option>
                    <option value="FighterOtherSTR">
                      Fighter (Other Subclass, Strength-based)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="MonkAstralSelf">
                      Monk (Way of the Astral Self) (TCoE)
                    </option>
                    <option value="MonkDrunkenMaster">
                      Monk (Way of the Drunken Master) (XGtE)
                    </option>
                    <option value="MonkFourElements">
                      Monk (Way of the Four Elements) (PHB)
                    </option>
                    <option value="MonkKensei">
                      Monk (Way of the Kensei) (XGtE)
                    </option>
                    <option value="MonkMercy">
                      Monk (Way of Mercy) (TCoE)
                    </option>
                    <option value="MonkOpenHand">
                      Monk (Way of the Open Hand) (PHB)
                    </option>
                    <option value="MonkShadow">
                      Monk (Way of Shadow) (PHB)
                    </option>
                    <option value="MonkSunSoul">
                      Monk (Way of the Sun Soul) (XGtE)
                    </option>
                    <option value="MonkOther">
                      Monk (Other Custom Subclass)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="PaladinAncients">
                      Paladin (Oath of the Ancients) (PHB)
                    </option>
                    <option value="PaladinConquest">
                      Paladin (Oath of Conquest) (XGtE)
                    </option>
                    <option value="PaladinDevotion">
                      Paladin (Oath of Devotion) (PHB)
                    </option>
                    <option value="PaladinGlory">
                      Paladin (Oath of Glory) (TCoE)
                    </option>
                    <option value="PaladinOathbreaker">
                      Paladin (Oathbreaker, Anti-Paladin) (DMG)
                    </option>
                    <option value="PaladinRedemption">
                      Paladin (Oath of Redemption) (XGtE)
                    </option>
                    <option value="PaladinVengeance">
                      Paladin (Oath of Vengeance) (PHB)
                    </option>
                    <option value="PaladinWatchers">
                      Paladin (Oath of the Watchers) (TCoE)
                    </option>
                    <option value="PaladinOther">
                      Paladin (Other Custom Subclass)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="RangerBeastMaster">
                      Ranger (Beast Master) (PHB)
                    </option>
                    <option value="RangerFeyWanderer">
                      Ranger (Fey Wanderer) (TCoE)
                    </option>
                    <option value="RangerGloomStalker">
                      Ranger (Gloom Stalker) (XGtE)
                    </option>
                    <option value="RangerHorizonWalker">
                      Ranger (Horizon Walker) (XGtE)
                    </option>
                    <option value="RangerHunter">Ranger (Hunter) (PHB)</option>
                    <option value="RangerMonsterSlayer">
                      Ranger (Monster Slayer) (XGtE)
                    </option>
                    <option value="RangerSwarmKeeper">
                      Ranger (Swarm Keeper) (TCoE)
                    </option>
                    <option value="RangerOther">
                      Ranger (Other Custom Subclass)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="RogueArcaneTrickster">
                      Rogue (Arcane Trickster) (PHB)
                    </option>
                    <option value="RogueAssassin">
                      Rogue (Assassin) (PHB)
                    </option>
                    <option value="RogueInquisitive">
                      Rogue (Inquisitive) (XGtE)
                    </option>
                    <option value="RogueMastermind">
                      Rogue (Mastermind) (XGtE)
                    </option>
                    <option value="RoguePhantom">Rogue (Phantom) (TCoE)</option>
                    <option value="RogueScout">Rogue (Scout) (XGtE)</option>
                    <option value="RogueSoulknife">
                      Rogue (Soulknife) (TCoE)
                    </option>
                    <option value="RogueSwashbuckler">
                      Rogue (Swashbuckler) (XGtE)
                    </option>
                    <option value="RogueThief">Rogue (Thief) (PHB)</option>
                    <option value="RogueOther">
                      Rogue (Other Custom Subclass)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="SorcererAberrantMind">
                      Sorcerer (Aberrant Mind) (TCoE)
                    </option>
                    <option value="SorcererClockworkSoul">
                      Sorcerer (Clockwork Soul) (TCoE)
                    </option>
                    <option value="SorcererDivineSoul">
                      Sorcerer (Divine Soul) (XGtE)
                    </option>
                    <option value="SorcererDraconic">
                      Sorcerer (Draconic Bloodline) (PHB)
                    </option>
                    <option value="SorcererShadowMagic">
                      Sorcerer (Shadow Magic) (XGtE)
                    </option>
                    <option value="SorcererStormSorcery">
                      Sorcerer (Storm Sorcery) (XGtE)
                    </option>
                    <option value="SorcererWildMagic">
                      Sorcerer (Wild Magic) (PHB)
                    </option>
                    <option value="SorcererOther">
                      Sorcerer (Other Custom Subclass)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="WarlockArchfey">
                      Warlock (The Archfey) (PHB)
                    </option>
                    <option value="WarlockCelestial">
                      Warlock (The Celestial) (XGtE)
                    </option>
                    <option value="WarlockFathomless">
                      Warlock (The Fathomless) (TCoE)
                    </option>
                    <option value="WarlockFiend">
                      Warlock (The Fiend) (PHB)
                    </option>
                    <option value="WarlockGenieAir">
                      Warlock (Genie/Air Djinni) (TCoE)
                    </option>
                    <option value="WarlockGenieEarth">
                      Warlock (Genie/Earth Dao) (TCoE)
                    </option>
                    <option value="WarlockGenieFire">
                      Warlock (Genie/Fire Efreeti) (TCoE)
                    </option>
                    <option value="WarlockGenieWater">
                      Warlock (Genie/Water Marid) (TCoE)
                    </option>
                    <option value="WarlockGreatOldOne">
                      Warlock (Great Old One) (PHB)
                    </option>
                    <option value="WarlockHexblade">
                      Warlock (Hexblade) (XGtE)
                    </option>
                    <option value="WarlockGhostInTheMachine">
                      Warlock (Ghost In The Machine) (UA:MM)
                    </option>
                    <option value="WarlockOther">
                      Warlock (Other Custom Subclass)
                    </option>
                    <option value="0"> -------------- </option>
                    <option value="WizardAbjuration">
                      Wizard (Abjuration Tradition) (PHB)
                    </option>
                    <option value="WizardBladesinging">
                      Wizard (Bladesinging) (TCoE)
                    </option>
                    <option value="WizardConjuration">
                      Wizard (Conjuration Tradition) (PHB)
                    </option>
                    <option value="WizardDivination">
                      Wizard (Divination Tradition) (PHB)
                    </option>
                    <option value="WizardEnchantment">
                      Wizard (Enchantment Tradition) (PHB)
                    </option>
                    <option value="WizardEvocation">
                      Wizard (Evocation Tradition) (PHB)
                    </option>
                    <option value="WizardIllusion">
                      Wizard (Illusion Tradition) (PHB)
                    </option>
                    <option value="WizardNecromancy">
                      Wizard (Necromancy Tradition) (PHB)
                    </option>
                    <option value="WizardScribes">
                      Wizard (Order of Scribes) (TCoE)
                    </option>
                    <option value="WizardTransmutation">
                      Wizard (Transmutation Tradition) (PHB)
                    </option>
                    <option value="WizardWarMage">
                      Wizard (War Mage) (XGtE)
                    </option>
                    <option value="WizardWarMageSummoner">
                      Wizard (War Mage/Summoner) (XGtE)
                    </option>
                    <option value="WizardTechnomancer">
                      Wizard (Technomancer) (UA:MM)
                    </option>
                    <option value="WizardOther">
                      Wizard (Other Custom Subclass)
                    </option>
                  </select>
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
                  <select
                    id="backgroundInput"
                    placeholder="Background"
                    className="bg-transparent resize-none h-6 w-[200px]"
                    onChange={handleBackgroundSelect}
                  >
                    <option value="0" selected>
                      Select Background...
                    </option>
                    <option value="Acolyte">Acolyte (PHB)</option>
                    <option value="Charlatan">Charlatan (PHB)</option>
                    <option value="Criminal">Criminal (PHB)</option>
                    <option value="Entertainer">Entertainer (PHB)</option>
                    <option value="Fartraveller">Fartraveller</option>
                    <option value="FolkHero">Folk Hero (PHB)</option>
                    <option value="Gladiator">Gladiator (PHB)</option>
                    <option value="Guild Artisan">Guild Artisan (PHB)</option>
                    <option value="Guild Merchant">Guild Merchant (PHB)</option>
                    <option value="Hermit">Hermit (PHB)</option>
                    <option value="Knight">Knight (PHB)</option>
                    <option value="Noble">Noble (PHB)</option>
                    <option value="Outlander">Outlander (PHB)</option>
                    <option value="Pirate">Pirate (PHB)</option>
                    <option value="Sage">Sage (PHB)</option>
                    <option value="Sailor">Sailor (PHB)</option>
                    <option value="Soldier">Soldier (PHB)</option>
                    <option value="Spy">Spy (PHB)</option>
                    <option value="Urchin">Urchin (PHB)</option>
                  </select>
                </div>
                <div className="flex items-center mx-[48px] mt-2 mb-4">
                  <input
                    id="alignmentCheck"
                    type="checkbox"
                    className="checkbox-stats"
                    onChange={handleAlignmentSelect}
                  ></input>
                  <p className="mx-4">ALIGNMENT: </p>
                  <select
                    id="alignmentInput"
                    placeholder="Neutral Good"
                    className="bg-transparent resize-none h-6 w-[200px]"
                    onChange={handleAlignmentSelect}
                  >
                    <option value="0" selected>
                      Select Alignment...
                    </option>
                    <option value="Lawful Good">Lawful Good</option>
                    <option value="Neutral Good">Neutral Good</option>
                    <option value="Chaotic Good">Chaotic Good</option>
                    <option value="Lawful Neutral">Lawful Neutral</option>
                    <option value="True Neutral">True Neutral</option>
                    <option value="Chaotic Neutral">Chaotic Neutral</option>
                    <option value="Lawful Evil">Lawful Evil</option>
                    <option value="Neutral Evil">Neutral Evil</option>
                    <option value="Chaotic Evil">Chaotic Evil</option>
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
