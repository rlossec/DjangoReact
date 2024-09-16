import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import apiFetch from '../../utils/apiFetch';


const PasswordResetConfirmPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async () => {
    if (password !== passwordConfirm) {
      setError("Passwords don't match");
      return;
    }

    const data = {
      uid,
      token,
      new_password1: password,
      new_password2: passwordConfirm,
    };

    try {
      const response = await apiFetch('dj-rest-auth/password/reset/confirm/', 'POST', data);
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      setError('Echec de la réinitialisation. Veuillez réessayer.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Réinitialisation du mot de passe
        </Typography>

        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}

        {success ? (
          <Typography color="primary" gutterBottom>
            Le mot de passe a été réinitialisé avec succès ! Redirection vers la page de connexion...
          </Typography>
        ) : (
          <>
            <TextField
              label="Nouveau mot de passe"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirmer le nouveau mot de passe"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handlePasswordReset}
              sx={{ mt: 2 }}
            >
              Réinitialiser
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default PasswordResetConfirmPage;
