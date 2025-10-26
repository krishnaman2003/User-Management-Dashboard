import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../services/api';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUserById(id);
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        alert('User deleted successfully!');
        navigate('/');
      } catch (err) {
        alert(`Error deleting user: ${err.message}`);
      }
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #ecf0f1',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    actions: {
      display: 'flex',
      gap: '0.5rem',
    },
    button: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s',
    },
    editButton: {
      backgroundColor: '#f39c12',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
    },
    backButton: {
      backgroundColor: '#95a5a6',
      color: 'white',
      marginBottom: '1rem',
    },
    content: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
    field: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      fontWeight: '600',
      color: '#7f8c8d',
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '0.5rem',
    },
    value: {
      color: '#2c3e50',
      fontSize: '1rem',
      padding: '0.5rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px',
    },
    loading: {
      textAlign: 'center',
      padding: '3rem',
      fontSize: '1.2rem',
      color: '#7f8c8d',
    },
    error: {
      backgroundColor: '#ffe6e6',
      border: '1px solid #e74c3c',
      color: '#c0392b',
      padding: '1rem',
      borderRadius: '4px',
      marginBottom: '1rem',
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.loading}>Loading user details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <button
          style={{ ...styles.button, ...styles.backButton }}
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>
        <div style={styles.card}>
          <div style={styles.error}>
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.loading}>User not found</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button
        style={{ ...styles.button, ...styles.backButton }}
        onClick={() => navigate('/')}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#7f8c8d';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#95a5a6';
        }}
      >
        ← Back to Dashboard
      </button>

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>{user.name}</h1>
          <div style={styles.actions}>
            <button
              style={{ ...styles.button, ...styles.editButton }}
              onClick={() => navigate(`/edit/${user.id}`)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e67e22';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f39c12';
              }}
            >
              Edit
            </button>
            <button
              style={{ ...styles.button, ...styles.deleteButton }}
              onClick={handleDelete}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#c0392b';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e74c3c';
              }}
            >
              Delete
            </button>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <div style={styles.value}>{user.name}</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <div style={styles.value}>{user.email}</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Phone</label>
            <div style={styles.value}>{user.phone}</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Company</label>
            <div style={styles.value}>{user.company}</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Street</label>
            <div style={styles.value}>{user.address.street}</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>City</label>
            <div style={styles.value}>{user.address.city}</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Zip Code</label>
            <div style={styles.value}>{user.address.zip}</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Created At</label>
            <div style={styles.value}>
              {new Date(user.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;