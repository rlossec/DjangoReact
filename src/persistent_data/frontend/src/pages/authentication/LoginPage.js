import React from 'react';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';


import AuthContext from '../../context/AuthContext'

export default function LoginPage() {

  const { error, loginUser } = React.useContext(AuthContext)

	const initialFormData = Object.freeze({
		username: '',
		password: '',
	});

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
			<Paper elevation={0}
			  sx={{
			    marginTop: 2,
			    display: 'flex',
			    flexDirection: 'column',
			    alignItems: 'center',
			    padding: 2,
			  }}
			>
				<Avatar sx={{margin: 1, backgroundColor: '#ef5350'}}></Avatar>
				<Typography component="h1" variant="h5">
					Se connecter
				</Typography>
				<form onSubmit={loginUser} sx={{width: {sm: '100%', md:400}, marginTop: 1}}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Nom d'utilisateur"
						name="username"
						autoComplete="username"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Mot de passe"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
          { error && error.non_field_errors && error.non_field_errors instanceof Array &&
            error.non_field_errors.map((element) => {
              return <Alert className="alert-message" key={element} severity="error">
                       <AlertTitle>Error</AlertTitle>
                       {element}
                     </Alert>
            })
          }
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={{marginTop: 3, marginBottom: 3}}
					>
						Se connecter
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="/auth/password/reset/" variant="body2" underline="hover">
								Mot de passe oublié ?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/register/" variant="body2" underline="hover">
								<span>S'inscrire</span>
							</Link>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>

		</>
	);
}
