import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Private from "./components/Private";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/dashboard",
        element: (
            <>
            <Private/>
              <Dashboard />
            </>),
    },
    {
        path: "/profile",
        element: (
            <>
            <Private/>
              <Profile />
            </>),
    },
])

export default router;