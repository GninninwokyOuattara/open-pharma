import {
    createBrowserRouter
} from "react-router-dom";
import Layout from "./components/layout";

// import Home
import Home from "./components/home";

import PharmaciesPage from "./components/pages/pharmaciesPage";


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
                element: <div>Pending Reviews</div>,
            },
        ]
    },



]);


export default appRouting;
