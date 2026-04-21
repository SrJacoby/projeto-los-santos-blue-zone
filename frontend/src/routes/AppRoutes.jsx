import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "../pages/Auth/LoginPage"
import DashboardPage from "../pages/Dashboard/DashboardPage"
import PrivateRoute from "./PrivateRoute"
import RegisterPage from "../pages/Auth/RegisterPage"
import VehiclesPage from "../pages/Vehicles/VehiclesPage"
import AddVehiclePage from "../pages/Vehicles/AddVehiclePage"

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

                <Route
                    path="/vehicles"
                    element={
                        <PrivateRoute>
                            <VehiclesPage/>
                        </PrivateRoute>
                    }
                /> 

                <Route
                    path="/vehicles/add"
                    element={
                        <PrivateRoute>
                            <AddVehiclePage/>
                        </PrivateRoute>
                    }
                /> 

                <Route
                    path="/vehicles/edit/:id"
                    element={
                        <PrivateRoute>
                            <AddVehiclePage/>
                        </PrivateRoute>
                    }
                /> 
            </Routes>
        </BrowserRouter>
    )
}