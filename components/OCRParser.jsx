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
}) {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(false);

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
    const body = new FormData();
    body.set('file', image);
    try {
      console.log('made call here');
      const res = await fetch('http://efdd-34-142-247-67.ngrok.io/ocr', {
        method: 'POST',
        body: body,
      });
      // console.log("raw res parse dpf: ", res);
      const data = await res.json();
      const object = JSON.parse(data);
      if (data.error) {
        setError(data.error);
        return;
      }
      setPdfData((prevPdfData) => Object.assign({}, prevPdfData, object));
    } catch (error) {
      console.log('error: ', error);
      setError(error);
    }
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
    <div className={` ${oswald.className} relative h-64 w-72 grid ${!image}`}>
      <Image
        src='/images/CREATE-hero/Vector2.png'
        alt='background image'
        className='mt-6 h-96 w-68 bg-contain bg-no-repeat cursor-pointer'
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

      <div className='absolute inset-x-0 top-12 left-20 text-4xl cursor-pointer'>
        <p onClick={() => document.getElementById('dropzone-file').click()}>
          <strong>FEED A</strong>
        </p>
      </div>
    </div>
  );
}
