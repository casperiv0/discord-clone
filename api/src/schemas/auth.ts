import * as yup from "yup";

export const loginSchema = {
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
};

export const registerSchema = {
  ...loginSchema,
  name: yup.string().required(),
};

export const deleteAccountSchema = {
  password: yup.string().required().min(8),
};
