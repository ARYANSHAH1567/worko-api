const userService = require('../services/userService');

// Display all users
exports.listUsers = async (req, res) => {
    try {
        const users = await userService.listUsers();
        res.render('userList', { users });
    } catch (error) {
        res.status(500).json({ message: 'Error listing users', error });
    }
};

// Display form to create a new user
exports.newUserForm = async (req, res) => {
    console.log("hi i was here");
    res.render('newUser');
};

//Display user details
exports.userDetails = async (req,res,next) => {
    const { userId } = req.params;
    const user = await userService.getUserById(req.params.userId);
    
    if (!userId) {
        let err = new Error("UsedID is required");
        next(err);
    }
    res.render('userDetail',{user});
};


// Create a new user
exports.createUser = async (req, res) => {
    
    try {
        const { email, name, age, city, zipCode } = req.body;
        
        console.log(req.body);
        // Example validation (you should implement more thorough validation)
        if (!email || !name || !age || !city || !zipCode) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create user in the database using the userService
        const newUser = await userService.createUser({ email, name, age, city, zipCode });
        
        // Redirect to a success page or another relevant page
        res.redirect('/worko/users'); // Redirect to the list of users page
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Display form to edit a user
exports.editUserForm = async (req, res) => {
    try {
        // Fetch user data based on req.params.userId
        const { userId } = req.params;
        const user = await userService.getUserById(req.params.userId);
        
        if (!userId) {
            let err = new Error("UsedID is required");
        next(err);
        }

        // Check if user exists in the database
        const existingUser = await userService.getUserById(userId);
        if (!existingUser) {
            let err = new Error("User Not found");
        next(err);
        }
        // Render editUser form with user data
        res.render('editUser', { user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};


// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Verify userId
        if (!userId) {
            let err = new Error("UsedID is required");
            next(err);
        }

        // Check if user exists in the database
        const existingUser = await userService.getUserById(userId);
        if (!existingUser) {
            let err = new Error("User not found");
        next(err);
        }

        // Perform update operation
        await userService.updateUser(userId, req.body);
        
        // Redirect or respond with success message
        res.redirect('/worko/users');
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Verify userId
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Check if user exists in the database
        const existingUser = await userService.getUserById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Perform soft delete operation
        await userService.deleteUser(userId);

        // Redirect or respond with success message
        res.redirect('/worko/users');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

