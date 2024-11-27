import Papa from "papaparse";


export const convertCsvToJson = async (url) => {
  try {
    const response = await fetch(url);
    const csvData = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        complete: (result) => {
        return  resolve(result.data); 
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          reject(error); 
        },
      });
    });
  } catch (error) {
    console.error("Error fetching CSV file:", error);
    throw error; 
  }
};


