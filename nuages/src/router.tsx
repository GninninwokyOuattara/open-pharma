import {
    createBrowserRouter
} from "react-router-dom";
import Layout from "./components/layout";

// import Home
import PendingReviewsPage from "./pages/pendingReviewsPage";

import { EditModalContextProvider } from "./contexts/EditModalContext";
import { DashboardContextProvider } from "./contexts/dashboardContext";
import { PharmaciesContextProvider } from './contexts/pharmaciesContext';
import { PharmaciesReviewContextProvider } from "./contexts/pharmaciesReviewContext";
import Dashboard from "./pages/dashboard";
import PharmaciesPage from "./pages/pharmaciesPage";



// Path : 
// - Home
// - Pharmacies
// - Pending Reviews

const appRouting = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,

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
                        <PendingReviewsPage />
                    </PharmaciesReviewContextProvider>,
            },
        ]
    },



]);


export default appRouting;
