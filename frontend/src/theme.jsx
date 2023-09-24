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
