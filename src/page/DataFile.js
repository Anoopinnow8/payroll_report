import React, { useState } from "react";
import Table from "../component/Table";
import Employee from "./employee/Index";
import { handleSearch } from "../utils/Common";
import { DownLoad ,Add} from "../assets/image";

const DataFile = ({
  uploadTabledata = [],
  convertedTableData = [],
  onDownload = () => {},
  isFileConvert,
  lastFileConverted,
  activeTab,
  onTabSwitch = () => { },
  latestUploadFileUrl
}) => {
  const [uploadsearchQuery, setUploadSearchQuery] = useState("");
  const [convertsearchQuery, setConvertSearchQuery] = useState("");
  const [addEmployee, setaddEmployee] = useState(false);

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
  const handleClearQuery = () => {
    setUploadSearchQuery("");
    setConvertSearchQuery("")
  }
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
            onClick={() => onTabSwitch("1")}
            className={`tab ${activeTab === "1" ? "active" : ""}`}
          >
            Labor Payroll Report
          </div>
          <div
            onClick={() => onTabSwitch("2")}
            className={`tab ${activeTab === "2" ? "active" : ""}`}
          >
            Converted Labor Payroll Report
          </div>
          <div
            onClick={() => onTabSwitch("3")}
            className={`tab ${activeTab === "3" ? "active" : ""}`}
          >
           Employees
          </div>
        </div>
        {activeTab === "1" && latestUploadFileUrl && (
          <button className="download" onClick={()=>onDownload("upload")}>
            <img src={DownLoad} alt="download" /> Download
          </button>
        )}
        {activeTab === "2" && isFileConvert && (
          <button className="download" onClick={()=>onDownload("convert")}>
            <img src={DownLoad} alt="download" /> Download
          </button>
        )}
        {activeTab === "3" && (
          <button className="download" onClick={handleEmployeeModal}>
            <img src={Add} alt="download" />
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
            onSearchClear={handleClearQuery}
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
            onSearchClear={handleClearQuery}
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
