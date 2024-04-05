import React from 'react';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Alert from '@mui/material/Alert';

import AuthContext from '../../context/AuthContext';

export default function RegisterPage() {
  const { error, registerUser } = React.useContext(AuthContext);

  const initialFormData = {
    username: '',
    email: '',
    password1: '',
    password2: '',
  };

  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{minHeight: '50vh'}}>
        <Paper elevation={0} sx={{marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2}}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form method="POST" onSubmit={(e) => registerUser(e, formData)} sx={{width: {sm: '100%', md: 400}, marginTop: 1}}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
            />
            {error && error.username && (
              <Alert severity="error" sx={{marginTop: 1, marginBottom: 1}}>
                {error.username}
              </Alert>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            {error && error.email && (
              <Alert severity="error" sx={{marginTop: 1, marginBottom: 1}}>
                {error.email}
              </Alert>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password1"
              label="Password"
              type="password"
              id="password1"
              autoComplete="new-password"
              onChange={handleChange}
            />
            {error && error.password1 && (
              <Alert severity="error" sx={{marginTop: 1, marginBottom: 1}}>
                {error.password1}
              </Alert>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="new-password"
              onChange={handleChange}
            />
            {error && error.password2 && (
              <Alert severity="error" sx={{marginTop: 1, marginBottom: 1}}>
                {error.password2}
              </Alert>
            )}

            {error &&
              Object.keys(error)
                .filter((field) => !['username', 'email', 'password1', 'password2'].includes(field))
                .map((field, index) => (
                  <Alert key={index} severity="error" sx={{marginTop: 1, marginBottom: 1}}>
                    <strong>Errors:</strong> {error[field].join(' ')}
                  </Alert>
            ))}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{marginTop: 3, marginBottom: 3}}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login/" variant="body2" underline="hover">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
}
