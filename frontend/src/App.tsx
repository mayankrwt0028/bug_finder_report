import { Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./routes/protectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

// import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import DeveloperDashboard from "./pages/developer/DeveloperDashboard";
import QADashboard from "./pages/qa/QADashboard";
import BugList from "./pages/bugs/BugList";
import BugDetails from "./pages/bugs/BugDetail";
import ProjectList from "./pages/projects/ProjectList";
import UserList from "./pages/users/UserList";
import CreateProject from "./pages/projects/CreateProject";
import CreateBug from "./pages/bugs/CreateBug";
import EditProject from "./pages/projects/EditProject";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/projects" element={<ProjectList />} />

          <Route path="/admin/bugs" element={<BugList />} />

          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/projects/create" element={<CreateProject />} />
          <Route path="/admin/bugs/:id" element={<BugDetails />} />
          <Route path="/admin/projects/:id" element={<EditProject />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["MANAGER"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />

          <Route path="/manager/projects" element={<ProjectList />} />

          <Route path="/manager/bugs" element={<BugList />} />

          <Route path="/manager/users" element={<UserList />} />
          <Route path="/manager/projects/create" element={<CreateProject />} />
          <Route path="/admin/bugs/:id" element={<BugDetails />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["DEVELOPER"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/developer/dashboard" element={<DeveloperDashboard />} />

          <Route path="/developer/projects" element={<ProjectList />} />

          <Route path="/developer/bugs" element={<BugList />} />
          <Route path="/developer/bugs/:id" element={<BugDetails />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["QA"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/qa/dashboard" element={<QADashboard />} />

          <Route path="/qa/projects" element={<ProjectList />} />

          <Route path="/qa/bugs" element={<BugList />} />

          <Route path="/qa/bugs/:id" element={<BugDetails />} />

          <Route path="/qa/bugs/create" element={<CreateBug />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
