import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../component/layouts/DashboardLayout";
import UserRoutes from "./UserRoutes";
import StudRoutes from "./StudRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" />} />

      <Route path="/" element={<DashboardLayout />}>

        <Route path="users/*" element={<UserRoutes />} />
        <Route path="studs/*" element={<StudRoutes />} />

        {/* Future CRUD */}
        <Route path="categories" element={<h2>Categories CRUD</h2>} />
        <Route path="orders" element={<h2>Orders CRUD</h2>} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;