// app/page.js
export default function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: '#1a237e', fontSize: '32px', marginBottom: '8px' }}>
        Sistema de Gestión de Beneficiarios
      </h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>
        Programa de apoyo educativo — Bogotá D.C.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginTop: '32px'
      }}>
        <a href="/localidades" style={cardStyle}>
          <div style={{ fontSize: '40px' }}>📍</div>
          <h3>Localidades</h3>
          <p>Consultar, agregar y editar localidades</p>
        </a>

        <a href="/universidades" style={cardStyle}>
          <div style={{ fontSize: '40px' }}>🏛️</div>
          <h3>Universidades</h3>
          <p>Gestión de instituciones educativas</p>
        </a>

        <a href="/matriz" style={cardStyle}>
          <div style={{ fontSize: '40px' }}>📊</div>
          <h3>Matriz</h3>
          <p>Registros completos de beneficiarios</p>
        </a>

        <a href="/convocatorias" style={cardStyle}>
          <div style={{ fontSize: '40px' }}>📋</div>
          <h3>Convocatorias</h3>
          <p>Resumen por convocatoria</p>
        </a>
      </div>
    </div>
  );
}

const cardStyle = {
  display: 'block',
  padding: '32px',
  backgroundColor: 'white',
  border: '2px solid #e3e8f0',
  borderRadius: '12px',
  textDecoration: 'none',
  color: '#1a237e',
  textAlign: 'center',
  transition: 'all 0.2s',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
};