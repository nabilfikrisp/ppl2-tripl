import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "992px",
  xl: "1280px",
  "2xl": "1536px",
};

const colors = {
  tripl: {
    light: "#f4f4f4",
    "light-200": "#ebedec",
    "green-100": "#d5edc4",
    "green-200": "#c2e0ac",
    "green-300": "#64ad5a",
    "green-400": "#46af4e",
    "green-500": "#1a4236",
    dark: "#002c1f",
    white : "#ffffff",
  },
  "tripl-new": {
    light: "#EAEAEA",
    orange: "#DD6E42",
    cream: "#E8DAB2",
    "gray-200": "#4F6D7A",
    "gray-100": "#C0D6DF",
    "gray-300": "#162521",
    black: "#3C474B",
  },
};

const theme = extendTheme({
  colors,
  breakpoints,
  fonts: {
    heading: `'Outfit', roboto`,
    body: `'Inter', roboto`,
  },
});

export default theme;
