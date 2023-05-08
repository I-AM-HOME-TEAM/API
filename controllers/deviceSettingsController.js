const db = require('../models')
const DeviceSettings = db.device_settings;

// Create device setting
const addDeviceSettings = async (req, res) => {

    let info = {

        user_id: req.body.user_id,
        device_id: req.body.device_id,
        delay: req.body.delay

    }

    const deviceSettings = await DeviceSettings.create(info);

    res.status(200).send(deviceSettings);

    console.log(deviceSettings);
}

// Get all devices settings from table
const getAllDeviceSettings = async (req, res) => {

    let deviceSettings = await DeviceSettings.findAll({  }); // can add attributes

    res.status(200).send(deviceSettings);

}

// Get one device settings from table by id
const getOneDeviceSetting = async (req, res) => {

    let id = req.params.id;

    let deviceSettings = await DeviceSettings.findOne({ where: { id: id }});

    res.status(200).send(deviceSettings);

}

// Update device setting by id
const updateDeviceSettings = async (req, res) => {

    let id = req.params.id;

    const deviceSettings = await DeviceSettings.update(req.body, { where: { id: id }});

    res.status(200).send('Device setting updated successfully!');
}

// Delete device setting by id
const deleteDeviceSettings = async (req, res) => {

    let id = req.params.id;

    await DeviceSettings.destroy({ where: { id: id } });

    res.status(200).send('Device setting is deleted!');

}

module.exports = {
    addDeviceSettings,
    getAllDeviceSettings,
    getOneDeviceSetting,
    deleteDeviceSettings,
    updateDeviceSettings
}
