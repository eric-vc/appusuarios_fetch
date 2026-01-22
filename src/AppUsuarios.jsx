import { useState, useEffect } from 'react';
import './AppUsuarios.css';
function AppUsuarios() {
const [usuarios, setUsuarios] = useState([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);
  // Función para obtener usuarios
  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      setError(null);
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      // Validar respuesta
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status}`
        );
      }
      const datos = await response.json();
      // Validar datos
      if (!Array.isArray(datos)) {
        throw new Error('Formato de datos inválido');
      }
      setUsuarios(datos);
    } catch (err) {
      setError(
        err.message || 'Error desconocido al obtener usuarios'
      );
      setUsuarios([]);
    } finally {
      setCargando(false);
    }
  };
  // Ejecutar al montar
  useEffect(() => {
    obtenerUsuarios();
  }, []);
  // Renderizado
  return (
    <div className="app-usuarios">
      <h1> Gestor de Usuarios</h1>
      {/* Botones de acción */}
      <div className="acciones">
        <button
          onClick={obtenerUsuarios}
          disabled={cargando}
          className="btn-recargar"
        >
          {cargando ? ' Cargando...' : ' Recargar'}
        </button>
        <span className="contador">
          Total: {usuarios.length} usuarios
        </span>
      </div>
      {/* Estado de carga */}
      {cargando && !error && (
        <div className="loading">
          <p> Cargando usuarios...</p>
        </div>
      )}
      {/* Estado de error */}
      {error && (
        <div className="error">
          <p> {error}</p>
          <button onClick={obtenerUsuarios}>Reintentar</button>
        </div>
      )}
      {/* Tabla de usuarios */}
      {!cargando && !error && usuarios.length > 0 && (
        <div className="tabla-container">
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Sitio Web</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.name}</td>
                  <td>
                    <a href={`mailto:${usuario.email}`}>
                      {usuario.email}
                    </a>
                  </td>
                  <td>{usuario.phone}</td>
                  <td>
                    <a
                      href={`https://${usuario.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {usuario.website}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
{/* Sin datos */}
{!cargando && !error && usuarios.length === 0 && (
<div className="sin-datos">
<p>No hay usuarios para mostrar</p>
</div>
)}
</div>
);
}
export default AppUsuarios;