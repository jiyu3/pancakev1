import { darkColors, lightColors } from "../colors";

export interface NavTheme {
    background: string;
    hover: string;
  }
export const light: NavTheme = {
  background: lightColors.card,
  hover: "#EEEAF4",
};

export const dark: NavTheme = {
  background: darkColors.card,
  hover: "#473d5d",
};