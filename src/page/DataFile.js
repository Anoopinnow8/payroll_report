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
  const convertedfilteredData = convertedTableData.filter((row) => {
    return Object.values(row).some(
      (value) => value !== null && value !== undefined && value !== ""
    );
  });
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
            dataToRender={filteredData.slice(1)}
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
