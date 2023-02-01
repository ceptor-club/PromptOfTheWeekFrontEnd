import React, { useState, useEffect } from "react";

export default function PDFParser({ setPdfData, pdfData, setError }) {
  const [pdf, setPdf] = useState(null);

  const handlePDFChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setPdf(file);
  };

  const handleUpload = async () => {
    if (!pdf) return;
    const body = new FormData();
    body.set("file", pdf);
    try {
      const res = await fetch("/api/PDFParser", {
        method: "POST",
        body: body,
      });
      // console.log("raw res parse dpf: ", res);
      const data = await res.json();
      // console.log("data: ", data);
      if (data.error) {
        setError(data.error);
        return;
      }
      setPdfData(data);
    } catch (error) {
      console.log("error: ", error);
      setError(error);
    }
  };

  useEffect(() => {
    if (pdf) {
      setError(null);
      handleUpload();
    }
  }, [pdf]);

  return (
    <div className={`flex items-center justify-center w-full ${!pdf && "animate-pulse"}`}>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Standard DnD Character sheet</p>
        </div>
        <input onChange={handlePDFChange} id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
}
