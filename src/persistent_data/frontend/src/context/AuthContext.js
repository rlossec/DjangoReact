import React from 'react';
import { useNavigate } from 'react-router-dom'

import apiFetch from '../utils/apiFetch';


const AuthContext = React.createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

  const [accessToken, setAccessToken]    = React.useState(() => sessionStorage.getItem('accessToken') ? JSON.parse(sessionStorage.getItem('accessToken')) : null)
  const [user, setUser]                  = React.useState(() => sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null)
  const [error, setError]              = React.useState(null)

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
      const response = await apiFetch('dj-rest-auth/login/', 'POST', JSON.stringify(
          {
            'username': e.target.username.value,
            'password': e.target.password.value,
            'scopes': 'read',
          })
        );
      if (response.status>=200 && response.status<300) {
        setAccessToken(response.data.access)
        sessionStorage.setItem('accessToken', JSON.stringify(response.data.access))
        setUser(response.data.user);
        sessionStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/')
      } else {
        setError(response)
      }
    } catch (error) {
      setError(error.response.data);
    }
  }

  let logoutUser = () => {
      try {
        apiFetch('/dj-rest-auth/logout/', 'POST');
        setUser(null);
        setAccessToken(null);
        sessionStorage.removeItem('accessToken')
        navigate('login/')
      } catch (error) {
        console.error(error);
      }
  }

  let contextData = {
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


