import { Routes, Route } from "react-router-dom";
import UserLayout from "../component/layouts/UserLayout";
import UserIndex from "../component/pages/userPages/UserIndex";
import UserCreate from "../component/pages/userPages/UserCreate";
import UserEdit from "../component/pages/userPages/UserEdit";
import UserShow from "../component/pages/userPages/UserShow";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<UserIndex />} />
        <Route path="create" element={<UserCreate />} />
        <Route path="edit/:id" element={<UserEdit />} />
        <Route path="show/:id" element={<UserShow />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;