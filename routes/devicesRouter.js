const devicesController = require('../controllers/devicesController');

const devicesRouter = require('express').Router();

devicesRouter.post('/add', devicesController.addDevice);

devicesRouter.get('/getAll', devicesController.getAllDevices);



devicesRouter.get('/:id', devicesController.getOneDevice);

devicesRouter.put('/:id', devicesController.updateDevice);

devicesRouter.delete('/:id', devicesController.deleteDevice);

module.exports = devicesRouter;