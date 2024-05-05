// routes/formPostsRoutes.js

const express = require('express');
const router = express.Router();
const formPostsController = require('../controllers/formPostsController');

// Create a form post
router.post('/', formPostsController.createFormPost);

// Get all form posts
router.get('/', formPostsController.getAllFormPosts);

// Get form post by ID
router.get('/:id', formPostsController.getFormPostById);

// Update form post by ID
router.put('/:id', formPostsController.updateFormPostById);

// Delete form post by ID
router.delete('/:id', formPostsController.deleteFormPostById);

module.exports = router;
