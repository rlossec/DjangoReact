import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import apiFetch from '../../utils/apiFetch';


const PasswordResetPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordResetRequest = async () => {
        try {
            const response = await apiFetch('dj-rest-auth/password/reset/', 'POST', { email });
            if (response.status === 200) {
                setMessage('Un lien de réinitialisation a été envoyé à votre adresse email.');
                setError('');
            }
        } catch (error) {
            setMessage('');
            setError('Erreur lors de l\'envoi du lien de réinitialisation. Veuillez vérifier l\'adresse email.');
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

                {message && (
                    <Typography color="primary" gutterBottom>
                        {message}
                    </Typography>
                )}

                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handlePasswordResetRequest}
                    sx={{ mt: 2 }}
                >
                    Envoyer le lien de réinitialisation
                </Button>
            </Box>
        </Container>
    );
};

export default PasswordResetPage;
