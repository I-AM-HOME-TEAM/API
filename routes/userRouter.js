const userController = require('../controllers/userController');

const userRouter = require('express').Router();

userRouter.post('/add', userController.addUser);

userRouter.get('/getAll', userController.getAllUsers);



userRouter.get('/:id', userController.getOneUser);

userRouter.put('/:id', userController.updateUser);

userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;