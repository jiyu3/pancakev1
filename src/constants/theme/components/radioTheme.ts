import { darkColors, lightColors } from "../../theme/colors";

export type RadioTheme = {
    handleBackground: string;
};

export const light: RadioTheme = {
  handleBackground: lightColors.card,
};

export const dark: RadioTheme = {
  handleBackground: darkColors.card,
};