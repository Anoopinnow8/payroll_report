import axios from "axios";

const makeApiCall = async (method, url, data = {}, includeAuthHeader = false) => {
  const config = {
    method,
    url,
    data,
  };

  if (includeAuthHeader) {

    const token = localStorage.getItem('access_token');
    config.headers = {
      'Authorization': token,
      'Content-Type': 'application/json',
    };
  }

  try {
    let result = await axios.request(config);
    return result;
  } catch (err) {
    return err;
  }
};

export default makeApiCall;
