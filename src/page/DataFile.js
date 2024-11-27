import React, { useState } from "react";
import Table from "../component/Table";
import Employee from "./employee/Index";
import { handleSearch } from "../utils/Common";
import { DownLoad } from "../assets/image";

const DataFile = ({
  uploadTabledata = [],
  convertedTableData = [],
  filename = "",
  onDownload = () => {},
  isFileConvert,
  lastFileConverted,
  currentTab,
  onTabSwitch = () => {}
}) => {
  const [activeTab, setActiveTab] = useState(currentTab || "1");
  const [uploadsearchQuery, setUploadSearchQuery] = useState("");
  const [convertsearchQuery, setConvertSearchQuery] = useState("");
  const [addEmployee, setaddEmployee] = useState(false);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    onTabSwitch(newTab);
  };
  const handleEmployeeModal = () => {
    setaddEmployee(!addEmployee);
  };
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setUploadSearchQuery(query);
  
  };
  const handleConvertSearch = (e) => {
    const query = e.target.value;
    setConvertSearchQuery(query);
  
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
  const uploadSearchData = handleSearch(uploadArray.slice(1), uploadsearchQuery)
  const convertSearchData=handleSearch(convertedfilteredData,convertsearchQuery)


  return (
    <div className="home-container">
      <div className="home-action-wrapper">
        <div className="action-tabs">
          <div
            onClick={() => handleTabChange("1")}
            className={`tab ${activeTab === "1" ? "active" : ""}`}
          >
            Labor Payroll Report
          </div>
          <div
            onClick={() => handleTabChange("2")}
            className={`tab ${activeTab === "2" ? "active" : ""}`}
          >
            Converted Labor Payroll Report
          </div>
          <div
            onClick={() => handleTabChange("3")}
            className={`tab ${activeTab === "3" ? "active" : ""}`}
          >
            Employee
          </div>
        </div>
        {activeTab === "2" && isFileConvert && (
          <button className="download" onClick={onDownload}>
            <img src={DownLoad} alt="download" /> Download
          </button>
        )}
        {activeTab === "3" && (
          <button className="download" onClick={handleEmployeeModal}>
          
            Add Employee
          </button>
        )}
      </div>
      <div className="data-container">
        {activeTab === "1" && (
          <Table
            tableColoum={filteredData}
            isUploadTable={true}
            dataToRender={uploadSearchData}
            searchQuery={uploadsearchQuery}
            handleSearchInput={handleSearchInputChange}
          />
        )}
        {activeTab === "2" && (
          <Table
            tableColoum={convertedfilteredData}
            dataToRender={convertSearchData}
            onDownload={onDownload}
            showDownload={isFileConvert}
            lastFileConverted={lastFileConverted}
            searchQuery={convertsearchQuery}
            handleSearchInput={handleConvertSearch}
          />
        )}
        {activeTab === "3" && (
          <Employee
            showModal={addEmployee}
            onCloseModal={handleEmployeeModal}
          />
        )}
      </div>
    </div>
  );
};

export default DataFile;
