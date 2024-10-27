import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth";

function App() {
  const { setUser, setToken } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user){
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, [setUser, setToken]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
