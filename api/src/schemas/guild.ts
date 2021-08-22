import * as yup from "yup";

export const createGuildSchema = {
  name: yup.string().required(),
};
