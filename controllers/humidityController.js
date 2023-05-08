const db = require('../models')
const Humidity = db.humidities;

// Create humidity
const addHumidity = async (req, res) => {

    let info = {
        device_id: req.body.device_id,
        humidity: req.body.humidity,
    }

    const humidity = await Humidity.create(info);

    res.status(200).send(humidity);

    console.log(humidity);
}

// Get all humidities from table
const getAllHumidities = async (req, res) => {

    let humidity = await Humidity.findAll({  }); // can add attributes

    res.status(200).send(humidity);

}

// Get one humidity from table by id
const getOneHumidity = async (req, res) => {

    let id = req.params.id;

    let humidity = await Humidity.findOne({ where: { id: id }});

    res.status(200).send(humidity);

}

// Update humidity by id
const updateHumidity = async (req, res) => {

    let id = req.params.id;

    const humidity = await Humidity.update(req.body, { where: { id: id }});

    res.status(200).send('Humidity updated successfully!');
}

// Delete humidity by id
const deleteHumidity = async (req, res) => {

    let id = req.params.id;

    await Humidity.destroy({ where: { id: id } });

    res.status(200).send('Humidity is deleted!');

}

module.exports = {
    addHumidity,
    getAllHumidities,
    getOneHumidity,
    deleteHumidity,
    updateHumidity
}
