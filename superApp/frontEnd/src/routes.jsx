import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import RolePage from "./pages/RolePage";
import UserPage from "./pages/UserPage";
import Api from "./pages/api";
import DashboardLayout from "./layouts/dashboard";
import PersistLogin from "./layouts/dashboard/auth/PersistLogin";
import RequireAuthLayout from "./layouts/dashboard/auth/RequireAuthLayout";



const Router = () => {
    return (
        <Routes>

            <Route path="/login" element={<LoginPage />} />

            <Route element={<PersistLogin />}>
                <Route path="/" element={ <RequireAuthLayout allowedRoles={[1,2]}/>}>  { /* kalau rolenya 1 atau 2 boleh akses */}
                    <Route index element={<Navigate to="app" />} />
                    <Route path='role' element={<RolePage />} />
                    <Route path='app' element={<UserPage />} />
                    <Route path='api' element={<Api />} />
                </Route>
            </Route>

            <Route path="/404" element={<Page404 />} />


        </Routes>


    )
}


export default Router