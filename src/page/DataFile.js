import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "../component/Table";
import download from "../assets/image/download.png";
import Employee from "./employee/Index";
import { debounce } from "../utils/Common";
import { convertedFileByID, getlatest } from "../api/Function";
import Papa from "papaparse";
import { DownLoad } from "../assets/image";

const DataFile = ({
  uploadTabledata = [],
  convertedTableData = [],
  filename = "",
  onDownload = () => {},
  isFileConvert,
  lastFileConverted,
  currentTab,
  onTabSwitch = () => {},
}) => {
  const [uploadsearchQuery, setUploadSearchQuery] = useState("");
  const [previousConvertedData, setPrevConvertedData] = useState([]);
  const [previousConvertedUrl, setPrevConvertedUrl] = useState("");

  const [activeTab, setActiveTab] = useState(currentTab || "1");

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    onTabSwitch(newTab); // Callback for parent
  };

  const debouncedSearch = debounce((query) => {}, 2000);
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setUploadSearchQuery(query);
    debouncedSearch(query);
  };

  const filteredData = uploadTabledata.filter((row) => {
    return Object.values(row).some(
      (value) => value !== null && value !== undefined && value !== ""
    );
  });

  const filterDataArray = (filteredData) => {
    let result = [];
    for (let i = 0; i < filteredData.length; i++) {
      const arrEle = filteredData[i];
      let arr = [];
      for (let j = 0; j < arrEle.length; j++) {
        const e = arrEle[j];
        if (j === 1 && e == null) {
          arr.push(arrEle[0]);
          continue;
        }
        arr.push(e);
      }
      result.push(arr);
    }
    return result;
  };

  const uploadArray = filterDataArray(filteredData);

  const convertedfilteredData = convertedTableData.filter((row) => {
    return Object.values(row).some(
      (value) => value !== null && value !== undefined && value !== ""
    );
  });

  const getLatestConvertedFile = async () => {
    try {
      const res = await getlatest();
      if (res.status === 200) {
        setPrevConvertedUrl(res.data.output_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (previousConvertedData) {
      fetch(previousConvertedUrl)
        .then((response) => response.text())
        .then((csvData) => {
          Papa.parse(csvData, {
            header: true,
            complete: (result) => {
              setPrevConvertedData(result.data);
            },
            error: (error) => {
              console.error("Error parsing converted file:", error);
            },
          });
        })
        .catch((error) => console.log("Error fetching converted file:", error));
    }
  }, [previousConvertedUrl]);

  useEffect(() => {
    getLatestConvertedFile();
  }, []);

  return (
    <div className="home-container">
      <div className="home-action-wrapper" >
        <div className="action-tabs"> 
        <div
          onClick={() => handleTabChange("1")}
          className={`tab ${activeTab === "1" ?"active":""}`}
        >
          Labor Payroll Report
        </div>
        <div
          onClick={() => handleTabChange("2")}
          className={`tab ${activeTab === "2" ?"active":""}`}
        >
          Converted Labor Payroll Report
        </div>
        <div
          onClick={() => handleTabChange("3")}
          className={`tab ${activeTab === "3" ?"active":""}`}
        >
          Employee
        </div>
        </div>
   { isFileConvert &&   <button className="download" onClick={onDownload}><img src={DownLoad} alt="download"/> Download </button>}
      </div>
      <div className="data-container" >
        {activeTab === "1" && (
          <Table
            tableColoum={filteredData}
            isUploadTable={true}
            dataToRender={uploadArray.slice(1)}
            searchQuery={uploadsearchQuery}
            handleSearchInput={handleSearchInputChange}
          />
        )}
        {activeTab === "2" && (
          <Table
            tableColoum={convertedfilteredData}
            dataToRender={convertedfilteredData}
            onDownload={onDownload}
            showDownload={isFileConvert}
            lastFileConverted={lastFileConverted}
          />
        )}
        {activeTab === "3" && (
          <Employee
            tableColoum={convertedfilteredData}
            dataToRender={convertedfilteredData}
          />
        )}
      </div>
    </div>
  );
};

export default DataFile;
