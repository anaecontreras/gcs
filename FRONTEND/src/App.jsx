import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'
import Start from './pages/Start';
import Dashboard from './pages/Dashboard';
import Acerca from './pages/Acerca';
import Blog from './pages/Blog';
import Calendario from './pages/Calendario';
import Doc from './pages/Doc';
import Foro from './pages/Foro';
import Logs from './pages/Logs';
import Usuarios from './pages/Usuarios';
import Reporte1 from './report/Reporte1';
import Reporte2 from './report/Reporte2';
import Reporte3 from './report/Reporte3';
import Reporte4 from './report/Reporte4';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null); // Nuevo estado para el usuario
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      {/* Ruta Inicial que conduce a Start (que es el login) */}
      <Routes>
        <Route
          path='/'
          element={<Start setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} setToken={setToken} />}
        />

        {/* Rutas protegidas, si no esta autenticado, se le redirige a "/" */}
        <Route
          path='/Dashboard'
          element={
            isAuthenticated ? (
              <Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} setToken={setToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Acerca'
          element={
            isAuthenticated ? (
              <Acerca isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Blog'
          element={
            isAuthenticated ? (
              <Blog isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Calendario'
          element={
            isAuthenticated ? (
              <Calendario isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Doc'
          element={
            isAuthenticated ? (
              <Doc isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Foro'
          element={
            isAuthenticated ? (
              <Foro isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Logs'
          element={
            isAuthenticated ? (
              <Logs isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Usuarios'
          element={
            isAuthenticated ? (
              <Usuarios isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Reporte1'
          element={
            isAuthenticated ? (
              <Reporte1 isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Reporte2'
          element={
            isAuthenticated ? (
              <Reporte2 isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Reporte3'
          element={
            isAuthenticated ? (
              <Reporte3 isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path='/Reporte4'
          element={
            isAuthenticated ? (
              <Reporte4 isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} token={token} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
