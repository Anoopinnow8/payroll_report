import axios from 'axios';

const triggerApiRequest = async (id, payload) => {
  const url = `https://prod-85.westus.logic.azure.com:443/workflows/${id}/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=52d6cU4OAUPYwagrOc0JXgDKr2sAkeOwk_fpEfyx-qk`

  const data = {
    id,
    ...payload 
  };

  try {
    const response = await axios.post(url, data, {
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
