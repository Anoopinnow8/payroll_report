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
import {
  AutomateConvertedFileByID,
  getIntiate,
  getlatest
} from "../api/Function";
import { convertCsvToJson } from "../utils/ConvertJson";
import triggerApiRequest from "../api/AutomateApi";
const Home = () => {
  const navigate = useNavigate();
  const [curTab, setCurTab] = useState("1");
  const [uploadFile, setUploadFile] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [latestUploadFileUrl, setLatestUploadFileUrl] = useState("");
  const [lastUploadData, setLastUploadData] = useState([]);
  const [convertjsonData, setConvertJsonData] = useState([]);
  const [convertedFileUrl, setConvertedFileUrl] = useState("");
  const [autoMatedFileUrl, setAutoMatedFileUrl] = useState("");
  const [latestConvertedFileUrl, setLatestConvertedFileUrl] = useState("");

  const [lastConverted, setLastConverted] = useState("");
  const [lastAutoConverted, setLastAutoConverted] = useState("");
  const [latestConvertedTime, setLatestConvertedTime] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [isAutomatate, setIsAutomate] = useState(false);
  const [isAutomatedApiCalled, setIsAutomatedApiCalled] = useState(false);
  const [showCalendar, setshowCalandar] = useState(false);
  const [automatedDateRange, setAutomateDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ]);
  const fileInputRef = useRef(null);
  const handleTabChange = (newValue) => {
    setCurTab(newValue);
  };
  const handleShowCalandar = () => {
    setshowCalandar((prev) => !prev);
  };
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
    handleFileConvert(
      uploadFile,
      setConvertedFileUrl,
      setisLoading,
      setLastConverted,
      setCurTab
    );
  };
  const handleLastConvertedTime = (data) => {
    if (data) {
      const dateObj = new Date(data);

      const IST_OFFSET = 5.5 * 60 * 60 * 1000;
      const istDateObj = new Date(dateObj.getTime() + IST_OFFSET);

      const day = istDateObj.getDate().toString().padStart(2, "0");
      const month = (istDateObj.getMonth() + 1).toString().padStart(2, "0");
      const year = istDateObj.getFullYear();

      let hours = istDateObj.getHours();
      const minutes = istDateObj.getMinutes().toString().padStart(2, "0");
      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      const formattedDate = `${day}-${month}-${year}`;
      const formattedTime = `${hours}:${minutes} ${amPm}`;

      return `${formattedTime} , ${formattedDate}`;
    } else {
      return " ";
    }
  };
  const handleConvertFileDownload = () => {
    fetch(latestConvertedFileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const filename = latestConvertedFileUrl?.split("/").pop();
        saveAs(blob, filename);
      })
      .catch((error) => console.error("Error downloading the file:", error));
  };
  const getID = async () => {
    try {
      const res = await getIntiate();
      if (res?.status === 200) {
        const id = res?.data?.id;
        localStorage.setItem("ID", id);
        return id;
      } else {
        console.error("getIntiate did not return a valid response.");
        return null;
      }
    } catch (error) {
      console.error("Error in getID:", error);
      return null;
    }
  };
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  const handleAutomate = async () => {
    setshowCalandar(false);
    setIsAutomate(true);
    try {
      const id = await getID();
      if (!id) {
        toast.error("Failed to generate ID. ");
        return;
      }
      const data = {
        id: id || localStorage.getItem("ID"),
        startDate: formatDate(automatedDateRange[0]?.startDate),
        endDate: formatDate(automatedDateRange[0]?.endDate)
      };

      const result = await triggerApiRequest(data);

      if (result.status === 202) {
        setIsAutomatedApiCalled(true);
        startFetchInterval();
        setIsAutomate(true);
      }
    } catch (error) {
      console.log(error, "Automate Error");
      setIsAutomate(false);
    }
  };

  const handleFetchAutomatedFile = async () => {
    const id = localStorage.getItem("ID");

    try {
      const result = await AutomateConvertedFileByID(id);
      if (result.status === 200) {
        if (result.data.status === "Initiated") {
          setLastAutoConverted(result?.data?.created_at);
        }

        if (result.data.status === "Converted") {
          setAutoMatedFileUrl(result?.data?.output_url);
          setLastAutoConverted(result?.data?.created_at);
          setIsAutomate(false);
          setCurTab("2");
          toast.success("Automation is complete");
          return "stop";
        }
        if (result.data.status === "Failed") {
          setIsAutomate(false);

          toast.error("Something went wrong");
          return "stop";
        }
      }
    } catch (error) {
      console.error("Error fetching automated file:", error);
      return false;
    }
  };

  const startFetchInterval = async () => {
    let isFetched;
    isFetched = await handleFetchAutomatedFile();

    const id = setInterval(async () => {
      let isFetched = await handleFetchAutomatedFile();
      isFetched === "stop" && clearInterval(id);
    }, 20000);

    if (isFetched === "stop") {
      clearInterval(id);
    }
  };
  const getLatestConvertedFile = async () => {
    setisLoading(true);
    try {
      const res = await getlatest();
      if (res.status === 200) {
        setLatestConvertedFileUrl(res?.data?.latest?.output_url);
        setLatestUploadFileUrl(res?.data?.latest?.input_url);
        setLatestConvertedTime(res?.data?.latest?.created_at);
        if (res?.data?.pending !== null) {
          setIsAutomate(true);
          setLastAutoConverted(res?.data?.pending?.created_at);
          localStorage.setItem("ID", res?.data?.pending?.id);
          startFetchInterval();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  const handleCsvTojsonConvert = async (url) => {
    try {
      if (url) {
        const res = await convertCsvToJson(url);
        setConvertJsonData(res);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (latestConvertedFileUrl) {
      handleCsvTojsonConvert(latestConvertedFileUrl);
    } else if (autoMatedFileUrl) {
      handleCsvTojsonConvert(autoMatedFileUrl);
    } else if (convertedFileUrl) {
      handleCsvTojsonConvert(convertedFileUrl);
    }
  }, [latestConvertedFileUrl, autoMatedFileUrl, convertedFileUrl]);
  useEffect(() => {
    getLatestConvertedFile();
  }, [autoMatedFileUrl, convertedFileUrl]);

  const handleUploadCsvTojsonConvert = async (url) => {
    setisLoading(true);
    try {
      if (url) {
        const res = await convertCsvToJson(url);
        const arrayOfArrays = res?.map((obj) => Object.values(obj));
        setLastUploadData(arrayOfArrays);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    handleUploadCsvTojsonConvert(latestUploadFileUrl);
  }, [latestUploadFileUrl]);
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
        onAutomate={handleAutomate}
        isAutomatate={isAutomatate}
        lastAutofetchTime={handleLastConvertedTime(lastAutoConverted)}
        onDateSelect={setAutomateDateRange}
        onShowCalandar={handleShowCalandar}
        dateRange={automatedDateRange}
        showCalendar={showCalendar}
        startDate={formatDate(automatedDateRange[0].startDate)}
        endDate={formatDate(automatedDateRange[0].endDate)}
        lastFileConverted={handleLastConvertedTime(
          latestConvertedTime
            ? latestConvertedTime
            : lastAutoConverted
            ? lastAutoConverted
            : lastConverted
        )}
      />

      <DataFile
        activeTab={curTab}
        onTabSwitch={handleTabChange}
        uploadTabledata={
          jsonData.length !== 0
            ? jsonData
            : lastUploadData.length !== 0
            ? lastUploadData
            : []
        }
        convertedTableData={convertjsonData}
        onDownload={handleConvertFileDownload}
        isFileConvert={latestConvertedFileUrl}
        lastFileConverted={handleLastConvertedTime(
          latestConvertedTime
            ? latestConvertedTime
            : lastAutoConverted
            ? lastAutoConverted
            : lastConverted
        )}
      />
      {isLoading && <Loader />}
    </div>
  );
};

export default Home;
