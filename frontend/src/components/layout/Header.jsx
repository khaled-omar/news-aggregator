import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link as MuiLink,
  Container,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useAuthContext } from '../../contexts/AuthContext.jsx';

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [mobileOpen, setMobileOpen] = useState(false); // For mobile menu
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthContext();

  const updateSearchParams = (key, value) => {
    value ? searchParams.set(key, value) : searchParams.delete(key);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setKeyword(searchParams.get('keyword') || '');
  }, [searchParams]);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const renderNavLinks = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
      {isAuthenticated() ? (
        <>
          <MuiLink
            component={RouterLink}
            to="/profile"
            underline="none"
            color="inherit"
            sx={{ mr: 2 }}
          >
            Profile
          </MuiLink>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <MuiLink
            component={RouterLink}
            to="/login"
            underline="none"
            color="inherit"
            sx={{ mr: 2 }}
          >
            Login
          </MuiLink>
          <MuiLink component={RouterLink} to="/register" underline="none" color="inherit">
            Register
          </MuiLink>
        </>
      )}
    </Box>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={toggleMobileMenu}
      sx={{
        '& .MuiDrawer-paper': {
          width: 250,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <IconButton onClick={toggleMobileMenu} sx={{ alignSelf: 'flex-end' }}>
          <CloseIcon />
        </IconButton>
        <List>
          {isAuthenticated() ? (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/profile"
                  onClick={toggleMobileMenu}
                >
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/login"
                  onClick={toggleMobileMenu}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/register"
                  onClick={toggleMobileMenu}
                >
                  <ListItemText primary="Register" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* Logo */}
          <MuiLink
            component={RouterLink}
            to="/"
            underline="none"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center', mr: 2 }}
          >
            <NewspaperIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Magazine</Typography>
          </MuiLink>

          {/* Search Field */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter keyword and press enter"
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              mr: 2,
              flex: 1,
              visibility: { xs: 'hidden', sm: 'visible' },
            }}
            value={keyword}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setKeyword(e.target.value);
                updateSearchParams('keyword', e.target.value.trim());
                navigate('/?' + searchParams.toString());
              }
            }}
            onChange={(e) => setKeyword(e.target.value)}
          />

          {/* Desktop Navigation Links */}
          {renderNavLinks()}

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={toggleMobileMenu}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      {renderMobileMenu()}
    </AppBar>
  );
};

export default Header;
