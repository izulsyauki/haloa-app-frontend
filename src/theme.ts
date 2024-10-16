import { extendTheme } from "@chakra-ui/react";
import "@fontsource/plus-jakarta-sans";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/700.css";

const theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  fonts: {
    heading: `'Plus Jakarta Sans', sans-serif`,
    body: `'Plus Jakarta Sans', sans-serif`,
  },
  styles: {
    global: {
      body: {
        margin: 0,
      }
    }
  }
};

export default extendTheme(theme);
