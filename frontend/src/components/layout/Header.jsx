import {
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Link,
  Link as MuiLink, Icon, Container,
} from '@mui/material'
import { useAuthContext } from '../../contexts/AuthContext.jsx'
import { Link as RouterLink } from 'react-router-dom'
import React from 'react'
import NewspaperIcon from '@mui/icons-material/Newspaper';

const Header = () => {
  const { isAuthenticated, logout } = useAuthContext();
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
      <Toolbar>
        <MuiLink component={RouterLink} to="/" underline="none" color="inherit" sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        <Icon edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
          <NewspaperIcon />
        </Icon>
        <Typography variant="h6"  >
          Magazine
        </Typography>
        </MuiLink>

        <TextField
          variant="outlined"
          size="small"
          placeholder="keyword"
          sx={{ bgcolor: 'white', borderRadius: 1, mr: 2, flex: 1 }}
          // onChange={aaa(e) => onSearch(e.target.value)}
        />
        {isAuthenticated ? (
          <>
            <MuiLink component={RouterLink} to="/profile" underline="none" color="inherit" sx={{ mr: 2 }}>
              Profile
            </MuiLink>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <MuiLink component={RouterLink} to="/login" underline="none" color="inherit" sx={{ mr: 2 }}>
              Login
            </MuiLink>
            <MuiLink component={RouterLink} to="/register" underline="none" color="inherit">
              Register
            </MuiLink>
          </>
        )}
      </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header
