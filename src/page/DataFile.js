import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Table from "../component/Table";
import download from "../assets/image/download.png";
const DataFile = ({
  uploadTabledata = [],
  convertedTableData = [],
  filename = "",
  onDownload = () => {},
  isFileConvert
}) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredData = uploadTabledata.filter((row) => {
    return Object.values(row).some(
      (value) => value !== null && value !== undefined && value !== ""
    );
  });

  const filterDataArray = (filteredData) => {
    let result = []
    for (let i = 0; i < filteredData.length; i++) {
      const arrEle = filteredData[i];
      let arr = []
      for (let j = 0; j < arrEle.length; j++) {
        const e = arrEle[j];
        if (j === 1 && e == null) {
          arr.push(arrEle[0])
          continue
        }
        arr.push(e)
      }
      result.push(arr)
    }

    return result
  };
  const newArray = filterDataArray(filteredData);

  const convertedfilteredData = convertedTableData.filter((row) => {
    return Object.values(row).some(
      (value) => value !== null && value !== undefined && value !== ""
    );
  });
  console.log(uploadTabledata, "uploadTabledata");

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
          </TabList>
        </Box>
        <TabPanel value="1">
          <Table
            data={filteredData}
            isUploadTable={true}
            dataToRender={newArray.slice(1)}
          />
        </TabPanel>
        <TabPanel value="2">
          {isFileConvert && (
            <img
              src={download}
              alt="download"
              className="download"
              onClick={onDownload}
            />
          )}

          <Table
            data={convertedfilteredData}
            dataToRender={convertedfilteredData}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default DataFile;
