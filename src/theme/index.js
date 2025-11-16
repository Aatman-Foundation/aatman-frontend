import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  body: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const colors = {
  brand: {
    50: "#e9f7fb",
    100: "#c8e8f3",
    200: "#a4d9eb",
    300: "#7dc9e3",
    400: "#53bada",
    500: "#38a1c1",
    600: "#2b8098",
    700: "#1f606f",
    800: "#134047",
    900: "#07201f",
  },
  accent: {
    50: "#ffe5f6",
    100: "#ffb8e3",
    200: "#ff8ad0",
    300: "#ff5dbc",
    400: "#ff2fa9",
    500: "#e5168f",
    600: "#b30f70",
    700: "#810a52",
    800: "#4f0433",
    900: "#200015",
  },
};

const radii = {
  xl: "1.5rem",
  "2xl": "2rem",
};

const styles = {
  global: {
    "html, body": {
      height: "100%",
      backgroundColor: "gray.50",
      color: "gray.800",
      scrollBehavior: "smooth",
    },
    body: {
      margin: 0,
      fontFamily: fonts.body,
      lineHeight: "1.6",
      backgroundColor: "gray.50",
    },
    "*::selection": {
      backgroundColor: "accent.100",
      color: "gray.900",
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: "semibold",
      borderRadius: "lg",
    },
    sizes: {
      xl: {
        h: 14,
        px: 10,
        fontSize: "lg",
      },
    },
    defaultProps: {
      colorScheme: "brand",
    },
  },
  Container: {
    baseStyle: {
      maxW: "7xl",
      px: { base: 4, md: 6 },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: "700",
      color: "gray.800",
      letterSpacing: "tight",
    },
  },
  Text: {
    baseStyle: {
      color: "gray.700",
    },
  },
  Link: {
    baseStyle: {
      fontWeight: "semibold",
      color: "brand.500",
      _hover: {
        color: "brand.600",
        textDecoration: "none",
      },
    },
  },
  Card: {
    baseStyle: {
      borderRadius: "2xl",
      boxShadow: "xl",
      bg: "white",
      overflow: "hidden",
    },
  },
};

const semanticTokens = {
  colors: {
    surface: {
      default: "white",
      _dark: "gray.800",
    },
    subtle: {
      default: "gray.100",
      _dark: "gray.700",
    },
  },
  shadows: {
    brand: "0 18px 40px -20px rgba(83, 172, 203, 0.45)",
  },
};

const theme = extendTheme({
  fonts,
  colors,
  radii,
  styles,
  components,
  semanticTokens,
});

export default theme;
