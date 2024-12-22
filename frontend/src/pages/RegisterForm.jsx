import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    InputAdornment,
    IconButton,
    Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from '../contexts/AuthContext.jsx';
import { registerSchema } from '../validations/schema.js'
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(registerSchema) });
    const { registerNewUser } = useAuthContext();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
      try {
            await registerNewUser(data);
            navigate('/');
        } catch (e) {
            setError('email', {
                type: 'manual',
                message: 'Registration failed. Try again.',
            });
        }
    };

    return (
      <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
          >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" gutterBottom>
                  Sign Up
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    width: "100%",
                    mt: 1,
                }}
              >
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    autoComplete="username"
                    autoFocus
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Name"
                    autoComplete="name"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)}>
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                        ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password_confirmation"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    id="password_confirmation"
                    autoComplete="new-password"
                    {...register("password_confirmation")}
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation?.message}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                    }}
                  >
                      {isSubmitting ? 'Submitting ...' : 'Sign Up'}
                  </Button>
                  <Grid container justifyContent="center">
                      <Grid item>
                          <Typography variant="body2">
                              Already have an account?{" "}
                              <MuiLink component={RouterLink} to="/login" color="primary">
                                  {"Login"}
                              </MuiLink>
                          </Typography>
                      </Grid>
                  </Grid>
              </Box>
          </Box>
      </Container>
    );
};

export default RegisterForm;
