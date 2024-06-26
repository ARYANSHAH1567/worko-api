const userDao = require('../daos/userDao');
const UserDTO = require('../dtos/userDto');

const createUser = async (userData) => {
    const userDto = new UserDTO(userData);
    return await userDao.createUser(userDto);
};

const listUsers = async () => {
    return await userDao.listUsers();
};

const getUserById = async (id) => {
    return await userDao.findUserById(id);
};

const updateUser = async (id, userData) => {
    return await userDao.updateUser(id, userData);
};

const deleteUser = async (id) => {
    return await userDao.softDeleteUser(id);
};

module.exports = {
    createUser,
    listUsers,
    getUserById,
    updateUser,
    deleteUser,
};
