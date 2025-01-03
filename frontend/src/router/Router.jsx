import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import RegistrationPage from "../components/RegistrationPage";
import LoginPage from "../components/LoginPage";
import MobileDashboard from "../components/MobileDashboard";
import NewTransactionPage from "../components/NewTransactionPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },

    {
        path: "/registration",
        element: <RegistrationPage />,
    },

    {
        path: "/login",
        element: <LoginPage />,
    },

    {
        path: "/dashboard",
        element: <MobileDashboard />,
    },

    {
        path: "/newTransection",
        element: <NewTransactionPage />,
    },


])

export default router;