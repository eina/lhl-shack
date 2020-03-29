import { theme } from "@chakra-ui/core";
import "typeface-roboto";
import "typeface-nunito";
import "typeface-montserrat";

export const brandButton = {
  bg: 'brand',
  color: 'white',
  _hover: { bg: "indigo.800" },
  _focus:  { bg: "indigo.800" }
};

export default {
  ...theme,
  breakpoints: ["30em", "48em", "64em", "80em"],
  fonts: {
    ...theme.fonts,
    body: "Roboto, sans-serif",
    heading: "Montserrat, sans-serif",
    logo: "Nunito, display"
  },
  colors: {
    ...theme.colors,
    brand: "#7780e4",
    gray: {
      50: "#f9f9fa",
      100: "#eceeef",
      200: "#dee1e3",
      300: "#cfd3d7",
      400: "#bfc5c9",
      500: "#adb4b9",
      600: "#98a1a8",
      700: "#7f8b93",
      800: "#606e79",
      900: "#374047"
    },
    red: {
      50: "#fef8f9",
      100: "#fbe9eb",
      200: "#f8dadc",
      300: "#f4c8cc",
      400: "#f0b5ba",
      500: "#ec9ea5",
      600: "#e6838b",
      700: "#df5f6a",
      800: "#d2202f",
      900: "#85000b"
    },
    orange: {
      50: "#fdf9f5",
      100: "#f9ebe1",
      200: "#f5dccb",
      300: "#f0ccb3",
      400: "#eaba98",
      500: "#e4a679",
      600: "#dd8d54",
      700: "#d36d24",
      800: "#b54c00",
      900: "#6b2d00"
    },
    yellow: {
      50: "#fbfaec",
      100: "#f3efc4",
      200: "#eae398",
      300: "#e0d666",
      400: "#d5c72c",
      500: "#c5b500",
      600: "#b0a200",
      700: "#978b00",
      800: "#776e00",
      900: "#464000"
    },
    green: {
      50: "#f2fcf1",
      100: "#d6f6d3",
      200: "#b6efb1",
      300: "#90e788",
      400: "#61dd56",
      500: "#1fcf0f",
      600: "#0fb900",
      700: "#0d9f00",
      800: "#0b7e00",
      900: "#064a00"
    },
    teal: {
      50: "#f1fcf6",
      100: "#d2f6e1",
      200: "#afefc9",
      300: "#85e7ae",
      400: "#52dc8b",
      500: "#0ace5c",
      600: "#00b84d",
      700: "#009e42",
      800: "#007d34",
      900: "#004a1f"
    },
    blue: {
      50: "#f6fafd",
      100: "#e2eff9",
      200: "#cce4f5",
      300: "#b5d8f0",
      400: "#9bcaeb",
      500: "#7dbae5",
      600: "#5aa7de",
      700: "#2d8fd5",
      800: "#006fbe",
      900: "#004170"
    },
    cyan: {
      50: "#f0fcfb",
      100: "#cef5f2",
      200: "#a8eee8",
      300: "#7ae4dc",
      400: "#40d9cc",
      500: "#00c9b8",
      600: "#00b3a4",
      700: "#009a8d",
      800: "#007a70",
      900: "#004842"
    },
    // purple: {
    //   50: "#fbf8fe",
    //   100: "#f1ebfb",
    //   200: "#e8dcf8",
    //   300: "#ddccf5",
    //   400: "#d1baf1",
    //   500: "#c4a6ed",
    //   600: "#b48ee8",
    //   700: "#a172e3",
    //   800: "#864adb",
    //   900: "#4c00b8"
    // },
    pink: {
      50: "#fef8fb",
      100: "#fbe9f3",
      200: "#f7d8ea",
      300: "#f4c6e1",
      400: "#f0b2d6",
      500: "#eb9ac9",
      600: "#e57dba",
      700: "#dd57a5",
      800: "#cf0d7e",
      900: "#7f004a"
    },
    indigo: {
      50: "#f9f9fe",
      100: "#ebedfb",
      200: "#dddff8",
      300: "#cdd1f5",
      400: "#bcc0f2",
      500: "#a9aeee",
      600: "#929ae9",
      700: "#7780e4",
      800: "#5e65b4",
      900: "#373b6a"
    }
  }
};

// example theme object
// export default {
//   colors: {...},
//   fonts: {
//     body: "system-ui, sans-serif",
//     heading: "Georgia, serif",
//     mono: "Menlo, monospace",
//   },
//   fontSizes: {
//     xs: "12px",
//     sm: "14px",
//     md: "16px",
//     lg: "18px",
//     xl: "20px",
//     "2xl": "24px",
//     "3xl": "28px",
//     "4xl": "36px",
//     "5xl": "48px",
//     "6xl": "64px",
//   },
//   fontWeights: {
//     normal: 400,
//     medium: 500,
//     bold: 700,
//   },
//   lineHeights: {
//     normal: "normal",
//     none: "1",
//     shorter: "1.25",
//     short: "1.375",
//     base: "1.5",
//     tall: "1.625",
//     taller: "2",
//   },
//   letterSpacings: {
//     tighter: "-0.05em",
//     tight: "-0.025em",
//     normal: "0",
//     wide: "0.025em",
//     wider: "0.05em",
//     widest: "0.1em",
//   },
// };
