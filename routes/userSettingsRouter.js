/**
 * @swagger
 * tags:
 *   name: User Settings
 *   description: User Settings management
 */

/**
 * @swagger
 * /api/v1/userSettings/add:
 *   post:
 *     summary: Add User Settings
 *     tags: [User Settings]
 *     description: Add User Settings for a User
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User Settings object that needs to be added
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *             theme:
 *               type: boolean
 *           required:
 *             - user_id
 *             - theme
 *     responses:
 *       200:
 *         description: User Settings added successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             user_id:
 *               type: integer
 *             theme:
 *               type: boolean
 *             created_at:
 *               type: string
 *               format: date-time
 *             updated_at:
 *               type: string
 *               format: date-time
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/userSettings/getAll:
 *   get:
 *     summary: Get all User Settings
 *     tags: [User Settings]
 *     description: Get all User Settings
 *     responses:
 *       200:
 *         description: User Settings retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               theme:
 *                 type: boolean
 *               created_at:
 *                 type: string
 *                 format: date-time
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/userSettings/{id}:
 *   get:
 *     summary: Get User Settings by ID
 *     tags: [User Settings]
 *     description: Get User Settings by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the User Settings that needs to be retrieved
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User Settings retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             user_id:
 *               type: integer
 *             theme:
 *               type: boolean
 *             created_at:
 *               type: string
 *               format: date-time
 *             updated_at:
 *               type: string
 *               format: date-time
 *       404:
 *         description: User Settings not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update user settings by ID
 *     tags: [User Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user settings to update
 *       - in: body
 *         name: user settings
 *         description: The user settings to update
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *             theme:
 *               type: boolean
 *           required:
 *             - user_id
 *             - theme
 *     responses:
 *       200:
 *         description: User settings updated successfully
 *       404:
 *         description: User settings not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete user settings by ID
 *     tags: [User Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user settings to delete
 *     responses:
 *       200:
 *         description: User settings deleted successfully
 *       404:
 *         description: User settings not found
 *       500:
 *         description: Internal server error
 */

const userSettingsController = require('../controllers/userSettingsController');

const userSettingsRouter = require('express').Router();

userSettingsRouter.post('/add', userSettingsController.addUserSettings);

userSettingsRouter.get('/getAll', userSettingsController.getAllUsersSettings);



userSettingsRouter.get('/:id', userSettingsController.getOneUserSetting);

userSettingsRouter.put('/:id', userSettingsController.updateUserSettings);

userSettingsRouter.delete('/:id', userSettingsController.deleteUserSettings);

module.exports = userSettingsRouter;