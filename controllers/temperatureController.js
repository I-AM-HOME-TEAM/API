const db = require('../models')
const Temperature = db.temperatures;

// Create temperature
const addTemperature = async (req, res) => {

    let info = {
        device_id: req.body.device_id,
        temperature: req.body.temperature,
    }

    const temperature = await Temperature.create(info);

    res.status(200).send(temperature);

    console.log(temperature);
}

// Get all temperatures from table
const getAllTemperatures = async (req, res) => {

    let temperature = await Temperature.findAll({  }); // can add attributes

    res.status(200).send(temperature);

}

// Get one temperature from table by id
const getOneTemperature = async (req, res) => {

    let id = req.params.id;

    let temperature = await Temperature.findOne({ where: { id: id }});

    res.status(200).send(temperature);

}

// Update temperature by id
const updateTemperature = async (req, res) => {

    let id = req.params.id;

    const temperature = await Temperature.update(req.body, { where: { id: id }});

    res.status(200).send('Temperature updated successfully!');
}

// Delete temperature by id
const deleteTemperature = async (req, res) => {

    let id = req.params.id;

    await Temperature.destroy({ where: { id: id } });

    res.status(200).send('Temperature is deleted!');

}

module.exports = {
    addTemperature,
    getAllTemperatures,
    getOneTemperature,
    deleteTemperature,
    updateTemperature
}
