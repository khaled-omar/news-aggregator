import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Enter a valid email"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const updateProfileSchema =  yup.object().shape({
  name: yup.string().required('Name is required').max(255, 'Name cannot exceed 255 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});


export const userPreferencesSchema = (newsSourceOptions) => {
  return yup.object().shape({
    news_sources: yup
      .array()
      .of(yup.string().oneOf(newsSourceOptions.map((option) => option.value))),
  });
}
