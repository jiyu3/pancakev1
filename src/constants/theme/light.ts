import { DefaultTheme } from "styled-components";
import { light as lightAlert } from "./components/alertTheme";
import { light as lightCard } from "./components/cardTheme";
import { light as lightRadio } from "./components/radioTheme";
import { light as lightToggle } from "./components/toggleTheme";
import { light as lightTooltip } from "./components/tooltipTheme";
import { light as lightNav } from "./components/menuTheme";
import { light as lightModal } from "./components/modalTheme";
import base from "./base";
import { lightColors } from "./colors";

const lightTheme: DefaultTheme = {
  ...base,
  isDark: false,
  alert: lightAlert,
  colors: lightColors, // @ts-ignore
  card: lightCard, // @ts-ignore
  toggle: lightToggle,
  nav: lightNav,
  modal: lightModal,
  radio: lightRadio,
  tooltip: lightTooltip,
};

export default lightTheme;

