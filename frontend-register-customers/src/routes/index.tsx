import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { DashboardPage } from "../pages/DashboardPage"
import { ProtectRoutes } from "./ProtectRoutes"
import { RegisterPage } from "../pages/RegisterPage"

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectRoutes />}>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
        </Routes>
    )   
}