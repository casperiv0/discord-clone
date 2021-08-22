import * as yup from "yup";

export const channelSchema = {
  name: yup.string().required(),
  type: yup
    .string()
    .required()
    .matches(/GUILD_TEXT|GUILD_CATEGORY/),
};
