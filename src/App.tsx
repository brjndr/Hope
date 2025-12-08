import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from '@components/login/LoginPage';
// import ProtectedRoute from './routes/ProtectedRoutes';
import Homepage from '@components/homepage/homepage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ForbiddenPage from './pages/ForbiddenPage';

function App() {
  const isAuthenticated = true; // Replace with actual authentication logic
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />

          {/* replace this auth check with below code  */}

          {isAuthenticated ? (
            <Route path="/*" element={<Homepage />} />
          ) : (
            <Route path="/*" element={<Navigate to="/login" replace />} />
          )}

          {/* <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Homepage />} />
          </Route> */}

        </Routes>
    </BrowserRouter>
  );
}

export default App;
