
import React from 'react';
import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';

import Badge from '@mui/material/Badge';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import AccountMenu from '../components/AccountMenu';
import { mainMenu } from '../components/MainMenu';

const mdTheme = createTheme({});
const drawerWidth = 240;
const AppBarHeight = "64px"

export default function DrawerAppBar({page, children}) {
  const theme = useTheme(mdTheme);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" color="success">
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: AppBarHeight,
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md:'block', lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ margin: 'auto'}}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
            >
              {page}
            </Typography>
          </Box>
          { isLargeScreen ?
            <Box>
              <IconButton sx={{mx: '15px'}}>
                <NavLink to="/logout/">
                  <PowerSettingsNewIcon sx={{"color": "white"}} />
                </NavLink>
              </IconButton>
            </Box>
          :
            <AccountMenu />
          }
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': { mt:AppBarHeight, boxSizing: 'border-box', width: drawerWidth },
        }}
        open={isLargeScreen || mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {mainMenu}
      </Drawer>

      <Box
        component="main"
        sx={{
          p: {
            lg: 3,
            xs: 0,
          },
          width: {
            lg: `calc(100% - ${drawerWidth}px)`,
            xs: '100%'
            },
        }}
      >
        <Toolbar />
        {children}
      </Box>

    </Box>


  );
}