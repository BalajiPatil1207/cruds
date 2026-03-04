import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../component/layouts/DashboardLayout";
import StudLayout from "../component/layouts/StudLayout";

/* 🔹 User Pages */
import UserIndex from "../component/pages/userPages/UserIndex";
import UserCreate from "../component/pages/userPages/UserCreate";
import UserEdit from "../component/pages/userPages/UserEdit";
import UserShow from "../component/pages/userPages/UserShow";

/* 🔹 Student Pages */
import StudIndex from "../component/pages/studPages/StudIndex";
import StudCreate from "../component/pages/studPages/StudCreate";
import StudEdit from "../component/pages/studPages/StudEdit";
import StudShow from "../component/pages/studPages/StudShow";

/* 🔹 Product Pages */
import ProductIndex from "../component/pages/productPage/ProductIndex";
import ProductCreate from "../component/pages/productPage/ProductCreate";
import ProductEdit from "../component/pages/productPage/ProductEdit";

/* 🔹 Income Pages */
import IncomeIndex from "../component/pages/incomePage/IncomeIndex";
import IncomeCreate from "../component/pages/incomePage/IncomeCreate";
import IncomeEdit from "../component/pages/incomePage/IncomeEdit";

/* 🔹 Expense Pages */
import ExpenseIndex from "../component/pages/expensePage/ExpenseIndex";
import ExpenseCreate from "../component/pages/expensePage/ExpenseCreate";
import ExpenseEdit from "../component/pages/expensePage/ExpenseEdit";
import EmpIndex from "../component/pages/employee/EmpIndex";
import EmpCreate from "../component/pages/employee/EmpCreate";
import EmpEdit from "../component/pages/employee/EmpEdit";

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

        {/* ================= INCOMES ================= */}
        <Route path="income" element={<StudLayout />}>
          <Route index element={<IncomeIndex />} />
          <Route path="create" element={<IncomeCreate />} />
          <Route path="edit/:id" element={<IncomeEdit />} />
        </Route>

        {/* ================= EXPENSE ================= */}
        <Route path="expense" element={<StudLayout />}>
          <Route index element={<ExpenseIndex />} />
          <Route path="create" element={<ExpenseCreate />} />
          <Route path="edit/:id" element={<ExpenseEdit />} />
        </Route>

        {/* ================= Employee ================= */}
        <Route path="employee" element={<StudLayout />}>
          <Route index element={<EmpIndex />} />
          <Route path="create" element={<EmpCreate />} />
          <Route path="edit/:id" element={<EmpEdit />} />
        </Route>


      </Route>
    </Routes>
  );
};

export default AppRoutes;