import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserService from "../services/UserService.js";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import userService from '../services/UserService.js'
import { userPreferencesSchema } from '../validations/schema.js'

const newsSourceOptions = [
  { label: "News API", value: "news_api" },
  { label: "New York Times", value: "ny_times" },
  { label: "Guardians", value: "guardian" },
];


const UserPreferences = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser, setCurrentUser } = useAuthContext();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(userPreferencesSchema(newsSourceOptions)),
    defaultValues: {
      news_sources: [],
    },
  });

  // Populate form with current preferences
  useEffect(() => {
    if (currentUser?.preferences?.news_sources) {
      reset({ news_sources: currentUser.preferences.news_sources });
    }
  }, [currentUser, reset]);

  const onSubmit = async (data) => {
    setError(null);
    setSuccess(null);
    try {
      await UserService.updatePreferences(data);
      const user = await userService.me();
      setCurrentUser(user);
      setSuccess("Preferences updated successfully!");
    } catch (err) {
      setError("Failed to update preferences. Please try again.");
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 5 }}>
        User Preferences
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Select Your Preferred News Sources:
          </Typography>
          {newsSourceOptions.map((option) => (
            <Controller
              key={option.value}
              name="news_sources"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value?.includes(option.value) || false}
                      onChange={(e) => {
                        const updatedValues = e.target.checked
                          ? [...(field.value || []), option.value]
                          : field.value.filter((item) => item !== option.value);
                        setValue("news_sources", updatedValues);
                      }}
                    />
                  }
                  label={option.label}
                />
              )}
            />
          ))}
          {errors.news_sources && (
            <Typography variant="body2" color="error">
              {errors.news_sources.message}
            </Typography>
          )}
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ width: '30%' }}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserPreferences;
