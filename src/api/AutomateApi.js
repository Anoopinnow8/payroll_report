import axios from 'axios';

const triggerApiRequest = async ( payload) => {
  // const url ="https://prod-85.westus.logic.azure.com:443/workflows/6deb5e5c992a4c08aba0c1075b79c4e5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=52d6cU4OAUPYwagrOc0JXgDKr2sAkeOwk_fpEfyx-qk"
 const url="https://prod-151.westus.logic.azure.com:443/workflows/51cee7bbcad24faeb3fd7f1d82a44d15/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=z2yL9ppze359MhNBxVe6kM2HbK6kTsqdFAW-PKuSBcg"

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
   
    return response;
  } catch (error) {
    console.error('Error occurred while calling the API:', error);
    throw error; 
  }
};

export default triggerApiRequest;
