import React, { useState, useRef } from "react";
import Papa from "papaparse";
import Table from "../component/Table";
import preview from "../assets/image/eye.png";
import fileimage from "../assets/image/document.png";
import deleteicon from "../assets/image/delete.png"
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Main = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };



const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          toast.success('file upload successfully')
          setJsonData(result.data);
          setUploadFile(file);
         
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.endsWith(".xlsx")
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        
        setJsonData(jsonData);
        setUploadFile(file);
        toast.success('file upload successfully')
      };
      reader.onerror = (error) => {
        console.error("Error reading XLSX file:", error);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a CSV or XLSX file.");
    }
  }
};


  const handleShowPreview = () => {
    setShowUploadFile(true);
  };
  const handleRemoveUploaded = () => {
    setUploadFile(null);
    setJsonData(null);
    setShowUploadFile(false)
  };

  const handleFileConvert = () => {
    if (!uploadFile) return;
  
    const url = "https://csv-convertor.onrender.com/convert/";
  
   
    const formdata = new FormData();
   
    formdata.append("input", uploadFile, uploadFile.name);
  
    
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };
  
    console.log(requestOptions,"requestOptions");
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        toast.success('file convert successfully')
      })
      .catch(error => {
        console.log(error,"api error");
        toast.error('oops!! something went wrong ')
      });
  };
  


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
                 <img
                  src={deleteicon}
                  alt="deleteicon"
                  className="deleteicon"
                  onClick={handleRemoveUploaded}
                />
              </div>
            </>
          )}
        </div>

        <button
          className="button convert"
          disabled={!jsonData}
          onClick={handleFileConvert}
        >
          Convert
        </button>
      </div>
     {showUploadFile&& <span className="filename">  Preview</span>}
      {showUploadFile && jsonData && <Table data={jsonData} name={uploadFile.name} />}
    </div>
  );
};

export default Main;
