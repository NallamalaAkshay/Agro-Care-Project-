import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../userContext';
import { baseURL } from '../lib';

const RentalEquipment = () => {
  const [userEquipments, setUserEquipments] = useState([]);
  const [otherEquipments, setOtherEquipments] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    description: '',
    rental_price: '',
    contact_email: '',
    contact_number: '',
    location: '',
    image: '',
  });
  const [contactDropdown, setContactDropdown] = useState(null);

  const toggleContactDropdown = (id) => {
    setContactDropdown((prev) => (prev === id ? null : id));
  };

  const [editEquipment, setEditEquipment] = useState(null);
  const { user } = useContext(UserContext);

  // Fetch all equipment
  const fetchAllEquipments = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/get-all-equipments`, {
        params: { userId: user },
      });
      setUserEquipments(response.data.userEquipments || []);
      setOtherEquipments(response.data.otherEquipments || []);
    } catch (error) {
      console.error('Error fetching all equipments:', error.message);
    }
  };

  // Add equipment
  const handleAddEquipment = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/add-equipment`, {
        ...newEquipment,
        userId: user,
      });
      setUserEquipments([...userEquipments, response.data.equipment]);
      closeAddModal();
    } catch (error) {
      console.error('Error adding equipment:', error.message);
    }
  };

  // Update equipment
  const handleUpdateEquipment = async () => {
    try {
      const response = await axios.put(`${baseURL}/api/update-equipment`, {
        ...editEquipment,
        userId: user,
        equipmentId: editEquipment._id,
      });
      setUserEquipments((prev) =>
        prev.map((item) =>
          item._id === response.data.equipment._id ? response.data.equipment : item
        )
      );
      closeEditModal();
    } catch (error) {
      console.error('Error updating equipment:', error.message);
    }
  };

  // Delete equipment
  const handleDeleteEquipment = async (equipmentId) => {
    try {
      await axios.delete(`${baseURL}/api/delete-equipment`, {
        data: {
          userId: user,
          equipmentId,
        },
      });
      setUserEquipments((prev) => prev.filter((item) => item._id !== equipmentId));
    } catch (error) {
      console.error('Error deleting equipment:', error.message);
    }
  };

  // Close modals
  const closeAddModal = () => {
    setAddModalOpen(false);
    setNewEquipment({
      name: '',
      description: '',
      rental_price: '',
      contact_email: '',
      contact_number: '',
      location: '',
      image: '',
    });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditEquipment(null);
  };

  // Open edit modal
  const openEditModal = (equipment) => {
    setEditEquipment(equipment);
    setEditModalOpen(true);
  };

  useEffect(() => {
    fetchAllEquipments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Rental Equipment Marketplace</h1>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-700">My Uploaded Equipment</h2>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700"
          >
            + Add Equipment
          </button>
        </div>

        {/* Current Farmer's Equipment */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {userEquipments.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-lg transform transition hover:scale-105">
              <img
                src={item.image || 'https://via.placeholder.com/300'}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                <p className="text-green-500 font-semibold text-lg mt-4">${item.rental_price} / day</p>
                <p className="text-gray-600 text-sm mt-2">Location: {item.location}</p>
                <p className="text-gray-600 text-sm mt-2">
                  Contact:
                  <a
                    href={`mailto:${item.contact_email}`}
                    className="text-blue-500 underline hover:text-blue-700 ml-1"
                  >
                    {item.contact_email}
                  </a>
                  <span className="mx-1">/</span>
                  <a
                    href={`tel:${item.contact_number}`}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {item.contact_number}
                  </a>
                </p>
                <div className="flex mt-4 space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEquipment(item._id)}
                    className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>


        <h2 className="text-xl font-semibold text-gray-700 mb-4">Other Available Equipment</h2>

        {/* Other Farmers' Equipment */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 z-0">
          {otherEquipments.map((item) => (
            <div
              key={item._id}
              className="-z-1 bg-white rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl relative"
            >
              <img
                src={item.image || 'https://via.placeholder.com/300'}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 relative">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-green-500 font-semibold text-lg mb-2">
                  ${item.rental_price} / day
                </p>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="font-semibold mr-1">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${item.availability_status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {item.availability_status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Location:</span> {item.location}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Uploaded by:</span> {item.farmer}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Uploaded on:</span>{' '}
                  {new Date(item.created_at).toLocaleDateString()}
                </p>

                <div className="relative mt-4">
  <button
    onClick={() => toggleContactDropdown(item._id)}
    className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
  >
    Contact Now
  </button>
  {contactDropdown === item._id && (
    <div
      className="absolute bottom-[110%] left-0 w-full bg-white shadow-lg border rounded z-50 p-4"
      style={{ zIndex: 50 }}
    >
      <p className="text-lg font-bold text-gray-800 mb-4">Contact Options</p>
      <div className="flex flex-col space-y-2">
        <a
          href={`mailto:${item.contact_email}`}
          className="flex items-center px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded hover:bg-blue-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12l-4 4m0 0l-4-4m4 4V8"
            />
          </svg>
          Email: {item.contact_email}
        </a>
        <a
          href={`tel:${item.contact_number}`}
          className="flex items-center px-4 py-2 bg-green-100 text-green-800 font-semibold rounded hover:bg-green-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10l7-7m0 0l7 7M10 3v11"
            />
          </svg>
          Phone: {item.contact_number}
        </a>
      </div>
    </div>
  )}
</div>


              </div>
            </div>

          ))}
        </div>


        {/* Add Equipment Modal */}
        {/* Add Equipment Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
              <h3 className="text-2xl font-bold mb-4">Add Equipment</h3>
              <form>
                <input
                  type="text"
                  placeholder="Name"
                  value={newEquipment.name}
                  onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                  className="mb-2 w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Description"
                  value={newEquipment.description}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, description: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Rental Price"
                  value={newEquipment.rental_price}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, rental_price: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <select
                  value={newEquipment.availability_status || 'available'}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, availability_status: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                </select>
                <input
                  type="text"
                  placeholder="Location"
                  value={newEquipment.location}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, location: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newEquipment.image}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, image: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={newEquipment.contact_number}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, contact_number: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Contact Email"
                  value={newEquipment.contact_email}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, contact_email: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={handleAddEquipment}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="mt-4 ml-2 px-6 py-2 bg-gray-600 text-white rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Edit Equipment Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
              <h3 className="text-2xl font-bold mb-4">Edit Equipment</h3>
              <form>
                <input
                  type="text"
                  placeholder="Name"
                  value={editEquipment.name}
                  onChange={(e) => setEditEquipment({ ...editEquipment, name: e.target.value })}
                  className="mb-2 w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Description"
                  value={editEquipment.description}
                  onChange={(e) =>
                    setEditEquipment({ ...editEquipment, description: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Rental Price"
                  value={editEquipment.rental_price}
                  onChange={(e) =>
                    setEditEquipment({ ...editEquipment, rental_price: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <select
                  value={editEquipment.availability_status || 'available'}
                  onChange={(e) =>
                    setEditEquipment({
                      ...editEquipment,
                      availability_status: e.target.value,
                    })
                  }
                  className="mb-2 w-full p-2 border rounded"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                </select>
                <input
                  type="text"
                  placeholder="Location"
                  value={editEquipment.location}
                  onChange={(e) =>
                    setEditEquipment({ ...editEquipment, location: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editEquipment.image}
                  onChange={(e) =>
                    setEditEquipment({ ...editEquipment, image: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={editEquipment.contact_number}
                  onChange={(e) =>
                    setEditEquipment({ ...editEquipment, contact_number: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Contact Email"
                  value={editEquipment.contact_email}
                  onChange={(e) =>
                    setEditEquipment({ ...editEquipment, contact_email: e.target.value })
                  }
                  className="mb-2 w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={handleUpdateEquipment}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="mt-4 ml-2 px-6 py-2 bg-gray-600 text-white rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RentalEquipment;
