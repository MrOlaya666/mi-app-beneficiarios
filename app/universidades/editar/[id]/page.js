// app/universidades/editar/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function EditarUniversidad() {
  const { id } = useParams();
  const [form, setForm] = useState({ Codigo_SNIES: '', Nombre_IES: '' });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/universidades')
      .then(res => res.json())
      .then(data => {
        const uni = data.find(u => u.Id_Universidades == id);
        if (uni) setForm({ Codigo_SNIES: uni.Codigo_SNIES, Nombre_IES: uni.Nombre_IES });
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(''); setError('');
    const res = await fetch(`/api/universidades/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) setMensaje(data.message);
    else setError(data.error);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a237e' }}>✏️ Editar Universidad #{id}</h1>
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
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" style={{ ...btnStyle, width: '100%', marginTop: '8px' }}>
          Actualizar Universidad
        </button>
      </form>
    </div>
  );
}

const formStyle = { backgroundColor: 'white', padding: '28px', borderRadius: '10px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', marginTop: '20px' };
const grupoStyle = { marginBottom: '18px' };
const labelStyle = { display: 'block', marginBottom: '6px', color: '#333', fontWeight: '600' };
const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' };
const btnStyle = { padding: '12px 24px', backgroundColor: '#e65100', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' };
const alertStyle = (bg, color) => ({ padding: '12px', backgroundColor: bg, color, borderRadius: '6px', margin: '16px 0', border: `1px solid ${color}` });