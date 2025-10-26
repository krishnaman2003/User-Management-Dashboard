import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = ({ users, onDelete }) => {
  const navigate = useNavigate();

  const styles = {
    container: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    thead: {
      backgroundColor: '#34495e',
      color: 'white',
    },
    th: {
      padding: '1rem',
      textAlign: 'left',
      fontWeight: '600',
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    tbody: {
      backgroundColor: 'white',
    },
    tr: {
      borderBottom: '1px solid #ecf0f1',
      transition: 'background-color 0.2s',
    },
    td: {
      padding: '1rem',
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
      fontSize: '0.85rem',
      fontWeight: '600',
      transition: 'all 0.3s',
    },
    viewButton: {
      backgroundColor: '#3498db',
      color: 'white',
    },
    editButton: {
      backgroundColor: '#f39c12',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
    },
    empty: {
      textAlign: 'center',
      padding: '3rem',
      color: '#7f8c8d',
      fontSize: '1.1rem',
    },
    mobileResponsive: {
      '@media (max-width: 768px)': {
        fontSize: '0.85rem',
      },
    },
  };

  if (!users || users.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <p>No users found. Create your first user to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Company</th>
            <th style={styles.th}>City</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody style={styles.tbody}>
          {users.map((user) => (
            <tr
              key={user.id}
              style={styles.tr}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.phone}</td>
              <td style={styles.td}>{user.company}</td>
              <td style={styles.td}>{user.address.city}</td>
              <td style={styles.td}>
                <div style={styles.actions}>
                  <button
                    style={{ ...styles.button, ...styles.viewButton }}
                    onClick={() => navigate(`/user/${user.id}`)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#2980b9';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#3498db';
                    }}
                  >
                    View
                  </button>
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
                    onClick={() => onDelete(user.id)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;