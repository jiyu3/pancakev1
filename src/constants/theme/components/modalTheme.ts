
import { darkColors, lightColors } from "../../theme/colors";

export interface ModalTheme {
  background: string;
}

export type Handler = () => void;

export interface InjectedProps {
onDismiss?: Handler;
}

export const light: ModalTheme = {
  background: lightColors.card,
};

export const dark: ModalTheme = {
  background: darkColors.card,
};