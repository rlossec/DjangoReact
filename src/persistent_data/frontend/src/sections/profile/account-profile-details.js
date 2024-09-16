import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container, Grid, Box, Button,
  Card, CardActions, CardContent, CardHeader,
  Divider,
  TextField,
  Stack,
} from '@mui/material';

import AuthContext from '../../context/AuthContext'
import apiFetch from '../../utils/apiFetch';


export const AccountProfileDetails = () => {

  const { user, setUser, accessToken, refreshToken } = React.useContext(AuthContext);

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch('dj-rest-auth/user/', 'GET', null, accessToken, refreshToken);
      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
      } else {
        console.error('Erreur lors de la récupération des données utilisateur');
      }
    } catch (error) {
      console.error('Erreur :', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);


  const handleChangeEmail = () => {
    navigate('/profile/change-email/');
  };

  const handleChangePassword = () => {
    navigate('/profile/change-password/');
  };

  const handleChange = React.useCallback(
    (event) => {
      setUser((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const data = JSON.stringify(
        {
          'first_name': user.first_name,
          'last_name': user.last_name,
        }
      );

      try {
        const response = await apiFetch('dj-rest-auth/user/', 'PATCH', data, accessToken, refreshToken);

        if (response.status === 200) {
          console.log('Profile updated');
        } else {
          console.error('API Error in retrieve user data.');
        }
      } catch (error) {
        console.error('Error :', error);
      }
    },
    [user]
  );

  return (
    <Container>
      <form
        autoComplete="off"
        noValidate
      >
        <Card>
          <CardHeader
            title="Profil"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3} >
                <Grid item xs={12} md={6} >
                  <TextField
                    fullWidth
                    helperText="Indiquez votre prénom"
                    label="Prénom"
                    name="first_name"
                    onChange={handleChange}
                    required
                    value={user.first_name}
                  />
                </Grid>
                <Grid item xs={12} md={6} >
                  <TextField
                    fullWidth
                    label="Nom"
                    name="last_name"
                    onChange={handleChange}
                    required
                    value={user.last_name}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" color='success' onClick={handleSubmit}>
              Sauvegarder
            </Button>
          </CardActions>
        </Card>
      </form>

      <Card sx={{ mt: 4 }}>
        <CardHeader title="Sécurité" subheader="Gérez votre mot de passe et votre email" />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            {/* Email et bouton de changement sur la même ligne */}
            <Grid item xs={8}>
              <TextField
                label="Adresse email"
                variant="outlined"
                value={user.email}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleChangeEmail}
              >
                Changer l'email
              </Button>
            </Grid>
          </Grid>

          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleChangePassword}
            >
              Changer le mot de passe
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};