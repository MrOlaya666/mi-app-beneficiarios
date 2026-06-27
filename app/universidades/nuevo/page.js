// app/universidades/nuevo/page.js
'use client';
import { useState } from 'react';

export default function NuevaUniversidad() {
  const [form, setForm] = useState({ Codigo_SNIES: '', Nombre_IES: '' });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(''); setError('');
    const res = await fetch('/api/universidades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      setMensaje(data.message);
      setForm({ Codigo_SNIES: '', Nombre_IES: '' });
    } else {
      setError(data.error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a237e' }}>➕ Nueva Universidad</h1>
      <a href="/universidades" style={{ color: '#1565c0', textDecoration: 'none' }}>← Volver</a>

      {mensaje && <div style={alertStyle('#e8f5e9', '#2e7d32')}>{mensaje}</div>}
      {error && <div style={alertStyle('#ffebee', '#c62828')}>{error}</div>}

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={grupoStyle}>
          <label style={labelStyle}>Código SNIES</label>
          <input
            type="number"
            value={form.Codigo_SNIES}
            onChange={(e) => setForm({ ...form, Codigo_SNIES: e.target.value })}
            placeholder="Ej: 1101"
            required
            style={inputStyle}
          />
        </div>

        <div style={grupoStyle}>
          <label style={labelStyle}>Nombre de la Institución</label>
          <input
            type="text"
            value={form.Nombre_IES}
            onChange={(e) => setForm({ ...form, Nombre_IES: e.target.value })}
            placeholder="Ej: UNIVERSIDAD EJEMPLO"
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" style={{ ...btnStyle, width: '100%', marginTop: '8px' }}>
          Guardar Universidad
        </button>
      </form>
    </div>
  );
}

const formStyle = { backgroundColor: 'white', padding: '28px', borderRadius: '10px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', marginTop: '20px' };
const grupoStyle = { marginBottom: '18px' };
const labelStyle = { display: 'block', marginBottom: '6px', color: '#333', fontWeight: '600' };
const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' };
const btnStyle = { padding: '12px 24px', backgroundColor: '#1a237e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' };
const alertStyle = (bg, color) => ({ padding: '12px', backgroundColor: bg, color, borderRadius: '6px', margin: '16px 0', border: `1px solid ${color}` });