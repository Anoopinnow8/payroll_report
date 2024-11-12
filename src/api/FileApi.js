import { toast } from "react-toastify";

export const handleFileConvert = async (
  uploadFile,
  setConvertedFileUrl,
  setisLoading
) => {
  if (!uploadFile) return;
  setisLoading(true);

  const accessToken = localStorage.getItem("access_token");

  const url = "https://n4om1187nj.execute-api.us-east-2.amazonaws.com/dev/convert/";
  const formdata = new FormData();
  formdata.append("input", uploadFile, uploadFile.name);

  const requestOptions = {
    method: "POST",
    headers: {
      "Authorization": `${accessToken}`,
    },
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();

    if (result.file_url) {
      setConvertedFileUrl(result.file_url);
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
