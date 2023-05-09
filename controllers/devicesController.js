const db = require('../models')
const Devices = db.devices;

// Create device
const addDevice = async (req, res) => {

    let info = {
        user_id: req.body.user_id,
        name: req.body.name,
        type: req.body.type
    }
    console.log(info);

    const devices = await Devices.create(info);

    res.status(200).send(devices);

    console.log(devices);
}

// Get all devices from table
const getAllDevices = async (req, res) => {

    let devices = await Devices.findAll({  }); // can add attributes

    res.status(200).send(devices);

}

// Get one device from table by id
const getOneDevice = async (req, res) => {

    let id = req.params.id;

    let devices = await Devices.findOne({ where: { id: id }});

    res.status(200).send(devices);

}

// Update device by id
const updateDevice = async (req, res) => {

    let id = req.params.id;

    const devices = await Devices.update(req.body, { where: { id: id }});

    res.status(200).send('User setting updated successfully!');
}

// Delete device by id
const deleteDevice = async (req, res) => {

    let id = req.params.id;

    await Devices.destroy({ where: { id: id } });

    res.status(200).send('User setting is deleted!');

}

module.exports = {
    addDevice,
    getAllDevices,
    getOneDevice,
    deleteDevice,
    updateDevice
}
