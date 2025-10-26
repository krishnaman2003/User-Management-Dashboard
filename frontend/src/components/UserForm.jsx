import React, { useState, useEffect } from 'react';

const UserForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: {
      street: '',
      city: '',
      zip: '',
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\d{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10-15 digits';
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    // Address validation
    if (!formData.address.street.trim()) {
      newErrors.street = 'Street is required';
    }
    if (!formData.address.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.address.zip.trim()) {
      newErrors.zip = 'Zip code is required';
    } else if (formData.address.zip.trim().length < 3) {
      newErrors.zip = 'Zip code must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    if (errors[name] || errors[name.split('.')[1]]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        delete newErrors[name.split('.')[1]];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontWeight: '600',
      color: '#2c3e50',
      fontSize: '0.95rem',
    },
    required: {
      color: '#e74c3c',
      marginLeft: '0.25rem',
    },
    input: {
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      transition: 'border-color 0.3s',
    },
    inputError: {
      borderColor: '#e74c3c',
    },
    error: {
      color: '#e74c3c',
      fontSize: '0.85rem',
      marginTop: '0.25rem',
    },
    addressGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '1rem',
    },
    buttonDisabled: {
      backgroundColor: '#95a5a6',
      cursor: 'not-allowed',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>
          Name<span style={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(errors.name ? styles.inputError : {}),
          }}
          placeholder="Enter full name"
        />
        {errors.name && <span style={styles.error}>{errors.name}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Email<span style={styles.required}>*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(errors.email ? styles.inputError : {}),
          }}
          placeholder="email@example.com"
        />
        {errors.email && <span style={styles.error}>{errors.email}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Phone<span style={styles.required}>*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(errors.phone ? styles.inputError : {}),
          }}
          placeholder="1234567890"
        />
        {errors.phone && <span style={styles.error}>{errors.phone}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Company<span style={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          style={{
            ...styles.input,
            ...(errors.company ? styles.inputError : {}),
          }}
          placeholder="Company name"
        />
        {errors.company && <span style={styles.error}>{errors.company}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Address</label>
        <div style={styles.addressGroup}>
          <div>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.street ? styles.inputError : {}),
              }}
              placeholder="Street address"
            />
            {errors.street && <span style={styles.error}>{errors.street}</span>}
          </div>
          <div>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.city ? styles.inputError : {}),
              }}
              placeholder="City"
            />
            {errors.city && <span style={styles.error}>{errors.city}</span>}
          </div>
          <div>
            <input
              type="text"
              name="address.zip"
              value={formData.address.zip}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.zip ? styles.inputError : {}),
              }}
              placeholder="Zip code"
            />
            {errors.zip && <span style={styles.error}>{errors.zip}</span>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          ...styles.button,
          ...(isLoading ? styles.buttonDisabled : {}),
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.target.style.backgroundColor = '#2980b9';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.target.style.backgroundColor = '#3498db';
          }
        }}
      >
        {isLoading ? 'Submitting...' : initialData ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;