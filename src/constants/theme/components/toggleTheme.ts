import { darkColors, lightColors } from "../colors";

export type ToggleTheme = {
    handleBackground: string;
};

export const light: ToggleTheme = {
  handleBackground: lightColors.card,
};

export const dark: ToggleTheme = {
  handleBackground: darkColors.card,
};