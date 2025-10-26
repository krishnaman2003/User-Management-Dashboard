import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import UserList from '../components/UserList';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        setUsers(users.filter((user) => user.id !== userId));
        alert('User deleted successfully!');
      } catch (err) {
        alert(`Error deleting user: ${err.message}`);
      }
    }
  };

  const styles = {
    container: {
      padding: '2rem 0',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#7f8c8d',
      fontSize: '1rem',
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
    retryButton: {
      marginTop: '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>User Dashboard</h1>
        <p style={styles.subtitle}>
          Manage all users in one place. View, edit, or delete user information.
        </p>
      </div>

      {error && (
        <div style={styles.error}>
          <strong>Error:</strong> {error}
          <br />
          <button
            style={styles.retryButton}
            onClick={fetchUsers}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2980b9';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#3498db';
            }}
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div style={styles.loading}>
          <p>Loading users...</p>
        </div>
      ) : (
        <UserList users={users} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Dashboard;