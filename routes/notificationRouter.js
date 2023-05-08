const notificationController = require('../controllers/notificationController');

const notificationRouter = require('express').Router();

notificationRouter.post('/add', notificationController.addNotification);

notificationRouter.get('/getAll', notificationController.getAllNotifications);



notificationRouter.get('/:id', notificationController.getOneNotification);

notificationRouter.put('/:id', notificationController.updateNotification);

notificationRouter.delete('/:id', notificationController.deleteNotification);

module.exports = notificationRouter;