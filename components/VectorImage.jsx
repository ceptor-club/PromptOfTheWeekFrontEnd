import React from 'react';
import Vector2 from "../public/images/CREATE-hero/Vector2.png";
import Image from 'next/image';


const VectorImage = () => {
  return (
    <div>
      <Image src={Vector2} alt="Vector" className="Vector-image" />
      <div className="relative bottom-60 left-8 mx-auto text-4xl">
        <p><strong>Build</strong> character, </p>
      </div>
      <div className="relative bottom-56 left-8 mx-auto text-4xl">
        <p><strong>SAVE THE WORLD</strong></p>
      </div>
      <div className="relative bottom-52 left-10 mx-auto text-xl">
        <p>Generate character art for your</p>
      </div>
      <div className="relative bottom-52 left-16 mx-aut text-xl w-64">
        <p>tabletop game in seconds</p>
      </div>
    </div>
  );
}

export default VectorImage;
