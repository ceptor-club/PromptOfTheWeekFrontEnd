import React from "react";
import { useState, useEffect } from "react";

const tips = [
  "Never bring a knife to a fireball fight",
  "Be careful who you push off rooftops",
  "Eating the mushrooms was a good idea",
  "Eating the cheese was a bad idea",
  "Gold is kinda heavy",
];

export const LoadingTips = () => {
  //choose random tip and set it to state
  const [tip, setTip] = useState(tips[Math.floor(Math.random() * tips.length)]);

  //in useeffect, set interval to change tip every 5 seconds
  //clear interval on unmount
  useEffect(() => {
    const interval = setInterval(() => {
      setTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* <h3>Tip</h3> */}
      <p>{tip}</p>
    </div>
  );
};
