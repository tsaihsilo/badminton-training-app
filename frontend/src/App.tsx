import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoute }  from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";

import { SignupForm } from './features/auth/pages/SignupForm';
import { LoginForm } from './features/auth/pages/LoginForm';
import { AssignedDrillsPage } from "./features/student/AssignedDrillsPage";

import { StudentAppLayout } from "./layouts/StudentAppLayout";
import { InstructorAppLayout } from "./layouts/InstructorAppLayout";
import { AssignDrillsPage } from "./features/instructor/AssignDrillsPage";
import { DemoVideosPage } from "./features/instructor/DemoVideosPage";
import { MessagesPage } from "./features/messages/MessagesPage";
import { AppIndexRedirect } from "./routes/AppIndexRedirect";


export const App = () => {
  return (
    <Routes>
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
            <Route index element={<Navigate to="/app/instructor/demo-videos" replace />} />
            <Route path="demo-videos" element={<DemoVideosPage />} />
            <Route path="assign-drills" element={<AssignDrillsPage />}/>
            <Route path="messages" element={<MessagesPage />}/>
          </Route>
          {/* Student */}
          <Route path="student" element={<StudentAppLayout />}>
            <Route index element={<Navigate to="/app/student/assigned-drills" replace />} />
            <Route path="assigned-drills" element={<AssignedDrillsPage />}/>
            <Route path="messages" element={<MessagesPage />}/>
          </Route>
      </Route>
    </Routes>
  );
};