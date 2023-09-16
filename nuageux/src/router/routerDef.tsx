import { useAuth } from "@/contexts/auth"
import { PharmacyDialogProvider } from "@/contexts/pharmacyDialogContext"
import Dashboard from "@/pages/dashboard"
import Login from "@/pages/login"
import Pharmacies from "@/pages/pharmacies"
import Reviews from "@/pages/reviews"
import { Navigate, Route, Routes } from "react-router-dom"



const RouterDef = () => {

    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        // return <Navigate to="/login" />
        return (
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Login />} />
            </Routes>

        )
    }


    return (
        <Routes>


            <Route path="/" element={<Navigate to="/reviews" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pharmacies" element={
                <PharmacyDialogProvider>
                    <Pharmacies />

                </PharmacyDialogProvider>
            } />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/login" element={<Navigate to="/dashboard" />} />

            <Route path="/*" element={<p>Page Not Found</p>} />
        </Routes>
    )
}

export default RouterDef