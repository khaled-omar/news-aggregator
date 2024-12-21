import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Link,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from '../contexts/AuthContext.jsx'
import { loginSchema } from '../validations/schema.js'



const LoginForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, setError, formState: {errors, isSubmitting} } = useForm({resolver: yupResolver(loginSchema) });
  const {login} = useAuthContext()

  const onSubmit = async (data) => {
    try {
      await login({'email': data.email, 'password': data.password})
      // navigate('/')
    } catch (e) {
      setError('email', {
        type: 'manual',
        message: 'Invalid email or password',
      })
    }
  };


  return (
    <Container maxWidth="xs">
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
          Sign In
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
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={()=> setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            {isSubmitting ? 'Submitting ...' : 'Login'}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link href="#" color="primary.main">
                  {"Signup"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
