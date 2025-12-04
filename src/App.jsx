import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/auth/AdminLogin';
import StudentLogin from './pages/auth/StudentLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import AttendanceManager from './pages/admin/AttendanceManager';
import Reports from './pages/admin/Reports';
import EventsManager from './pages/admin/EventsManager';
import StudentDashboard from './pages/student/StudentDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import StudentLayout from './layouts/StudentLayout';
import AuthLayout from './layouts/AuthLayout';
import './App.css';



const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />

    <Route element={<AuthLayout />}>
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/student" element={<StudentLogin />} />
    </Route>

    <Route element={<ProtectedRoute role="ADMIN" />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<StudentManagement />} />
        <Route path="/admin/attendance" element={<AttendanceManager />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/events" element={<EventsManager />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute role="STUDENT" redirectTo="/login/student" />}>
      <Route element={<StudentLayout />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
