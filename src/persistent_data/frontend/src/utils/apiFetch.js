
import axios from 'axios';

const API_URL = 'http://localhost:3200/'


const apiFetch = async (uri, method='GET', data=null, token=null) => {
  const url = API_URL + uri

  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
      method,
      url,
      headers
  };

  if (data) {
      config.data = data;
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    config.headers = headers
  }
  console.log(data);
  const response = await axios(config);

  return response
};

export default apiFetch;