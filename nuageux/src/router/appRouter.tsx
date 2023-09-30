import {
    createBrowserRouter
} from "react-router-dom";
import RouterDef from "./routerDef";








const appRouter = createBrowserRouter([
    {
        path: "*",
        element: <RouterDef />,
    },
]);


export default appRouter