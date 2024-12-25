import React, { useState } from 'react';
import { Box, Tabs, Tab, Container } from '@mui/material';
import UserProfileUpdate from '../components/UserProfileUpdate.jsx';
import UserPreferences from '../components/UserPreferences.jsx';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 0:
        return <UserProfileUpdate />;
      case 1:
        return <UserPreferences />;
      default:
        return <UserProfileUpdate />;
    }
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="Profile Tabs"
          variant="fullWidth"
        >
          <Tab label="Profile" />
          <Tab label="Preferences" />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box>{renderActiveComponent()}</Box>
    </Container>
  );
};

export default ProfilePage;
