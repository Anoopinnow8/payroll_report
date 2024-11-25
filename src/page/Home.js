import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import DataFile from "./DataFile";
import Loader from "../component/Loader";
import { handleFileConvert } from "../api/FileApi";
import { useNavigate } from "react-router";
import { saveAs } from "file-saver";
import Navbar from "../component/Navbar";
import { getIntiate } from "../api/Function";

const Home = () => {
  const navigate = useNavigate();

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
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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
  const onFileConvert = () => {
    handleFileConvert(uploadFile, setConvertedFileUrl, setisLoading);
  };
  const handleConvertFileDownload = () => {
    fetch(convertedFileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const filename = convertedFileUrl.split("/").pop();
        saveAs(blob, filename);
      })
      .catch((error) => console.error("Error downloading the file:", error));
  };
  const getID = async () => {
    try {
      const res = await getIntiate ();
      if (res?.status===200) {
        localStorage.setItem("ID",res?.data?.id)
      }
    }
    catch (error){
      console.log("error",error);
    }
 }
  useEffect(() => {
    getID();
},[])
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
        .catch((error) => console.log("Error fetching converted file:", error));
    }
  }, [convertedFileUrl]);
  return (
    <div className="main-container">
      <Navbar
        onUploadClick={handleUploadClick}
        uploadDisable={uploadFile}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
        onConvertClick={onFileConvert}
        convertDisable={uploadFile ? false : true}
        onLogout={handleLogout}
      />

      <DataFile
        uploadTabledata={jsonData}
        convertedTableData={convertjsonData}
        filename={uploadFile?.name}
        onDownload={handleConvertFileDownload}
        isFileConvert={convertedFileUrl}
      />
      {isLoading && <Loader />}
    </div>
  );
};

export default Home;
