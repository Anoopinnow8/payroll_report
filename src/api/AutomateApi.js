import axios from 'axios';

const triggerApiRequest = async ( payload) => {
  const url ="https://prod-85.westus.logic.azure.com:443/workflows/6deb5e5c992a4c08aba0c1075b79c4e5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=52d6cU4OAUPYwagrOc0JXgDKr2sAkeOwk_fpEfyx-qk"


  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error occurred while calling the API:', error);
    throw error; 
  }
};

export default triggerApiRequest;
