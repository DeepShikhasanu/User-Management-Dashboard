import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data); // Initially, show all users
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      setFilteredUsers(filteredUsers.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterUsers(e.target.value);
  };

  const filterUsers = (query) => {
    if (query === '') {
      setFilteredUsers(users);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = users.filter(
        (user) =>
          (user.name && user.name.toLowerCase().includes(lowercasedQuery)) ||
          (user.email && user.email.toLowerCase().includes(lowercasedQuery)) ||
          (user.department && user.department.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredUsers(filtered);
      if (filtered.length === 0) {
        setError('No matching users found.');
      } else {
        setError(null);
      }
    }
  };

  return (
    <div className="container mt-4 bg-light p-4 rounded shadow-sm">
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">Loading users...</div>
      ) : (
        <>
          {/* Search Bar and Add New User Button */}
          <div className="mb-3 d-flex justify-content-between">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name, Email or Department"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="btn btn-primary" onClick={handleAdd}>
              Add New User
            </button>
          </div>

          {showForm && (
            <UserForm
              user={selectedUser}
              setUser={setSelectedUser}
              setShowForm={setShowForm}
              setUsers={setUsers}
              users={users}
            />
          )}

          {/* Table */}
          <table className="table table-striped table-bordered table-hover bg-white shadow-sm rounded">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserList;









