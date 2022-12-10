import {
    createBrowserRouter
} from "react-router-dom";
import Layout from "./components/layout";



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
                element: <div>Home</div>,
            },
            {
                path: "/pharmacies",
                element: <div>Pharmacies</div>,
            },
            {
                path: "/pending-reviews",
                element: <div>Pending Reviews</div>,
            },
        ]
    },



]);


export default appRouting;
