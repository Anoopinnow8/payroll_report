import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Table from "../component/Table";
import download from "../assets/image/download.png";
import Employee from "./employee/Index";
import { debounce, handleSearch } from "../utils/Common";
import { convertedFileByID,getlatest } from "../api/Function";
import Papa from "papaparse";
import * as XLSX from "xlsx";
const DataFile = ({
  uploadTabledata = [],
  convertedTableData = [],
  filename = "",
  onDownload = () => {},
  isFileConvert,
  lastFileConverted
}) => {
  const [value, setValue] = useState("1");
  const [uploadsearchQuery, setUploadSearchQuery] = useState("");
  const [previousConvertedData, setPrevConvertedData] = useState([]);
  const [previousConvertedUrl, setPrevConvertedUrl] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        console.log(res.data.output_url,"jjjj")
        setPrevConvertedUrl((res.data.output_url));
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
            }
          });
        })
        .catch((error) => console.log("Error fetching converted file:", error));
    }
  }, [previousConvertedUrl]);
  useEffect(() => {
    getLatestConvertedFile();
  }, []);
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="">
            <Tab
              label="Labor Payroll Report"
              value="1"
              sx={{
                maxWidth: "50%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            />
            <Tab
              label="Converted Labor Payroll Report"
              value="2"
              sx={{
                maxWidth: "50%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            />
            <Tab
              label="Employee"
              value="3"
              sx={{
                maxWidth: "50%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Table
            tableColoum={filteredData}
            isUploadTable={true}
            dataToRender={uploadArray.slice(1)}
            searchQuery={uploadsearchQuery}
            handleSearchInput={handleSearchInputChange}
          />
        </TabPanel>
        <TabPanel value="2">
          <Table
            tableColoum={convertedfilteredData}
            dataToRender={convertedfilteredData}
            onDownload={onDownload}
            showDownload={isFileConvert}
            lastFileConverted={lastFileConverted}
          />
        </TabPanel>
        <TabPanel value="3">
          <Employee
            tableColoum={convertedfilteredData}
            dataToRender={convertedfilteredData}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default DataFile;
