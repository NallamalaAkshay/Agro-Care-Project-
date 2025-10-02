const Equipment = require('../models/equipment'); // Equipment model
const User = require('../models/user'); // User model

const equipmentController = {
  // Add Equipment
  addEquipment: async (req, res) => {
    try {
      const { userId } = req.body; // Extract userId from request body
      const user = await User.findById(userId);

      if (!user || user.role !== 'farmer') {
        return res.status(403).json({ message: 'Access denied. Only farmers can add equipment.' });
      }
      // console.log(userId);
      console.log(req.body)
      const { name, description, rental_price, contact_email, contact_number, location, image } = req.body;

      const newEquipment = new Equipment({
        name,
        description,
        rental_price,
        contact_email,
        contact_number,
        location,
        image,
        farmer: user.name, // Use farmer's name from User model
      });

      await newEquipment.save();

      // Optionally add equipment to farmer's equipment list
      user.equipment.push(newEquipment._id);
      await user.save();

      res.status(201).json({ message: 'Equipment added successfully', equipment: newEquipment });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error adding equipment', error: error.message });
    }
  },

  // Update Equipment
  updateEquipment: async (req, res) => {
    try {
      const { userId, equipmentId } = req.body; // Extract userId and equipmentId from request body
      console.log(userId , equipmentId)

      const user = await User.findById(userId);
      if (!user || user.role !== 'farmer') {
        return res.status(403).json({ message: 'Access denied. Only farmers can update equipment.' });
      }

      const equipment = await Equipment.findById(equipmentId);

      if (!equipment || equipment.farmer !== user.name) {
        return res.status(404).json({ message: 'Equipment not found or not owned by you' });
      }

      const updates = req.body; // Allow updating fields sent in the request body
      Object.assign(equipment, updates);

      await equipment.save();

      res.status(200).json({ message: 'Equipment updated successfully', equipment });
    } catch (error) {
      res.status(500).json({ message: 'Error updating equipment', error: error.message });
    }
  },

  // Delete Equipment
  deleteEquipment: async (req, res) => {
    try {
      const { userId, equipmentId } = req.body; // Extract userId and equipmentId from request body
      console.log(req.body)

      const user = await User.findById(userId);
      if (!user || user.role !== 'farmer') {
        return res.status(403).json({ message: 'Access denied. Only farmers can delete equipment.' });
      }

      const equipment = await Equipment.findById(equipmentId);

      if (!equipment || equipment.farmer !== user.name) {
        return res.status(404).json({ message: 'Equipment not found or not owned by you' });
      }

      await Equipment.findByIdAndDelete(equipmentId);

      // Optionally remove equipment from farmer's equipment list
      user.equipment = user.equipment.filter((id) => id.toString() !== equipmentId);
      await user.save();

      res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting equipment', error: error.message });
    }
  },

  // Get All Listed Equipment
  getAllEquipments: async (req, res) => {
    try {
      const { userId } = req.query; // Extract userId from the request query
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const allEquipments = await Equipment.find();
      const userEquipments = allEquipments.filter(
        (equipment) => equipment.farmer === user.name
      );
      const otherEquipments = allEquipments.filter(
        (equipment) => equipment.farmer !== user.name
      );
  
      res.status(200).json({
        message: 'Equipments retrieved successfully',
        userEquipments,
        otherEquipments,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching equipments', error: error.message });
    }
  },
  
};

module.exports = equipmentController;
