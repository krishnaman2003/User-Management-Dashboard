import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../services/api';
import UserForm from '../components/UserForm';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // Use the correct service function name from services/api.jsx
        const user = await userService.getUserById(id);
        setInitialData(user); // userService.getUserById already returns the data
      } catch (err) {
        setError(err.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      await userService.updateUser(id, formData);
      alert('User updated successfully!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Update failed');
      alert(`Error updating user: ${err.message || err}`);
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
          <h1 style={styles.title}>Edit User</h1>
          <p style={styles.subtitle}>Update the fields below to edit the user.</p>
        </div>

        {error && (
          <div style={styles.error}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && !initialData ? (
          <p>Loading user...</p>
        ) : (
          // Pass the correct prop name expected by UserForm: `initialData`
          <UserForm initialData={initialData} onSubmit={handleSubmit} isLoading={loading} />
        )}
      </div>
    </div>
  );
};

export default EditUser;
