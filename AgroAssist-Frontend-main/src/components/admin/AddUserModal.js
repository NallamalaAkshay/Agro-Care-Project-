// AddUserModal.js
import React from 'react';
import './styles.css';

const AddUserModal = ({ isOpen, closeModal, newUser, setNewUser, handleAddUser, error }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Add New User</h3>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleChange}
            className="modal-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleChange}
            className="modal-input"
          />
          <input
            type="text"
            name="type"
            placeholder="Type (e.g., Admin, Farmer, User)"
            value={newUser.type}
            onChange={handleChange}
            className="modal-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="button" onClick={handleAddUser} className="btn modal-add-btn">Add</button>
          <button type="button" onClick={closeModal} className="btn modal-close-btn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
