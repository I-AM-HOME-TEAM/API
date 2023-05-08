const humidityController = require('../controllers/humidityController');

const humidityRouter = require('express').Router();

humidityRouter.post('/add', humidityController.addHumidity);

humidityRouter.get('/getAll', humidityController.getAllHumidities);



humidityRouter.get('/:id', humidityController.getOneHumidity);

humidityRouter.put('/:id', humidityController.updateHumidity);

humidityRouter.delete('/:id', humidityController.deleteHumidity);

module.exports = humidityRouter;