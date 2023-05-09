/**
 * @swagger
 * tags:
 *   name: DeviceSettings
 *   description: Device settings management
 */

/**
 * @swagger
 * /api/v1/deviceSettings/add:
 *   post:
 *     summary: Add a new device setting
 *     tags: [DeviceSettings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user associated with the device setting
 *               device_id:
 *                 type: integer
 *                 description: The ID of the device associated with the device setting
 *               delay:
 *                 type: integer
 *                 description: The delay in seconds for the device setting
 *     responses:
 *       201:
 *         description: Device setting added successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Failed to add device setting
 */

/**
 * @swagger
 * /api/v1/deviceSettings/getAll:
 *   get:
 *     summary: Get all device settings
 *     tags: [DeviceSettings]
 *     responses:
 *       200:
 *         description: Returns an array of device settings
 *       500:
 *         description: Failed to get device settings
 */

/**
 * @swagger
 * /api/v1/deviceSettings/{id}:
 *   get:
 *     summary: Get a device setting by ID
 *     tags: [DeviceSettings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the device setting to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the device setting with the specified ID
 *       404:
 *         description: Device setting not found
 *       500:
 *         description: Failed to get device setting
 *
 *   put:
 *     summary: Update a device setting
 *     tags: [DeviceSettings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the device setting to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user associated with the device setting
 *               device_id:
 *                 type: integer
 *                 description: The ID of the device associated with the device setting
 *               delay:
 *                 type: integer
 *                 description: The delay in seconds for the device setting
 *     responses:
 *       200:
 *         description: Device setting updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Device setting not found
 *       500:
 *         description: Failed to update device setting
 *
 *   delete:
 *     summary: Delete a device setting
 *     tags: [DeviceSettings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the device setting to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Device setting deleted successfully
 *       404:
 *         description: Device setting not found
 */

const deviceSettingsController = require('../controllers/deviceSettingsController');

const deviceSettingsRouter = require('express').Router();

deviceSettingsRouter.post('/add', deviceSettingsController.addDeviceSettings);

deviceSettingsRouter.get('/getAll', deviceSettingsController.getAllDeviceSettings);



deviceSettingsRouter.get('/:id', deviceSettingsController.getOneDeviceSetting);

deviceSettingsRouter.put('/:id', deviceSettingsController.updateDeviceSettings);

deviceSettingsRouter.delete('/:id', deviceSettingsController.deleteDeviceSettings);

module.exports = deviceSettingsRouter;