import {
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Link as MuiLink, Icon, Container,
} from '@mui/material'
import { useAuthContext } from '../../contexts/AuthContext.jsx'
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import NewspaperIcon from '@mui/icons-material/Newspaper';

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
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
          placeholder="Enter keyword and press enter"
          sx={{ bgcolor: 'white', borderRadius: 1, mr: 2, flex: 1 }}
          value={keyword}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setKeyword(e.target.value);
              updateSearchParams('keyword', e.target.value.trim())
              navigate('/?' + searchParams.toString());
            }
          }}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        {isAuthenticated() ? (
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
