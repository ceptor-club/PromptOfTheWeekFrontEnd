const styleOf = "Medieval war hero portrait";
const descriptives = "fantasy illustration, unreal 5 render, 8k";

//TODO: dont use positive negative, use -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 MAYBE

const conversions = {
  // these are distractions to our sprint goal of getting a dragonborn to work, but they are good to have for the future
  // it's also a little confusing how these are used, so we should probably clean this up
  cha: { positive: "charismatic", negative: "poorly spoken" },
  con: { positive: "healthy", negative: "sickly" },
  dex: { positive: "nimble", negative: "clumsy" },
  int: { positive: "intelligent", negative: "stupid looking" },
  str: { positive: "strong", negative: "weak" },
  wis: { positive: "wise", negative: "foolish" },

  //classes
  cleric: "cleric",
  druid: "druid",
  bard: "bard",
  warlock: "warlock",
  paladin: "paladin",
  artificer: "engineer and tinkerer",
  ranger: "archer",
  rogue: "rogue",

  //races
  // Non-Dragonborn Solution 1.  -- Front end displays warning if not dragonborn
  // dragonborn: "dragon-person",
  // dwarf: "dwarf",
  // elf: "elf",
  // gnome: "gnome",
  // human: "human",
  // halfling: "thing that's half a human",
  // halfelf: "half-elf half-human, long ears",
  // halforc: "half-orc half-human, big teeth",
  // tiefling: "horned forest demon",
  // "wood elf": "wood elf",
  // aarakocra: "humanoid bird",

  // Dragonborn Solution 1.
  dragonborn: "DnDDragonborn dragonborn",
  dwarf: "DnDDragonborn dragonborn",
  elf: "DnDDragonborn dragonborn",
  gnome: "DnDDragonborn dragonborn",
  human: "DnDDragonborn dragonborn",
  halfling: "DnDDragonborn dragonborn",
  halfelf: "DnDDragonborn dragonborn",
  halforc: "DnDDragonborn dragonborn",
  tiefling: "DnDDragonborn dragonborn",
  "wood elf": "DnDDragonborn dragonborn",
  aarakocra: "DnDDragonborn dragonborn",

  //backgrounds used to put the character in a scene
  entertainer: "performing a song in a tavern",
  hermit: "meditating in a cave",
  criminal: "stealing from a shop",
  noble: "dressed in finery, in a fancy noble's castle",
  soldier: "in a battle",
  sage: "in a fantastic library or classroom",
  acolyte: "in a church",
  charlatan: "in a tavern, telling a tall tale",
  folkhero: "rescuing a cat from a tree",
  guildartisan: "in a workshop",
  outlander: "in a forest",
  urchin: "in an alleyway",
  pirate: "on a ship",
  //armorWorn
};

export default conversions;

const createPrompt = (data) => {
  //IDEA: could pull synonyms from a thesaurous api and use those to create more interesting prompts
  //IDEA2: could connect to chatGPT3 and use that to create more interesting prompts

  const adjectives = []; //stats adjs - why is this a bad way of doing this bit?

  Object.keys(data).forEach((key) => {
    //handle stats
    if (data[key][0] > 3) {
      console.log("pos", key, data[key]);
      adjectives.push(conversions[key].positive);
    } else if (data[key][0] < 0) {
      console.log("neg", key, data[key]);
      adjectives.push(conversions[key].negative);
    }
  });
  console.log("adjectives: ", adjectives);
  // returns a prompt with:
  // alignment, race (converted to prompt language or our unique identifier such as DnDDragonborn),
  // class, armorWorn, background & scene, "holding a dragons egg", descriptives
  return `${styleOf} of ${data.alignment} ${data.feature} ${data.gender ? data.gender : ""} ${conversions[data.race.toLowerCase()] ?
    conversions[data.race.toLowerCase()]
    : data.race
    }, ${conversions[data.class.toLowerCase()] ? conversions[data.class.toLowerCase()]
      : data.class}, wearing ${conversions[data.armorWorn.toLowerCase()] ? conversions[data.armorWorn.toLowerCase()]
        : data.armorWorn} and holding a small dragon egg, ${conversions[data.background.toLowerCase()]
          ? conversions[data.background.toLowerCase()]
          : data.background // or "in a cavern" or "in a mine"
    }, ${descriptives}.`;

  // Non-Dragonborn Solution 1.
  // return `${ styleOf } of(${ data.alignment }) ${ data.race } ${
  //   conversions[data.race.toLowerCase()]
  // }, ${conversions[data.class.toLowerCase()]}, wearing ${
  //   data.armorWorn
  // } and holding a small dragon, ${
  //   conversions[data.background.toLowerCase()]
  // }, ${descriptives}, in the style of ${styleOf}`;
};

module.exports = { createPrompt };