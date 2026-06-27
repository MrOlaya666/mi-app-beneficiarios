// app/localidades/page.js
'use client';
import { useState, useEffect } from 'react';

export default function Localidades() {
  const [localidades, setLocalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  const fetchLocalidades = async () => {
    setLoading(true);
    const res = await fetch('/api/localidades');
    const data = await res.json();
    setLocalidades(data);
    setLoading(false);
  };

  useEffect(() => { fetchLocalidades(); }, []);

  const borrar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta localidad?')) return;
    const res = await fetch(`/api/localidades/${id}`, { method: 'DELETE' });
    const data = await res.json();
    setMensaje(data.message || data.error);
    fetchLocalidades();
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#1a237e', margin: 0 }}>📍 Localidades</h1>
        <a href="/localidades/nuevo" style={btnStyle('#2e7d32')}>
          + Nueva Localidad
        </a>
      </div>

      {mensaje && (
        <div style={{ padding: '12px', backgroundColor: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '6px', marginBottom: '16px', color: '#2e7d32' }}>
          {mensaje}
        </div>
      )}

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table style={tablaStyle}>
          <thead>
            <tr style={{ backgroundColor: '#1a237e', color: 'white' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Código</th>
              <th style={thStyle}>Localidad</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {localidades.map((loc, i) => (
              <tr key={loc.Id_Localidad} style={{ backgroundColor: i % 2 === 0 ? '#f5f7ff' : 'white' }}>
                <td style={tdStyle}>{loc.Id_Localidad}</td>
                <td style={tdStyle}>{loc.Cod_Localidad}</td>
                <td style={tdStyle}>{loc.Localidad}</td>
                <td style={tdStyle}>
                  <a href={`/localidades/editar/${loc.Id_Localidad}`} style={btnStyle('#1565c0')}>
                    ✏️ Editar
                  </a>
                  <button onClick={() => borrar(loc.Id_Localidad)} style={btnStyle('#c62828')}>
                    🗑️ Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const tablaStyle = { width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' };
const thStyle = { padding: '14px 16px', textAlign: 'left', fontWeight: '600' };
const tdStyle = { padding: '12px 16px', borderBottom: '1px solid #e0e0e0' };
const btnStyle = (color) => ({
  display: 'inline-block', padding: '6px 12px', backgroundColor: color,
  color: 'white', borderRadius: '4px', textDecoration: 'none',
  border: 'none', cursor: 'pointer', fontSize: '13px', marginRight: '6px'
});