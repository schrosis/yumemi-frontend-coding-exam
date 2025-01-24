import { style } from "@vanilla-extract/css";

export const label = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
});

export const checked = style({
  color: "skyblue",
  fontSize: "1rem",
});

export const unchecked = style({
  fontSize: "1rem",
  color: "gray",
});
