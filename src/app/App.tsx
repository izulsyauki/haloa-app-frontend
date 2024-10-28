import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth";
import Cookies from "js-cookie";
function App() {
  const { setUser, setToken } = useAuthStore();

  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");

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
