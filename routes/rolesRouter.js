const rolesController = require('../controllers/rolesController');

const rolesRouter = require('express').Router();

rolesRouter.post('/add', rolesController.addRole);

rolesRouter.get('/getAll', rolesController.getAllRoles);



rolesRouter.get('/:id', rolesController.getOneRole);

rolesRouter.put('/:id', rolesController.updateRole);

rolesRouter.delete('/:id', rolesController.deleteRole);

module.exports = rolesRouter;