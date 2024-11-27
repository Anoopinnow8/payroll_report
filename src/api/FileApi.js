import { toast } from "react-toastify";

export const handleFileConvert = async (
  uploadFile,
  setConvertedFileUrl,
  setisLoading,
  setLastConverted
) => {
  if (!uploadFile) return;
  setisLoading(true);

  const accessToken = localStorage.getItem("access_token");
  const { REACT_APP_BASE_URL } = process.env;
  const formdata = new FormData();
  const url = `${REACT_APP_BASE_URL}convert/`;
  formdata.append("input", uploadFile, uploadFile.name);

  const requestOptions = {
    method: "POST",
    headers: {
      "Authorization": `${accessToken}`
    },
    body: formdata,
    redirect: "follow"
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    if (result.file_url) {
      setConvertedFileUrl(result.file_url);
      setLastConverted(result.created_at);
      toast.success("File converted successfully");
    } else {
      toast.error("Conversion failed. No file URL returned.");
    }
  } catch (error) {
    console.log("API error:", error);
    toast.error("Oops! Something went wrong.");
  } finally {
    setisLoading(false);
  }
};
