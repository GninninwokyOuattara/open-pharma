import Dashboard from "@/pages/dashboard"
import Pharmacies from "@/pages/pharmacies"
import Reviews from "@/pages/reviews"
import { Navigate, Route, Routes } from "react-router-dom"



const RouterDef = () => {


    return (
        <Routes>


            <Route path="/" element={<Navigate to="/reviews" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pharmacies" element={<Pharmacies />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/*" element={<p>Page Not Found</p>} />
        </Routes>
    )
}

export default RouterDef