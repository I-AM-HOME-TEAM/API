const temperatureController = require('../controllers/temperatureController');

const temperatureRouter = require('express').Router();

temperatureRouter.post('/add', temperatureController.addTemperature);

temperatureRouter.get('/getAll', temperatureController.getAllTemperatures);



temperatureRouter.get('/:id', temperatureController.getOneTemperature);

temperatureRouter.put('/:id', temperatureController.updateTemperature);

temperatureRouter.delete('/:id', temperatureController.deleteTemperature);

module.exports = temperatureRouter;