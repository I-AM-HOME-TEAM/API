const db = require('../models')
const Ip = db.ip_ddresses;

// Create IP Address
const addIp = async (req, res) => {

    let info = {
        user_id: req.body.user_id,
        ip: req.body.ip,
        user_agent: req.body.user_agent
    }

    const ip = await Ip.create(info);

    res.status(200).send(ip);

    console.log(ip);
}

// Get all IP Addresses from table
const getAllIp = async (req, res) => {

    let ip = await Ip.findAll({  }); // can add attributes

    res.status(200).send(ip);

}

// Get one IP Address from table by id
const getOneIp = async (req, res) => {

    let id = req.params.id;

    let ip = await Ip.findOne({ where: { id: id }});

    res.status(200).send(ip);

}

// Update IP Address by id
const updateIp = async (req, res) => {

    let id = req.params.id;

    const ip = await Ip.update(req.body, { where: { id: id }});

    res.status(200).send('IP Address updated successfully!');
}

// Delete IP Address by id
const deleteIp = async (req, res) => {

    let id = req.params.id;

    await Ip.destroy({ where: { id: id } });

    res.status(200).send('IP Address is deleted!');

}

module.exports = {
    addIp,
    getAllIp,
    getOneIp,
    deleteIp,
    updateIp
}
