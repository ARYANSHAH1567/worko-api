const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Display all users
router.get('/', userController.listUsers);

// Create a new user
router.post('/', userController.createUser);

// Display form to create a new user
router.get('/new', userController.newUserForm);

// Display User details 
router.get('/:userId', userController.userDetails);


// Display form to edit a user
router.get('/:userId/edit', userController.editUserForm);

// Update a user
router.put('/:userId', userController.updateUser);

// Delete a user
router.delete('/:userId', userController.deleteUser);




module.exports = router;
