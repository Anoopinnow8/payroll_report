import React, { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Table from "../component/Table";

const DataFile = ({ uploadTabledata = [], convertedTableData = [], filename = "" }) => {
  const [value, setValue] = useState('1');

  const truncateText = (text) => {
    if (text && text.length > 50) {
      return text.substring(0, 50) + '..'; 
    }
    return text;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const filteredData = uploadTabledata.filter((row) => {
    return Object.values(row).some(value => value !== null && value !== undefined && value !== "");
  });
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="">
            <Tab 
              label={truncateText(filename ? filename : "Uploaded File")} 
              value="1" 
              sx={{
                maxWidth: '50%', 
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis' 
              }} 
            />
            <Tab 
              label={truncateText(filename ? filename : "Converted File")} 
              value="2" 
              sx={{
                maxWidth: '50%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis' 
              }} 
            />
          </TabList>
        </Box>
        <TabPanel value="1"><Table data={filteredData} isUploadTable={ true}/></TabPanel>
        <TabPanel value="2"><Table data={convertedTableData} /></TabPanel>
      </TabContext>
    </Box>
  );
};

export default DataFile;
