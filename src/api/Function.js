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
  const url = `${REACT_APP_BASE_URL}/convert/initiate/`;
  return await makeApiCall("get", url, data,true);
};


export {
  createEmployee,getEmployee,getIntiate
}