import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: 0,
    },
    nav: {
      display: 'flex',
      gap: '1rem',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      transition: 'background-color 0.3s',
    },
    navLinkActive: {
      backgroundColor: '#34495e',
    },
    main: {
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '0 1rem',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>User Management Dashboard</h1>
          <nav style={styles.nav}>
            <Link
              to="/"
              style={{
                ...styles.navLink,
                ...(location.pathname === '/' ? styles.navLinkActive : {}),
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/') {
                  e.target.style.backgroundColor = '#34495e';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/create"
              style={{
                ...styles.navLink,
                ...(location.pathname === '/create' ? styles.navLinkActive : {}),
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/create') {
                  e.target.style.backgroundColor = '#34495e';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/create') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Create User
            </Link>
          </nav>
        </div>
      </header>
      <main style={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;