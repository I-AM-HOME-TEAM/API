/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Device management
 */

/**
 * @swagger
 * /api/v1/devices/add:
 *   post:
 *     summary: Create a new device
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user who owns the device
 *               name:
 *                 type: string
 *                 description: The name of the device
 *               type:
 *                 type: string
 *                 description: The type of the device
 *     responses:
 *       201:
 *         description: Device created successfully
 *       400:
 *         description: Bad request, missing or invalid fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/devices/getAll:
 *   get:
 *     summary: Get a list of all devices
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: List of devices retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/devices/{id}:
 *   get:
 *     summary: Get a device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the device to get
 *     responses:
 *       200:
 *         description: Device retrieved successfully
 *       404:
 *         description: Device not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the device to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user who owns the device
 *               name:
 *                 type: string
 *                 description: The name of the device
 *               type:
 *                 type: string
 *                 description: The type of the device
 *     responses:
 *       200:
 *         description: Device updated successfully
 *       400:
 *         description: Bad request, missing or invalid fields
 *       404:
 *         description: Device not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the device to delete
 *     responses:
 *       204:
 *         description: Device deleted successfully
 *       404:
 *         description: Device not found
 *       500:
 *         description: Internal server error
 */

const devicesController = require('../controllers/devicesController');

const devicesRouter = require('express').Router();

devicesRouter.post('/add', devicesController.addDevice);

devicesRouter.get('/getAll', devicesController.getAllDevices);



devicesRouter.get('/:id', devicesController.getOneDevice);

devicesRouter.put('/:id', devicesController.updateDevice);

devicesRouter.delete('/:id', devicesController.deleteDevice);

module.exports = devicesRouter;