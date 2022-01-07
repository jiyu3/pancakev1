import { darkColors, lightColors } from "../../theme/colors";

export type AlertTheme = {
  background: string;
};

export const light: AlertTheme = {
  background: lightColors.card,
};

export const dark: AlertTheme = {
  background: darkColors.card,
};