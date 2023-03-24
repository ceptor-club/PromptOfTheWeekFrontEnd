import React, { useState, useEffect, useCallback } from 'react';
import Vector2 from '../public/images/CREATE-hero/Vector2.png';
import Image from 'next/image';
import { Oswald } from '@next/font/google';

const oswald = Oswald({ weight: '700', subsets: ['latin'] });

export default function IMAGEParser({
  setImageData,
  imageData,
  setError,
  setPdfData,
  pdfData,
  imageProcessing,
  setImageProcessing,
}) {
  const [image, setImage] = useState(null);

  const handleIMAGEChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setError('Invalid file type. Only JPEG, JPG, and PNG files are allowed.');
      return;
    }
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) return;
    setImageProcessing(true);
    const body = new FormData();
    body.set('file', image);
    setImage;
    try {
      console.log('made call here');
      const res = await fetch('http://06a3-35-247-12-188.ngrok.io/ocr', {
        method: 'POST',
        body: body,
      });
      // console.log("raw res parse dpf: ", res);
      const data = await res.json();
      const object = JSON.parse(data);
      console.log('DATA OBJECT', object);
      if (data.error) {
        setError(data.error);
        return;
      }
      object.feature = '';
      setPdfData((prevPdfData) => Object.assign({}, prevPdfData, object));
    } catch (error) {
      console.log('error: ', error);
      setError(error);
      console.log('state error: ', error);
    }
    setImageProcessing(false);
  };

  // Could add a useCallback to this so I don't console.log a non updated pdfData
  useEffect(() => {
    if (image) {
      // setError(null);
      handleUpload();
      console.log('pdfData set from OCRParser: ', pdfData);
    }
  }, [image, setError, pdfData]);

  return (
    <div
      className={` ${
        oswald.className
      } relative h-64 w-72 grid ${!image} flex items-center justify-center`}
    >
      <Image
        src='/images/CREATE-hero/Vector2.png'
        alt='background image'
        className='h-full w-full object-contain cursor-pointer'
        height={400}
        width={400}
        onClick={() => document.getElementById('dropzone-file').click()}
      />

      <input
        onChange={handleIMAGEChange}
        id='dropzone-file'
        type='file'
        className='hidden'
      />

      <div className='absolute my-auto px-6 text-2xl text-center cursor-pointer'>
        <p onClick={() => document.getElementById('dropzone-file').click()}>
          <strong>UPLOAD A FAST CHARACTER SHEET AS AN IMAGE</strong>
        </p>
      </div>
    </div>
  );
}
