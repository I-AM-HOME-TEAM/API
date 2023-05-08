const deviceSettingsController = require('../controllers/deviceSettingsController');

const deviceSettingsRouter = require('express').Router();

deviceSettingsRouter.post('/add', deviceSettingsController.addDeviceSettings);

deviceSettingsRouter.get('/getAll', deviceSettingsController.getAllDeviceSettings);



deviceSettingsRouter.get('/:id', deviceSettingsController.getOneDeviceSetting);

deviceSettingsRouter.put('/:id', deviceSettingsController.updateDeviceSettings);

deviceSettingsRouter.delete('/:id', deviceSettingsController.deleteDeviceSettings);

module.exports = deviceSettingsRouter;