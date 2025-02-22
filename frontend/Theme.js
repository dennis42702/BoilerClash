import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4DA1A9", // Gold accent color
    primary_dark: "#2E5077",
    primary_super_light: "#79D7BE",
    background: "#FFFFFF", // White background
    surface: "#F5F5F5", // Light grey for surfaces
    text: "#000000", // Black text
    onSurface: "#000000", // Black text on surfaces
    accent: "#4DA1A9", // Additional gold accent
    placeholder: "#808080", // Grey for placeholders
    border: "#E0E0E0", // Light grey borders
    white: "#FFFFFF", // Pure white
    light_grey: "#F5F5F5", // Light grey
  },
};

export default theme;
