const Footer = () => {
  return (
    <footer className="container" style={{ padding: '60px 0', borderTop: '1px solid #e2e8f0', marginTop: '100px' }}>
      <div className="footer-content" style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} RED Projects & Management.</p>
      </div>
    </footer>
  );
};

export default Footer;
