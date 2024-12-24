import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UserService from '../services/UserService.js';
import { updateProfileSchema } from '../validations/schema.js'
import { useAuthContext } from '../contexts/AuthContext.jsx' // Assuming you add the update method here

const UserProfileUpdate = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useAuthContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  const onSubmit = async (data) => {
    setError(null);
    setSuccess(null);

    try {
      await UserService.updateProfile(data);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  // Populate the form with the current user data
  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.name);
      setValue('email', currentUser.email);
    }
  }, [currentUser, setValue]);


  return (
    <Box >
      <Typography variant="h5"  sx={{ mb: 5 }}>
        Update Profile
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Name"
          name="name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirm Password"
          name="password_confirmation"
          type="password"
          {...register('password_confirmation')}
          error={!!errors.password_confirmation}
          helperText={errors.password_confirmation?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfileUpdate;
