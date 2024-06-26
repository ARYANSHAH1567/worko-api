const User = require('../models/userModel');

const findUserById = async (id) => {
    return await User.findById(id);
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const updateUser = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

const softDeleteUser = async (id) => {
    return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

const listUsers = async () => {
    return await User.find({ isDeleted: false });
};

module.exports = {
    findUserById,
    createUser,
    updateUser,
    softDeleteUser,
    listUsers,
};
