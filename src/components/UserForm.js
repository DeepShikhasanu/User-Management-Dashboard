import React, { useState, useEffect } from 'react';


const UserForm = ({ user, setUser, setShowForm, setUsers, users }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        department: user.department,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const { name, email, department } = formData;

    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
      errors.name = 'Name is required and should contain only letters.';
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!department) {
      errors.department = 'Department is required.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!user) {
        const newUser = { ...formData, id: Date.now() }; 
        setUsers([...users, newUser]);
      } else {
        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, ...formData } : u
        );
        setUsers(updatedUsers);
      }

      setFormData({ name: '', email: '', department: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{user ? 'Edit User' : 'Add New User'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="alert alert-danger">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="alert alert-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            className="form-control"
            value={formData.department}
            onChange={handleChange}
          />
          {errors.department && <div className="alert alert-danger">{errors.department}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          {user ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;

