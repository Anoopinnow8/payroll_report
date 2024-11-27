import makeApiCall from "./BaseApi";
const { REACT_APP_BASE_URL } = process.env;

const createEmployee = async (data) => {
  const url = `${REACT_APP_BASE_URL}employees/`;
  return await makeApiCall("post", url, data,true);
};
const getEmployee = async (data) => {
  const url = `${REACT_APP_BASE_URL}employees/`;
  return await makeApiCall("get", url, data,true);
};
const getIntiate = async (data) => {
  const url = `${REACT_APP_BASE_URL}convert/initiate/`;
  return await makeApiCall("get", url, data,true);
};
const AutomateConvertedFileByID = async (id) => {
  const url = `${REACT_APP_BASE_URL}convert/${id}/`;
  return await makeApiCall("get", url,true);
};
const getlatest = async (data) => {
  const url = `${REACT_APP_BASE_URL}/convert/fetch-latest/`;
  return await makeApiCall("get", url, data,true);
};
export {
  createEmployee,getEmployee,getIntiate,AutomateConvertedFileByID,getlatest
}