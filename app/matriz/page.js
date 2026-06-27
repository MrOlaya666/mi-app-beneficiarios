// app/matriz/page.js
'use client';
import { useState, useEffect } from 'react';

export default function Matriz() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const fetchRegistros = async () => {
    setLoading(true);
    const res = await fetch('/api/matriz');
    const data = await res.json();
    setRegistros(data);
    setLoading(false);
  };

  useEffect(() => { fetchRegistros(); }, []);

  const borrar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este registro?')) return;
    const res = await fetch(`/api/matriz/${id}`, { method: 'DELETE' });
    const data = await res.json();
    setMensaje(data.message || data.error);
    fetchRegistros();
    setTimeout(() => setMensaje(''), 3000);
  };

  const filtrados = registros.filter(r =>
    r.Localidad?.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.Nombre_IES?.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.Convocatoria?.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.Sexo?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#1a237e', margin: 0 }}>📊 Matriz de Beneficiarios</h1>
        <a href="/matriz/nuevo" style={btnStyle('#2e7d32')}>
          + Nuevo Registro
        </a>
      </div>

      <input
        type="text"
        placeholder="🔍 Buscar por localidad, universidad, convocatoria o sexo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '16px', fontSize: '14px', boxSizing: 'border-box' }}
      />

      {mensaje && (
        <div style={{ padding: '12px', backgroundColor: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '6px', marginBottom: '16px', color: '#2e7d32' }}>
          {mensaje}
        </div>
      )}

      {loading ? <p>Cargando registros...</p> : (
        <>
          <p style={{ color: '#666', marginBottom: '12px' }}>
            Mostrando <strong>{filtrados.length}</strong> de <strong>{registros.length}</strong> registros
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={tablaStyle}>
              <thead>
                <tr style={{ backgroundColor: '#1a237e', color: 'white' }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Convocatoria</th>
                  <th style={thStyle}>Localidad</th>
                  <th style={thStyle}>Universidad</th>
                  <th style={thStyle}>Núcleo</th>
                  <th style={thStyle}>Modalidad</th>
                  <th style={thStyle}>Sexo</th>
                  <th style={thStyle}>Edad</th>
                  <th style={thStyle}>Sisben</th>
                  <th style={thStyle}>Víctima</th>
                  <th style={thStyle}>Beneficiarios</th>
                  <th style={thStyle}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((r, i) => (
                  <tr key={r.Id} style={{ backgroundColor: i % 2 === 0 ? '#f5f7ff' : 'white' }}>
                    <td style={tdStyle}>{r.Id}</td>
                    <td style={tdStyle}>
                      <span style={badgeStyle('#1a237e')}>{r.Convocatoria}</span>
                    </td>
                    <td style={tdStyle}>{r.Localidad}</td>
                    <td style={{ ...tdStyle, maxWidth: '200px', fontSize: '12px' }}>{r.Nombre_IES}</td>
                    <td style={{ ...tdStyle, maxWidth: '150px', fontSize: '12px' }}>{r.Nucleo}</td>
                    <td style={tdStyle}>{r.Modalidad}</td>
                    <td style={tdStyle}>
                      <span style={badgeStyle(r.Sexo === 'HOMBRE' ? '#1565c0' : '#880e4f')}>
                        {r.Sexo}
                      </span>
                    </td>
                    <td style={tdStyle}>{r.Edad}</td>
                    <td style={tdStyle}>
                      <span style={badgeStyle(
                        r.Grupo_Sisben === 'A - POBREZA EXTREMA' ? '#b71c1c' :
                        r.Grupo_Sisben === 'B - POBREZA MODERADA' ? '#e65100' :
                        r.Grupo_Sisben === 'C - VULNERABLE' ? '#f57f17' : '#2e7d32'
                      )}>
                        {r.Grupo_Sisben}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <span style={badgeStyle(r.Victima === 'SI' ? '#b71c1c' : '#2e7d32')}>
                        {r.Victima}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center', fontWeight: '600' }}>
                      {r.Beneficiarios_Programa}
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => borrar(r.Id)} style={btnStyle('#c62828')}>
                        🗑️ Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

const tablaStyle = { width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' };
const thStyle = { padding: '12px 14px', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' };
const tdStyle = { padding: '10px 14px', borderBottom: '1px solid #e0e0e0', fontSize: '13px' };
const badgeStyle = (color) => ({
  backgroundColor: color, color: 'white',
  padding: '3px 8px', borderRadius: '10px',
  fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap'
});
const btnStyle = (color) => ({
  display: 'inline-block', padding: '6px 12px', backgroundColor: color,
  color: 'white', borderRadius: '4px', textDecoration: 'none',
  border: 'none', cursor: 'pointer', fontSize: '12px'
});