// app/convocatorias/page.js
'use client';
import { useState, useEffect } from 'react';

export default function Convocatorias() {
  const [convocatorias, setConvocatorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/convocatorias')
      .then(res => res.json())
      .then(data => { setConvocatorias(data); setLoading(false); });
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a237e', marginBottom: '24px' }}>📋 Convocatorias</h1>

      {loading ? <p>Cargando...</p> : (
        <table style={tablaStyle}>
          <thead>
            <tr style={{ backgroundColor: '#1a237e', color: 'white' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Convocatoria</th>
              <th style={thStyle}>Total Beneficiarios</th>
            </tr>
          </thead>
          <tbody>
            {convocatorias.map((c, i) => (
              <tr key={c.Id_Convocatoria} style={{ backgroundColor: i % 2 === 0 ? '#f5f7ff' : 'white' }}>
                <td style={tdStyle}>{c.Id_Convocatoria}</td>
                <td style={tdStyle}>
                  <span style={{ fontWeight: '600', color: '#1a237e' }}>{c.Convocatoria}</span>
                </td>
                <td style={tdStyle}>
                  <span style={{
                    backgroundColor: c.Total_Beneficiarios > 0 ? '#e8f5e9' : '#fff3e0',
                    color: c.Total_Beneficiarios > 0 ? '#2e7d32' : '#e65100',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>
                    {c.Total_Beneficiarios}
                  </span>
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