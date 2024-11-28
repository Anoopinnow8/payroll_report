import Papa from "papaparse";


export const convertCsvToJson = async (url) => {
  try {
    const response = await fetch(url);

    const text = await response.text();
    
    if (text.startsWith('<!DOCTYPE html>')) {
      console.error('The file is not a valid CSV, HTML content returned');
      throw new Error('The file is not a valid CSV, HTML content returned');
    }

    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        complete: (result) => {
          resolve(result.data); 
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          reject(error); 
        },
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing CSV file:", error);
    throw error; 
  }
};
