import {
    createBrowserRouter, redirect
} from "react-router-dom";
import Layout from "./components/layout";

// import Home
import PendingReviewsPage from "./pages/pendingReviewsPage";

import { EditModalContextProvider } from "./contexts/EditModalContext";
import { EditPendingModalContextProvider } from "./contexts/EditPendingModalContext";
import { DashboardContextProvider } from "./contexts/dashboardContext";
import { PharmaciesContextProvider } from './contexts/pharmaciesContext';
import { PharmaciesReviewContextProvider } from "./contexts/pharmaciesReviewContext";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/loginPage";
import PharmaciesPage from "./pages/pharmaciesPage";



// Path : 
// - Home
// - Pharmacies
// - Pending Reviews

const appRouting = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: () => {
            if (1) {
                console.log("Redirecting to login page")
                return redirect("/login");
            }
        },


        children: [

            {
                path: "/dashboard",

                element: <DashboardContextProvider>
                    <Dashboard />
                </DashboardContextProvider>
            },
            {
                path: "/pharmacies",
                element:
                    <PharmaciesContextProvider>
                        <EditModalContextProvider>
                            <PharmaciesPage />
                        </EditModalContextProvider>

                    </PharmaciesContextProvider>

            },
            {
                path: "/pending-reviews",
                element:
                    <PharmaciesReviewContextProvider>
                        <EditPendingModalContextProvider>
                            <PendingReviewsPage />
                        </EditPendingModalContextProvider>
                    </PharmaciesReviewContextProvider>,
            }

        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    }



]);


export default appRouting;
