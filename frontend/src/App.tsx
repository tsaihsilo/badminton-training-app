import { Navigate, Route, Routes } from "react-router-dom";

import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AppIndexRedirect } from "./routes/AppIndexRedirect";

import { SignupForm } from "./features/auth/SignupForm";
import { LoginForm } from "./features/auth/LoginForm";

import { InstructorAppLayout } from "./layouts/InstructorAppLayout";
import { StudentAppLayout } from "./layouts/StudentAppLayout";

import { ManageStudents } from "./features/instructor/ManageStudentsPage";
import { TutorialVideosPage } from "./features/instructor/TutorialVideosPage";
import { AssignDrillsPage } from "./features/instructor/AssignDrillsPage";

import { AssignedDrillsPage } from "./features/student/AssignedDrillsPage";

import { MessagesPage } from "./features/messages/MessagesPage";

export const App = () => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route index element={<Navigate to="/auth/signup" replace />} />

      {/* Public */}
      <Route path="auth" element={<PublicRoute />}>
        <Route index element={<Navigate to="/auth/signup" replace />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="login" element={<LoginForm />} />
      </Route>

      {/* Private */}
      <Route path="app" element={<PrivateRoute />}>
        <Route index element={<AppIndexRedirect />} />

        {/* Instructor */}
        <Route path="instructor" element={<InstructorAppLayout />}>
          <Route index element={<Navigate to="manage-students" replace />} />
          <Route path="manage-students" element={<ManageStudents />} />
          <Route path="tutorial-videos" element={<TutorialVideosPage />} />
          <Route path="assign-drills" element={<AssignDrillsPage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>

        {/* Student */}
        <Route path="student" element={<StudentAppLayout />}>
          <Route index element={<Navigate to="assigned-drills" replace />} />
          <Route path="assigned-drills" element={<AssignedDrillsPage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
