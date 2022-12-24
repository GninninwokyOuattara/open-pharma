import {
    createBrowserRouter
} from "react-router-dom";
import Layout from "./components/layout";

// import Home
import Home from "./pages/home";

import PendingReviews from "./pages/pendingReviewsPage";
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
                path: "/",
                element: <Home />
            },
            {
                path: "/pharmacies",
                element: <PharmaciesPage />
            },
            {
                path: "/pending-reviews",
                element: <PendingReviews />,
            },
        ]
    },



]);


export default appRouting;
