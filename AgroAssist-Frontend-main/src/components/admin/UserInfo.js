import React, { useEffect, useState } from 'react';
import AddUserModal from './AddUserModal'; // Correct default import
import './styles.css';
import axios from 'axios';
import { baseURL } from '../../lib';

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', type: '' });
  const [search, setSearch] = useState("");
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingUserIndex, setEditingUserIndex] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/admin/users`);
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    getUsers();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Add a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.type) {
      setError('All fields are required.');
      return;
    }
    setUsers([...users, newUser]);
    setNewUser({ name: '', email: '', type: '' });
    setError('');
    closeModal();
  };

  // Delete a user locally and update the backend
  const handleDeleteUser = async (index, userId) => {
    try {
      await axios.delete(`${baseURL}/api/admin/users/${userId}`);
      setUsers(users.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Handle role change via dropdown
  const handleRoleChange = async (index, userId, newRole) => {
    try {
      // Send update to the backend
      console.log(newRole)
      const response = await axios.put(`${baseURL}/api/admin/users/${userId}/role`, { role: newRole });

      // Update the user role locally
      const updatedUser = response.data.user;
      const updatedUsers = [...users];
      updatedUsers[index] = updatedUser;
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to update user role:", error);
    } finally {
      setEditingUserIndex(null);
    }
  };

  return (
    <div className="user-info-container">
      <h2 className="section-title">User Information</h2>

      <div className="search-form">
        <div className="search-tab">
          <input
            type="text"
            placeholder="Search user ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="add-user-form">
          <button onClick={openModal} className="btn add-btn">Add User</button>
        </div>
      </div>

      {/* Modal for adding a new user */}
      <AddUserModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        newUser={newUser}
        setNewUser={setNewUser}
        handleAddUser={handleAddUser}
        error={error}
      />

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).map((user, index) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {editingUserIndex === index ? (
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(index, user._id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="farmer">Farmer</option>
                    <option value="user">User</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteUser(index, user._id)} className="btn delete-btn">Delete</button>
                <button
                  onClick={() => setEditingUserIndex(index)}
                  className="btn modify-btn"
                >
                  {editingUserIndex === index ? 'Save' : 'Modify Role'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
