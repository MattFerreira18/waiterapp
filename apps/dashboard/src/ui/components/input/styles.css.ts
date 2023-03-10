import { style, styleVariants } from "@vanilla-extract/css";

import theme from "@/ui/styles/theme.css";

export const labelText = style({
  fontSize: 14,
});

const inputWrapperBase = style({
  padding: 16,
  marginTop: 8,
  display: "flex",
  alignItems: "center",
  border: `1px solid ${theme.color.gray[300]}`,
  borderRadius: 8,
  transition: "250ms",

  selectors: {
    "&:focus-within": {
      borderColor: theme.color.gray[500],
    },
  },
});

export const inputWrapperVariants = styleVariants({
  default: [inputWrapperBase, {}],
  error: [
    inputWrapperBase,
    {
      border: `1px solid ${theme.color.red[400]}`,

      selectors: {
        "&:focus-within": {
          borderColor: theme.color.red[400],
        },
      },
    },
  ],
});

const inputBase = style({
  border: 0,
  width: "100%",
  background: "none",
  outline: "none",
  fontSize: 14,
});

export const inputVariants = styleVariants({
  default: [inputBase, {}],
  error: [
    inputBase,
    {
      color: theme.color.red[400],

      "::placeholder": {
        color: theme.color.red[400],
      },
    },
  ],
});

const messageWrapperBase = style({
  fontSize: 14,
  marginBottom: 8,
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginTop: 8,
});

export const messageWrapperVariants = styleVariants({
  default: [messageWrapperBase, {}],
  error: [
    messageWrapperBase,
    {
      color: theme.color.red[400],
    },
  ],
});

export const eyeButton = style({
  display: "flex",
  alignItems: "center",
});

export const iconError = style({
  stroke: theme.color.red[400],
});
