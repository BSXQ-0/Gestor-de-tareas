import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './interfaces/login';
import Register from './interfaces/register';
import Dashboard from './interfaces/dashboard';

function App() {
  return (
    <Router basename="/Gestor-de-tareas">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

