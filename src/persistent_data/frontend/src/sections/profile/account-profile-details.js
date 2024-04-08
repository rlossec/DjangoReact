import React from 'react';
import { useCallback, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

import AuthContext from '../../context/AuthContext'
import apiFetch from '../../utils/apiFetch';


export const AccountProfileDetails = () => {

  const { user, setUser, accessToken } = React.useContext(AuthContext);

  const handleChange = useCallback(
    (event) => {
      setUser((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const data = JSON.stringify(
        {
          'first_name': user.first_name,
          'last_name': user.last_name,
        }
      );

      try {
        const response = await apiFetch('dj-rest-auth/user/', 'PATCH', data, accessToken);

        if (response.ok) {
          console.log('Profile updated');
        } else {
          console.error('Api error');
        }
      } catch (error) {
        console.error('Error :', error);
      }
    },
    [user]
  );

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <Card>
        <CardHeader
          subheader="Les informations peuvent être modifiées"
          title="Profil"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
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
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Nom"
                  name="last_name"
                  onChange={handleChange}
                  required
                  value={user.last_name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={user.email}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            Sauvegarder
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};