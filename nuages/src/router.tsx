import {
    createBrowserRouter
} from "react-router-dom";
import Layout from "./components/layout";

// import Home
import Home from "./pages/home";
import PendingReviewsPage from "./pages/pendingReviewsPage";

import { PharmaciesContextProvider } from './contexts/pharmaciesContext';
import { PharmaciesReviewContextProvider } from "./contexts/pharmaciesReviewContext";
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
                element: <Home />
            },
            {
                path: "/pharmacies",
                element:
                    <PharmaciesContextProvider>
                        <PharmaciesPage />
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
