const express = require('express');
const equipmentController = require('../controllers/equipmentController');

const router = express.Router();

// Route to add new equipment (only for farmers)
router.post('/add-equipment', equipmentController.addEquipment);

// Route to update existing equipment (only for farmers)
router.put('/update-equipment', equipmentController.updateEquipment);

// Route to delete equipment (only for farmers)
router.delete('/delete-equipment', equipmentController.deleteEquipment);

// Route to get all listed equipment (available for all users)
router.get('/get-all-equipments', equipmentController.getAllEquipments);

module.exports = router;
