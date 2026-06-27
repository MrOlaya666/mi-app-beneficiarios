// app/universidades/page.js
'use client';
import { useState, useEffect } from 'react';

export default function Universidades() {
  const [universidades, setUniversidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const fetchUniversidades = async () => {
    setLoading(true);
    const res = await fetch('/api/universidades');
    const data = await res.json();
    setUniversidades(data);
    setLoading(false);
  };

  useEffect(() => { fetchUniversidades(); }, []);

  const borrar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta universidad?')) return;
    const res = await fetch(`/api/universidades/${id}`, { method: 'DELETE' });
    const data = await res.json();
    setMensaje(data.message || data.error);
    fetchUniversidades();
    setTimeout(() => setMensaje(''), 3000);
  };

  const filtradas = universidades.filter(u =>
    u.Nombre_IES.toLowerCase().includes(busqueda.toLowerCase()) ||
    String(u.Codigo_SNIES).includes(busqueda)
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#1a237e', margin: 0 }}>🏛️ Universidades</h1>
        <a href="/universidades/nuevo" style={btnStyle('#2e7d32')}>
          + Nueva Universidad
        </a>
      </div>

      <input
        type="text"
        placeholder="🔍 Buscar por nombre o código SNIES..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '16px', fontSize: '14px', boxSizing: 'border-box' }}
      />

      {mensaje && (
        <div style={{ padding: '12px', backgroundColor: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '6px', marginBottom: '16px', color: '#2e7d32' }}>
          {mensaje}
        </div>
      )}

      {loading ? <p>Cargando...</p> : (
        <>
          <p style={{ color: '#666', marginBottom: '12px' }}>
            Mostrando {filtradas.length} de {universidades.length} universidades
          </p>
          <table style={tablaStyle}>
            <thead>
              <tr style={{ backgroundColor: '#1a237e', color: 'white' }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Código SNIES</th>
                <th style={thStyle}>Nombre Institución</th>
                <th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((uni, i) => (
                <tr key={uni.Id_Universidades} style={{ backgroundColor: i % 2 === 0 ? '#f5f7ff' : 'white' }}>
                  <td style={tdStyle}>{uni.Id_Universidades}</td>
                  <td style={tdStyle}>{uni.Codigo_SNIES}</td>
                  <td style={tdStyle}>{uni.Nombre_IES}</td>
                  <td style={tdStyle}>
                    <a href={`/universidades/editar/${uni.Id_Universidades}`} style={btnStyle('#1565c0')}>
                      ✏️ Editar
                    </a>
                    <button onClick={() => borrar(uni.Id_Universidades)} style={btnStyle('#c62828')}>
                      🗑️ Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
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