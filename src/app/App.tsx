import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { ToggleColorMode } from "./components/ToggleColorMode";
// import { ChakraProvider } from "@chakra-ui/react";
// import theme from "./theme";

function App() {
  return (
    <>
      <ToggleColorMode />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
