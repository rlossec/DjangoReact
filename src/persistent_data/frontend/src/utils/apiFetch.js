
import axios from 'axios';

import CONFIG from '../config';

const { API_URL } = CONFIG;


const apiFetch = async (uri, method='GET', data=null, accessToken=null, refreshToken=null) => {
  const url = API_URL + uri

  let headers = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const config = {
      method,
      url,
      headers
  };

  if (data) {
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
      config.data = data;
    } else {
      headers['Content-Type'] = 'application/json';
      config.data = data;
    }
  }

  try {

    const response = await axios(config);
    return response;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401 && refreshToken) {
      // Token might have expired, try to refresh it
      try {
        const refreshResponse = await axios.post(`${API_URL}dj-rest-auth/token/refresh/`, { refresh: refreshToken });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.access;
          sessionStorage.setItem('accessToken', JSON.stringify(newAccessToken));

          headers['Authorization'] = `Bearer ${newAccessToken}`;
          config.headers = headers;

          // Retry the original request with the new token
          const retryResponse = await axios(config);
          return retryResponse;
        }
      } catch (refreshError) {
        console.error('Unable to refresh token', refreshError);
        throw refreshError;
      }
    } else {
      console.error('API request error', error);
      throw error;
    }
  }
};

export default apiFetch;