import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataFile from "./DataFile";
import Loader from "../component/Loader";

const Main = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [convertjsonData, setConvertJsonData] = useState([]);
  const [convertedFileUrl, setConvertedFileUrl] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type === "text/csv") {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            toast.success("File uploaded successfully");
            setJsonData(result.data);
            setUploadFile(file);
          },
          error: (error) => {
            console.error("Error parsing CSV file:", error);
          }
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
          toast.success("File uploaded successfully");
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

  const handleFileConvert = () => {
    if (!uploadFile) return;
    setisLoading(true);

    const url = "https://csv-convertor.onrender.com/convert/";
    const formdata = new FormData();
    formdata.append("input", uploadFile, uploadFile.name);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.file_url) {
          setConvertedFileUrl(result.file_url);
          toast.success("File converted successfully");
        }
      })
      .catch((error) => {
        console.log("API error:", error);
        toast.error("Oops! Something went wrong.");
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    if (convertedFileUrl) {
      fetch(convertedFileUrl)
        .then((response) => response.text())
        .then((csvData) => {
          Papa.parse(csvData, {
            header: true,
            complete: (result) => {
              setConvertJsonData(result.data);
            },
            error: (error) => {
              console.error("Error parsing converted file:", error);
            }
          });
        })
        .catch((error) =>
          console.error("Error fetching converted file:", error)
        );
    }
  }, [convertedFileUrl]);
  return (
    <div className="main-container">
      <div className="header">
        <div className="upload-box">
          <button
            className="button"
            onClick={handleUploadClick}
            disabled={uploadFile}
          >
            Upload File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".csv, .xlsx"
            onChange={handleFileUpload}
          />
        </div>
        <div className="upload-box">
          <button
            className="button convert"
            disabled={uploadFile ? false : true}
            onClick={handleFileConvert}
          >
            {isLoading ? "Converting..." : "Convert File"}
          </button>
        </div>
      </div>
      {isLoading && <Loader />}
      <DataFile
        uploadTabledata={jsonData}
        convertedTableData={convertjsonData}
        filename={uploadFile?.name}
      />
    </div>
  );
};

export default Main;
