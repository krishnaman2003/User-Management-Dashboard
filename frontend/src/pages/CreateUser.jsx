import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/api';
import UserForm from '../components/UserForm';

const CreateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      await userService.createUser(formData);
      alert('User created successfully!');
      navigate('/');
    } catch (err) {
      setError(err.message);
      alert(`Error creating user: ${err.message}`);
    } finally {
      setLoading(false);
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
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#7f8c8d',
      fontSize: '0.95rem',
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create New User</h1>
          <p style={styles.subtitle}>
            Fill in the form below to add a new user to the system.
          </p>
        </div>

        {error && (
          <div style={styles.error}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <UserForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </div>
  );
};

export default CreateUser;