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
 *               name:
 *                 type: string
 *                 description: The name of the device
 *               type:
 *                 type: string
 *                 description: The type of the device
 *               mpn:
 *                  type: string
 *                  description: Device MPN
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
 *               name:
 *                 type: string
 *                 description: The name of the device
 *               type:
 *                 type: string
 *                 description: The type of the device
 *               mpn:
 *                  type: string
 *                  description: Device MPN
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

const authenticateToken = require('../middlewares/authenticateToken');

const Device = require('../models/device');

devicesRouter.post('/add-device-by-mpn', authenticateToken, (req, res) => {
    const { mpn } = req.body;
    const userId = req.user.id;

    // Check if a device with the provided MPN exists
    Device.findOne({ where: { mpn } })
        .then(async device => {
            if (!device) {
                return res.status(404).json({ message: 'Device not found' });
            }

            if (device.user_id === userId) {
                return res.status(400).json({ message: 'You already have this device' });
            }

            // Assign the device to the authenticated user
            device.user_id = userId;
            await device.save();

            // Return the updated device with the user_id assigned
            const { id, name, type, user_id } = device;
            const updatedDevice = { id, user_id, name, type };
            return res.status(200).json({ device: updatedDevice });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        });
});

devicesRouter.post('/add', devicesController.addDevice);

devicesRouter.get('/getAll', devicesController.getAllDevices);



devicesRouter.get('/:id', devicesController.getOneDevice);

devicesRouter.put('/:id', devicesController.updateDevice);

devicesRouter.delete('/:id', devicesController.deleteDevice);

module.exports = devicesRouter;