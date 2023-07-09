import {
    Navigate,
    Route,
    Routes,
    createBrowserRouter,
} from "react-router-dom";

// import Home
import PendingReviewsPage from "./pages/pendingReviewsPage";

import { useContext } from "react";
import Layout from "./components/layout";
import { EditModalContextProvider } from "./contexts/EditModalContext";
import { EditPendingModalContextProvider } from "./contexts/EditPendingModalContext";
import { DashboardContextProvider } from "./contexts/dashboardContext";
import { PharmaciesContextProvider } from "./contexts/pharmaciesContext";
import { PharmaciesReviewContextProvider } from "./contexts/pharmaciesReviewContext";
import { UserAuthContext, UserAuthContextInterface } from "./contexts/userAuthContext";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/loginPage";
import PharmaciesPage from "./pages/pharmaciesPage";



// Path : 
// - Home
// - Pharmacies
// - Pending Reviews


const RootRouting = () => {

    const { isAuthenticated } = useContext(UserAuthContext) as UserAuthContextInterface

    console.log("isAuthenticated", isAuthenticated)

    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" />} />

                {/* redirect to login */}


            </Routes>
        )
    }

    return (
        <Routes>

            <Route path="/" element={<Layout />}>
                <Route index element={<DashboardContextProvider>
                    <Dashboard />
                </DashboardContextProvider>} />
                <Route path="/dashboard" element={<DashboardContextProvider>
                    <Dashboard />
                </DashboardContextProvider>} />
                <Route path="/pharmacies" element={<PharmaciesContextProvider>
                    <EditModalContextProvider>
                        <PharmaciesPage />
                    </EditModalContextProvider>

                </PharmaciesContextProvider>} />
                <Route path="/pending-reviews" element={<PharmaciesReviewContextProvider>
                    <EditPendingModalContextProvider>
                        <PendingReviewsPage />
                    </EditPendingModalContextProvider>
                </PharmaciesReviewContextProvider>} />
            </Route>
        </Routes>
    )
}


const appRouting = createBrowserRouter([
    {
        path: "*",
        element: <RootRouting />,
    }
])



// const appRouting = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout />,
//         // loader: () => {
//         //     if (1) {
//         //         console.log("Redirecting to login page")
//         //         return redirect("/login");
//         //     }
//         // },


//         children: [

//             {
//                 path: "/dashboard",

//                 element: <DashboardContextProvider>
//                     <Dashboard />
//                 </DashboardContextProvider>
//             },
//             {
//                 path: "/pharmacies",
//                 element:
//                     <PharmaciesContextProvider>
//                         <EditModalContextProvider>
//                             <PharmaciesPage />
//                         </EditModalContextProvider>

//                     </PharmaciesContextProvider>

//             },
//             {
//                 path: "/pending-reviews",
//                 element:
//                     <PharmaciesReviewContextProvider>
//                         <EditPendingModalContextProvider>
//                             <PendingReviewsPage />
//                         </EditPendingModalContextProvider>
//                     </PharmaciesReviewContextProvider>,
//             }

//         ]
//     },
//     {
//         path: "/login",
//         element: <LoginPage />
//     }



// ]);


export default appRouting;
