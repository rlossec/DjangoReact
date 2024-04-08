import React from 'react';

import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArticleIcon from '@mui/icons-material/Article';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const mainMenu = (
  <React.Fragment>
    <Link href="/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <ListItemText primary="Home"/>
      </ListItemButton>
    </Link>
    <Divider/>
    <Divider/>
    <Link href="/option-1-1/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <FormatListBulletedIcon color="success"/>
        </ListItemIcon>
        <ListItemText primary="Option 1.1"/>
      </ListItemButton>
    </Link>

    <Link href="/option-1-2/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <ArticleIcon color="success"/>
        </ListItemIcon>
        <ListItemText primary="Option 1.2." />
      </ListItemButton>
    </Link>
    <Divider/>
    <Divider/>
    <Link href="/option-2-1/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <MoreTimeIcon color="primary"/>
        </ListItemIcon>
        <ListItemText primary="Option 2.1."/>
      </ListItemButton>
    </Link>

    <Link href="/option-2-2/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <PlaylistAddCheckIcon color="primary"/>
        </ListItemIcon>
        <ListItemText primary="Option 2.2."/>
      </ListItemButton>
    </Link>
    <Divider/>
    <Divider/>
    <Link href="/option-3/" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <FactCheckIcon color="secondary"/>
        </ListItemIcon>
        <ListItemText primary="Option 3"/>
      </ListItemButton>
    </Link>

  </React.Fragment>
);
