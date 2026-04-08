import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "../pages/Auth/LoginPage"
import DashboardPage from "../pages/Dashboard/DashboardPage"
import PrivateRoute from "./PrivateRoute"
import RegisterPage from "../pages/Auth/RegisterPage"

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage/>
                        </PrivateRoute>
                    }
                /> 
            </Routes>
        </BrowserRouter>
    )
}