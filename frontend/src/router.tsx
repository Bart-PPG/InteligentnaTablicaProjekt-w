import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProjectsList from "./pages/ProjectsList";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";

export default function AppRouter() {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<ProjectsList />} />
  <Route path="/projects/:id" element={<ProjectDetails />} />
  <Route path="/projects/:id/tasks/:taskId" element={<TaskDetails />} />
</Routes>
    </BrowserRouter>
  );
}
