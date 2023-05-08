const db = require('../models')
const User = db.users;

// Create user
const addUser = async (req, res) => {

    let info = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const user = await User.create(info);

    res.status(200).send(user);

    console.log(user);
}

// Get all users from table
const getAllUsers = async (req, res) => {

    let users = await User.findAll({  }); // can add attributes

    res.status(200).send(users);

}

// Get one user from table by id
const getOneUser = async (req, res) => {

    let id = req.params.id;

    let user = await User.findOne({ where: { id: id }});

    res.status(200).send(user);

}

// Update user by id
const updateUser = async (req, res) => {

    let id = req.params.id;

    const user = await User.update(req.body, { where: { id: id }});

    res.status(200).send('User updated successfully!');
}

// Delete user by id
const deleteUser = async (req, res) => {

    let id = req.params.id;

    await User.destroy({ where: { id: id } });

    res.status(200).send('User is deleted!');

}

module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    deleteUser,
    updateUser
}
