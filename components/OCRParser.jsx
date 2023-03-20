import React, { useState, useEffect } from "react";
import Vector2 from "../public/images/CREATE-hero/Vector2.png";
import Image from "next/image";
import { Oswald } from "@next/font/google";

const oswald = Oswald({ weight: "700", subsets: ["latin"] });

export default function IMAGEParser({
  setImageData,
  imageData,
  setError,
  setPdfData,
  pdfData,
}) {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(false);

  const handleIMAGEChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setError("Invalid file type. Only JPEG, JPG, and PNG files are allowed.");
      return;
    }
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) return;
    const body = new FormData();
    body.set("file", image);
    try {
      console.log("made call here");
      const res = await fetch("http://a17d-35-239-13-171.ngrok.io/ocr", {
        method: "POST",
        body: body,
      });
      // console.log("raw res parse dpf: ", res);
      const data = await res.json();
      console.log("data: ", data);
      if (data.error) {
        setError(data.error);
        return;
      }
      console.log(data.background);
      setPdfData({ ...pdfData, background: data.background });
      console.log("pdfData: ", pdfData);
    } catch (error) {
      console.log("error: ", error);
      setError(error);
    }
  };

  useEffect(() => {
    if (image) {
      // setError(null);
      handleUpload();
    }
  }, [image, setError, handleUpload]);

  return (
    <div className={` ${oswald.className} relative h-64 w-72 grid ${!image}`}>
      <Image
        src="/images/CREATE-hero/Vector2.png"
        alt="background image"
        className="mt-6 h-96 w-68 bg-contain bg-no-repeat cursor-pointer"
        height={400}
        width={400}
        onClick={() => document.getElementById("dropzone-file").click()}
      />

      <input
        onChange={handleIMAGEChange}
        id="dropzone-file"
        type="file"
        className="hidden"
      />

      <div className="absolute inset-x-0 top-12 left-20 text-4xl cursor-pointer">
        <p onClick={() => document.getElementById("dropzone-file").click()}>
          <strong>FEED A</strong>
        </p>
      </div>
    </div>
  );
}
