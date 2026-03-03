import { Routes, Route } from "react-router-dom";
import StudLayout from "../component/layouts/StudLayout";
import StudIndex from "../component/pages/studPages/StudIndex";
import StudCreate from "../component/pages/studPages/StudCreate";
import StudEdit from "../component/pages/studPages/StudEdit";
import StudShow from "../component/pages/studPages/StudShow";

const StudRoutes = () => {
  return (
    <Routes>
      <Route element={<StudLayout />}>
        <Route index element={<StudIndex />} />
        <Route path="studcreate" element={<StudCreate />} />
        <Route path="studedit/:id" element={<StudEdit />} />
        <Route path="studshow/:id" element={<StudShow />} />
      </Route>
    </Routes>
  );
};

export default StudRoutes;