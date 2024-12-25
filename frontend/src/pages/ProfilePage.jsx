import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
} from '@mui/material';
import UserProfileUpdate from '../components/UserProfileUpdate.jsx';
import UserPreferences from '../components/UserPreferences.jsx';

const drawerWidth = 200;

const ProfilePage = () => {
  const [activeComponent, setActiveComponent] = useState('profile');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <UserProfileUpdate />;
      case 'preferences':
        return <UserPreferences />;
      default:
        return <UserProfileUpdate />;
    }
  };

  return (
    <>
      {/* Main Content with Drawer */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Side Navigation */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              marginTop: '70px',
            },
          }}
        >
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setActiveComponent('profile')}
                sx={{
                  bgcolor: activeComponent === 'profile' ? 'primary.main' : 'transparent',
                  color: activeComponent === 'profile' ? 'primary.contrastText' : 'inherit',
                  '&:hover': {
                    bgcolor: activeComponent === 'profile' ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <ListItemText primary="Update Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setActiveComponent('preferences')}
                sx={{
                  bgcolor: activeComponent === 'preferences' ? 'primary.main' : 'transparent',
                  color: activeComponent === 'preferences' ? 'primary.contrastText' : 'inherit',
                  '&:hover': {
                    bgcolor: activeComponent === 'preferences' ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <ListItemText primary="Preferences" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Container maxWidth="md">
            {renderActiveComponent()}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
