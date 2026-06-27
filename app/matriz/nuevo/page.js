// app/matriz/nuevo/page.js
'use client';
import { useState, useEffect } from 'react';

export default function NuevoRegistro() {
  const [catalogos, setCatalogos] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    Id_Convocatoria: '', Id_Localidad: '', Id_Universidades: '',
    Id_Nucleo: '', Id_Modalidad: '', Id_Sector: '1', Id_Zona: '1',
    Id_Saber11: '', Id_Sexo: '', Id_Edad: '', Id_GrupoEtnico: '1',
    Id_Victima: '1', Id_Discapacidad: '1', Id_Sisben: '',
    Beneficiarios_Programa: 1
  });

  useEffect(() => {
    fetch('/api/catalogos')
      .then(res => res.json())
      .then(data => setCatalogos(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(''); setError('');
    const res = await fetch('/api/matriz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      setMensaje(data.message);
      window.scrollTo(0, 0);
    } else {
      setError(data.error);
    }
  };

  if (!catalogos) return <p style={{ padding: '24px' }}>Cargando catálogos...</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a237e' }}>➕ Nuevo Registro en Matriz</h1>
      <a href="/matriz" style={{ color: '#1565c0', textDecoration: 'none' }}>← Volver a la Matriz</a>

      {mensaje && <div style={alertStyle('#e8f5e9', '#2e7d32')}>{mensaje}</div>}
      {error && <div style={alertStyle('#ffebee', '#c62828')}>{error}</div>}

      <form onSubmit={handleSubmit} style={formStyle}>

        <div style={seccionStyle}>🗓️ Información General</div>

        <div style={grupoStyle}>
          <label style={labelStyle}>Convocatoria</label>
          <select name="Id_Convocatoria" value={form.Id_Convocatoria} onChange={handleChange} required style={inputStyle}>
            <option value="">Seleccione...</option>
            {catalogos.convocatorias.map(c => (
              <option key={c.Id_Convocatoria} value={c.Id_Convocatoria}>{c.Convocatoria}</option>
            ))}
          </select>
        </div>

        <div style={grupoStyle}>
          <label style={labelStyle}>Localidad</label>
          <select name="Id_Localidad" value={form.Id_Localidad} onChange={handleChange} required style={inputStyle}>
            <option value="">Seleccione...</option>
            {catalogos.localidades.map(l => (
              <option key={l.Id_Localidad} value={l.Id_Localidad}>{l.Localidad}</option>
            ))}
          </select>
        </div>

        <div style={seccionStyle}>🏛️ Información Académica</div>

        <div style={grupoStyle}>
          <label style={labelStyle}>Universidad</label>
          <select name="Id_Universidades" value={form.Id_Universidades} onChange={handleChange} required style={inputStyle}>
            <option value="">Seleccione...</option>
            {catalogos.universidades.map(u => (
              <option key={u.Id_Universidades} value={u.Id_Universidades}>{u.Nombre_IES}</option>
            ))}
          </select>
        </div>

        <div style={grupoStyle}>
          <label style={labelStyle}>Núcleo Básico del Conocimiento</label>
          <select name="Id_Nucleo" value={form.Id_Nucleo} onChange={handleChange} required style={inputStyle}>
            <option value="">Seleccione...</option>
            {catalogos.nucleos.map(n => (
              <option key={n.Id_Nucleo} value={n.Id_Nucleo}>{n.Nucleo}</option>
            ))}
          </select>
        </div>

        <div style={grupoStyle}>
          <label style={labelStyle}>Modalidad</label>
          <select name="Id_Modalidad" value={form.Id_Modalidad} onChange={handleChange} required style={inputStyle}>
            <option value="">Seleccione...</option>
            {catalogos.modalidades.map(m => (
              <option key={m.Id_Modalidad} value={m.Id_Modalidad}>{m.Modalidad}</option>
            ))}
          </select>
        </div>

        <div style={seccionStyle}>👤 Información del Beneficiario</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={grupoStyle}>
            <label style={labelStyle}>Sexo</label>
            <select name="Id_Sexo" value={form.Id_Sexo} onChange={handleChange} required style={inputStyle}>
              <option value="">Seleccione...</option>
              {catalogos.sexos.map(s => (
                <option key={s.Id_Sexo} value={s.Id_Sexo}>{s.Sexo}</option>
              ))}
            </select>
          </div>

          <div style={grupoStyle}>
            <label style={labelStyle}>Edad</label>
            <select name="Id_Edad" value={form.Id_Edad} onChange={handleChange} required style={inputStyle}>
              <option value="">Seleccione...</option>
              {catalogos.edades.map(e => (
                <option key={e.Id_Edad} value={e.Id_Edad}>{e.Rango_Edad}</option>
              ))}
            </select>
          </div>

          <div style={grupoStyle}>
            <label style={labelStyle}>Grupo Étnico</label>
            <select name="Id_GrupoEtnico" value={form.Id_GrupoEtnico} onChange={handleChange} style={inputStyle}>
              {catalogos.etnicos.map(g => (
                <option key={g.Id_GrupoEtnico} value={g.Id_GrupoEtnico}>{g.Grupo_Etnico}</option>
              ))}
            </select>
          </div>

          <div style={grupoStyle}>
            <label style={labelStyle}>Grupo Sisbén</label>
            <select name="Id_Sisben" value={form.Id_Sisben} onChange={handleChange} required style={inputStyle}>
              <option value="">Seleccione...</option>
              {catalogos.sisbenes.map(s => (
                <option key={s.Id_Sisben} value={s.Id_Sisben}>{s.Grupo_Sisben}</option>
              ))}
            </select>
          </div>

          <div style={grupoStyle}>
            <label style={labelStyle}>Saber 11</label>
            <select name="Id_Saber11" value={form.Id_Saber11} onChange={handleChange} required style={inputStyle}>
              <option value="">Seleccione...</option>
              {catalogos.saber11.map(s => (
                <option key={s.Id_Saber11} value={s.Id_Saber11}>{s.Percentil}</option>
              ))}
            </select>
          </div>

          <div style={grupoStyle}>
            <label style={labelStyle}>Víctima del Conflicto</label>
            <select name="Id_Victima" value={form.Id_Victima} onChange={handleChange} style={inputStyle}>
              {catalogos.victimas.map(v => (
                <option key={v.Id_Victima} value={v.Id_Victima}>{v.Victima}</option>
              ))}
            </select>
          </div>

          <div style={grupoStyle}>
            <label style={labelStyle}>Discapacidad</label>
            <select name="Id_Discapacidad" value={form.Id_Discapacidad} onChange={handleChange} style={inputStyle}>
              {catalogos.discapacidades.map(d => (
                <option key={d.Id_Discapacidad} value={d.Id_Discapacidad}>{d.Discapacidad}</option>
              ))}
            </select>
          </div>

          <div style={grupoStyle}>
            <label style={labelStyle}>Número de Beneficiarios</label>
            <input
              type="number"
              name="Beneficiarios_Programa"
              value={form.Beneficiarios_Programa}
              onChange={handleChange}
              min="1"
              required
              style={inputStyle}
            />
          </div>
        </div>

        <button type="submit" style={{ ...btnEnviarStyle, width: '100%', marginTop: '16px' }}>
          💾 Guardar Registro
        </button>
      </form>
    </div>
  );
}

const formStyle = { backgroundColor: 'white', padding: '28px', borderRadius: '10px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', marginTop: '20px' };
const seccionStyle = { backgroundColor: '#e8eaf6', color: '#1a237e', padding: '10px 14px', borderRadius: '6px', fontWeight: '700', marginBottom: '16px', marginTop: '8px' };
const grupoStyle = { marginBottom: '16px' };
const labelStyle = { display: 'block', marginBottom: '6px', color: '#333', fontWeight: '600', fontSize: '14px' };
const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' };
const btnEnviarStyle = { padding: '14px', backgroundColor: '#1a237e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '700' };
const alertStyle = (bg, color) => ({ padding: '12px', backgroundColor: bg, color, borderRadius: '6px', margin: '16px 0', border: `1px solid ${color}` });