const userSettingsController = require('../controllers/userSettingsController');

const userSettingsRouter = require('express').Router();

userSettingsRouter.post('/add', userSettingsController.addUserSettings);

userSettingsRouter.get('/getAll', userSettingsController.getAllUsersSettings);



userSettingsRouter.get('/:id', userSettingsController.getOneUserSetting);

userSettingsRouter.put('/:id', userSettingsController.updateUserSettings);

userSettingsRouter.delete('/:id', userSettingsController.deleteUserSettings);

module.exports = userSettingsRouter;