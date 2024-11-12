export const handleFileUpload = () => {
  if (!uploadFile) return;

  const url = "https://csv-convertor.onrender.com/convert/";

 
  const formdata = new FormData();
 
  formdata.append("input", uploadFile, uploadFile.name);

  
  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log("API Response:", result))
    .catch(error => console.error("Error uploading file:", error));
};