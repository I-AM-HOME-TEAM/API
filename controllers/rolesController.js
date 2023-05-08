const db = require('../models')
const Roles = db.roles;

// Create role
const addRole = async (req, res) => {

    let info = {
        name: req.body.name,
    }

    const role = await Roles.create(info);

    res.status(200).send(role);

    console.log(role);
}

// Get all roles from table
const getAllRoles = async (req, res) => {

    let role = await Roles.findAll({  }); // can add attributes

    res.status(200).send(role);

}

// Get one role from table by id
const getOneRole = async (req, res) => {

    let id = req.params.id;

    let role = await Roles.findOne({ where: { id: id }});

    res.status(200).send(role);

}

// Update role by id
const updateRole = async (req, res) => {

    let id = req.params.id;

    const role = await Roles.update(req.body, { where: { id: id }});

    res.status(200).send('Role updated successfully!');
}

// Delete role by id
const deleteRole = async (req, res) => {

    let id = req.params.id;

    await Roles.destroy({ where: { id: id } });

    res.status(200).send('Role is deleted!');

}

module.exports = {
    addRole,
    getAllRoles,
    getOneRole,
    deleteRole,
    updateRole
}
