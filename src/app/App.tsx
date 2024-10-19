import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
// import { ChakraProvider } from "@chakra-ui/react";
// import theme from "./theme";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
