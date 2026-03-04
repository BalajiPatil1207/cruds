import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../component/layouts/DashboardLayout";

/* 🔹 User Pages */
import UserIndex from "../component/pages/userPages/UserIndex";
import UserCreate from "../component/pages/userPages/UserCreate";
import UserEdit from "../component/pages/userPages/UserEdit";
import UserShow from "../component/pages/userPages/UserShow";

/* 🔹 Student Pages */
import StudLayout from "../component/layouts/StudLayout";
import StudIndex from "../component/pages/studPages/StudIndex";
import StudCreate from "../component/pages/studPages/StudCreate";
import StudEdit from "../component/pages/studPages/StudEdit";
import StudShow from "../component/pages/studPages/StudShow";
import ProductIndex from "../component/pages/productPage/ProductIndex";
import ProductCreate from "../component/pages/productPage/ProductCreate";
import ProductEdit from "../component/pages/productPage/ProductEdit";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/users" />} />

      {/* Dashboard Layout Wrapper */}
      <Route path="/" element={<DashboardLayout />}>

        {/* ================= USERS ================= */}
        <Route path="users" element={<StudLayout />}>
          <Route index element={<UserIndex />} />
          <Route path="create" element={<UserCreate />} />
          <Route path="edit/:id" element={<UserEdit />} />
          <Route path="show/:id" element={<UserShow />} />
        </Route>

        {/* ================= STUDENTS ================= */}
        <Route path="studs" element={<StudLayout />}>
          <Route index element={<StudIndex />} />
          <Route path="create" element={<StudCreate />} />
          <Route path="edit/:id" element={<StudEdit />} />
          <Route path="show/:id" element={<StudShow />} />
        </Route>

        {/* ================= PRODUCTS ================= */}
        <Route path="product" element={<StudLayout />}>
          <Route index element={<ProductIndex />} />
          <Route path="create" element={<ProductCreate />} />
          <Route path="edit/:id" element={<ProductEdit />} />
        </Route>

        {/* Future CRUD */}
        <Route path="orders" element={<h2>Orders CRUD</h2>} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;