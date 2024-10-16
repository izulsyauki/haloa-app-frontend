import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./app/App";
import theme from "./theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
    </ChakraProvider>
  </StrictMode>
);
