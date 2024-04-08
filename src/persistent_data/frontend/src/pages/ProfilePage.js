
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import AppBar from '../components/AppBar'
import { AccountProfile } from '../sections/profile/account-profile';
import { AccountProfileDetails } from '../sections/profile/account-profile-details';

const ProfilePage = () => {

  return (
    <AppBar page="Profile">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Account
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <AccountProfile/>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <AccountProfileDetails/>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </AppBar>
  );
}

export default ProfilePage;