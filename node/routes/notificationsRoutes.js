// routes/notificationsRoutes.js

const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');

// Get all notifications
router.get('/', notificationsController.getAllNotifications);

module.exports = router;
