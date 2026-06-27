// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Sistema Beneficiarios',
  description: 'Gestión de Beneficiarios',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <nav style={{
          backgroundColor: '#1a237e',
          padding: '12px 24px',
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <span style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            marginRight: '16px'
          }}>
            🎓 Beneficiarios
          </span>
          <a href="/" style={linkStyle}>Inicio</a>
          <a href="/localidades" style={linkStyle}>Localidades</a>
          <a href="/universidades" style={linkStyle}>Universidades</a>
          <a href="/matriz" style={linkStyle}>Matriz</a>
          <a href="/convocatorias" style={linkStyle}>Convocatorias</a>
        </nav>
        <main style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
          {children}
        </main>
      </body>
    </html>
  );
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  backgroundColor: 'rgba(255,255,255,0.15)',
  fontSize: '14px'
};