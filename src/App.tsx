import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from '@components/header/header';
import Sidebar from '@components/sidebar/sidebar';
import DashboardPage from '@components/dashboard/DashboardPage';
import Planning from '@components/planning/planning';
import CreativeStudio from '@components/creativeStudio/creativeStudio';
import WorkflowCenter from '@components/workflowCenter/workflowCenter';
import Scheduler from '@components/scheduler/scheduler';
import LoginPage from '@components/login/LoginPage';
import ProtectedRoute from './routes/ProtectedRoutes';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ForbiddenPage from './pages/ForbiddenPage';

// Layout wrapper component to conditionally render header and sidebar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">
      {!isLoginPage && <Header />}
      {!isLoginPage && <Sidebar />}
      {children}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/planning" element={<Planning />} />
          <Route path="/creativeStudio" element={<CreativeStudio />} />
          <Route path="/workflowCenter" element={<WorkflowCenter />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
