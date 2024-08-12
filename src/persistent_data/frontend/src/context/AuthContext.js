import React from 'react';
import { useNavigate } from 'react-router-dom'

import apiFetch from '../utils/apiFetch';


const AuthContext = React.createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

  const TOKEN_REFRESH_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes in milliseconds

  const [accessToken, setAccessToken]    = React.useState(() => sessionStorage.getItem('accessToken') ? JSON.parse(sessionStorage.getItem('accessToken')) : null)
  const [refreshToken, setRefreshToken]  = React.useState(() => sessionStorage.getItem('refreshToken') ? JSON.parse(sessionStorage.getItem('refreshToken')) : null);
  const [user, setUser]                  = React.useState(() => sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null)
  const [error, setError]                = React.useState(null)

  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await apiFetch('dj-rest-auth/registration/', 'POST', JSON.stringify({
        'username': e.target.username.value,
        'email': e.target.email.value,
        'password1': e.target.password1.value,
        'password2': e.target.password2.value,
      }));

      if (response.status >= 200 && response.status < 300) {
        navigate('/login/');  // Redirection vers la page de connexion
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await apiFetch('dj-rest-auth/login/', 'POST', JSON.stringify({
        'username': e.target.username.value,
        'password': e.target.password.value,
        'scopes': 'read',
      }));

      if (response.status>=200 && response.status<300) {
        const { access, refresh, user } = response.data;
        setAccessToken(access);
        setRefreshToken(refresh);
        sessionStorage.setItem('accessToken', JSON.stringify(access));
        sessionStorage.setItem('refreshToken', JSON.stringify(refresh));
        setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        setError(response)
      }
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  }

  let logoutUser = () => {
    try {
      apiFetch('/dj-rest-auth/logout/', 'POST');
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('user')
      navigate('login/')
    } catch (error) {
      console.error(error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await apiFetch('dj-rest-auth/token/refresh/', 'POST', JSON.stringify({
        'refresh': refreshToken,
      }));

      if (response.status === 200) {
        const { access } = response.data;
        setAccessToken(access);
        sessionStorage.setItem('accessToken', JSON.stringify(access));
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logoutUser();
    }
  };

  // Automatically refresh the token before it expires
  React.useEffect(() => {
    if (accessToken && refreshToken) {
      const interval = setInterval(() => {
        refreshAccessToken();
      }, TOKEN_REFRESH_INTERVAL_MS); // Refresh every 15 minutes

      return () => clearInterval(interval);
    }
  }, [accessToken, refreshToken]);


  let contextData = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user,
    setUser: setUser,
    error: error,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}


