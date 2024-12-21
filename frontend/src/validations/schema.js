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
export const registerationSchema = yup
    .object({
        username: yup.string().required().min(5),
        name: yup.string().required().min(5),
        email: yup.string().required().email().min(5),
        password: yup.string().required().min(5),
        password_confirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
        agree_terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    }).required()
