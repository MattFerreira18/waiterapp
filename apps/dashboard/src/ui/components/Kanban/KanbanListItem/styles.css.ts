import { style } from "@vanilla-extract/css";
import theme from "../../../styles/theme.css";

export const container = style({
  background: theme.color.white,
  borderRadius: 4,
  border: "1px solid rgba(204, 204, 204, 0.4)",
  padding: "42px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const tableTitle = style({
  fontWeight: 500,
  marginBottom: 4,
});

export const counterDisplay = style({
  fontSize: 14,
});
