const db = require('../models')
const UserSettings = db.user_settings;

// Create user setting
const addUserSettings = async (req, res) => {

    let info = {

        user_id: req.body.user_id,
        theme: req.body.theme,

    }

    const userSettings = await UserSettings.create(info);

    res.status(200).send(userSettings);

    console.log(userSettings);
}

// Get all users settings from table
const getAllUsersSettings = async (req, res) => {

    let usersSettings = await UserSettings.findAll({  }); // can add attributes

    res.status(200).send(usersSettings);

}

// Get one user settings from table by id
const getOneUserSetting = async (req, res) => {

    let id = req.params.id;

    let userSetting = await UserSettings.findOne({ where: { id: id }});

    res.status(200).send(userSetting);

}

// Update user setting by id
const updateUserSettings = async (req, res) => {

    let id = req.params.id;

    const userSettings = await UserSettings.update(req.body, { where: { id: id }});

    res.status(200).send('User setting updated successfully!');
}

// Delete user setting by id
const deleteUserSettings = async (req, res) => {

    let id = req.params.id;

    await UserSettings.destroy({ where: { id: id } });

    res.status(200).send('User setting is deleted!');

}

module.exports = {
    addUserSettings,
    getAllUsersSettings,
    getOneUserSetting,
    deleteUserSettings,
    updateUserSettings
}
