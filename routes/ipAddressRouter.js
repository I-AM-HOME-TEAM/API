const ipAddressController = require('../controllers/ipAddressController');

const ipAddressRouter = require('express').Router();

ipAddressRouter.post('/add', ipAddressController.addIp);

ipAddressRouter.get('/getAll', ipAddressController.getAllIp);



ipAddressRouter.get('/:id', ipAddressController.getOneIp);

ipAddressRouter.put('/:id', ipAddressController.updateIp);

ipAddressRouter.delete('/:id', ipAddressController.deleteIp);

module.exports = ipAddressRouter;