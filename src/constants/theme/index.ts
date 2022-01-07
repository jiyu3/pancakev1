import { AlertTheme } from "./components/alertTheme";
import { CardTheme } from "./components/cardTheme";
import { RadioTheme } from "./components/radioTheme";
import { ToggleTheme } from "./components/toggleTheme";
import { TooltipTheme } from "./components/tooltipTheme";
import { NavTheme } from "./components/menuTheme";
import { ModalTheme } from "./components/modalTheme";
import { Colors, Breakpoints, MediaQueries, Spacing, Shadows, Radii, ZIndices } from "./types";

export interface PancakeTheme {
  siteWidth: number;
  isDark: boolean;
  alert: AlertTheme;
  colors: Colors;
  card: CardTheme;
  nav: NavTheme;
  modal: ModalTheme;
  radio: RadioTheme;
  toggle: ToggleTheme;
  tooltip: TooltipTheme;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  spacing: Spacing;
  shadows: Shadows;
  radii: Radii;
  zIndices: ZIndices;
}

// export { default as dark } from "./dark";
export { default as light } from "./light";

export { lightColors } from "./colors";
export { darkColors } from "./colors";