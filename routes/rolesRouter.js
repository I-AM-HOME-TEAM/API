/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Operations related to user roles
 */

/**
 * @swagger
 * /api/v1/roles/add:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: A successful response indicating the newly created role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the created role
 *                 name:
 *                   type: string
 *                   description: Name of the created role
 *       400:
 *         description: Bad request indicating the required parameters are missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/roles/getAll:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: A successful response indicating all the roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID of the role
 *                   name:
 *                     type: string
 *                     description: Name of the role
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   get:
 *     summary: Get a single role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the role
 *     responses:
 *       200:
 *         description: A successful response indicating the role matching the ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the role
 *                 name:
 *                   type: string
 *                   description: Name of the role
 *       400:
 *         description: Bad request indicating the required parameters are missing or invalid
 *       404:
 *         description: Not found indicating the role with the given ID was not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update an existing role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: A successful response indicating the updated role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the updated role
 *                 name:
 *                   type: string
 *                   description: Name of the updated role
 *       400:
 *         description: Bad request indicating the required parameters are missing or invalid
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a role by ID
 *     description: Delete a role and all related data by their ID.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the role to delete.
 *     responses:
 *       204:
 *         description: Role and related data deleted successfully.
 *       404:
 *         description: Role with the specified ID was not found.
 *       500:
 *         description: An error occurred while deleting the role and related data.
 */

const rolesController = require('../controllers/rolesController');

const rolesRouter = require('express').Router();

rolesRouter.post('/add', rolesController.addRole);

rolesRouter.get('/getAll', rolesController.getAllRoles);



rolesRouter.get('/:id', rolesController.getOneRole);

rolesRouter.put('/:id', rolesController.updateRole);

rolesRouter.delete('/:id', rolesController.deleteRole);

module.exports = rolesRouter;