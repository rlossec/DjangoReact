
import axios from 'axios';

const API_URL = 'http://localhost:3200/'


const apiFetch = async (uri, method='GET', data=null) => {
  const url = API_URL + uri
  const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
  };

  if (data) {
      config.data = data;
  }

  const response = await axios(config);

  return response
};

export default apiFetch;