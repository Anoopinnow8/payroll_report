import React, { useState, useRef } from "react";
import Papa from "papaparse";
import Table from "../component/Table";
import preview from "../assets/image/eye.png";
import fileimage from "../assets/image/document.png";

const Main = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [showUploadFile, SetShowUploadFile] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file &&( file.type === "text/csv" ||  file.type === "text/xlsx")) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          setJsonData(result.data);
          setUploadFile(file);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    } else {
      alert("Please upload a CSV file.");
    }
  };

  const handleShowPreview = () => {
    SetShowUploadFile(true);
  };

  const handleFileUpload = () => {
    if (!jsonData) return;

    const dummyUrl = "https://jsonplaceholder.typicode.com/posts";

 
    const payload = {
      data: uploadFile,
    };

    fetch(dummyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
       
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
      });
  };

  console.log(jsonData, "jsonData");

  return (
    <div className="main-container">
      <div className="header">
        <div className="upload-box">
          <button
            className="button"
            onClick={handleUploadClick}
            disabled={uploadFile}
          >
            Upload CSV
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".csv"
            onChange={handleFileChange}
          />
          {uploadFile && (
            <>
              <div className="upload-data">
                <span className="file-name"> { <img src={fileimage} alt="fileicon" />}{uploadFile.name}</span>
                <img
                  src={preview}
                  alt="preview"
                  className="preview"
                  onClick={handleShowPreview}
                />
              </div>
            </>
          )}
        </div>

        <button
          className="button convert"
          disabled={!jsonData}
          onClick={handleFileUpload}
        >
          Convert
        </button>
      </div>
      {showUploadFile && jsonData && <Table data={jsonData} name={uploadFile.name} />}
    </div>
  );
};

export default Main;
