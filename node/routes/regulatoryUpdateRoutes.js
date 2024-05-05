const express = require('express');
const router = express.Router();
const regulatoryUpdateController = require('../controllers/regulatoryUpdateController');

// Route to add regulatory update
router.post('/', regulatoryUpdateController.addRegulatoryUpdate);

// Route to get all regulatory updates
router.get('/', regulatoryUpdateController.getAllRegulatoryUpdates);

module.exports = router;
