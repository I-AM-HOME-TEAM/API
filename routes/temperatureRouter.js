/**
 * @swagger
 * tags:
 *   name: Temperature
 *   description: Temperature management
 */

/**
 * @swagger
 * /api/v1/temperature/add:
 *   post:
 *     summary: Add a new temperature
 *     tags: [Temperature]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: integer
 *                 description: The ID of the device the temperature reading is from
 *               temperature:
 *                 type: number
 *                 description: The temperature reading
 *     responses:
 *       200:
 *         description: Successfully added a new temperature
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/temperature/getAll:
 *   get:
 *     summary: Get all temperatures
 *     tags: [Temperature]
 *     responses:
 *       200:
 *         description: Successfully retrieved all temperatures
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/temperature/{id}:
 *   get:
 *     summary: Get a single temperature by ID
 *     tags: [Temperature]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the temperature to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the temperature
 *       404:
 *         description: Temperature not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a single temperature by ID
 *     tags: [Temperature]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the temperature to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: integer
 *                 description: The ID of the device the temperature reading is from
 *               temperature:
 *                 type: number
 *                 description: The updated temperature reading
 *     responses:
 *       200:
 *         description: Successfully updated the temperature
 *       400:
 *         description: Bad request
 *       404:
 *         description: Temperature not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a single temperature by ID
 *     tags: [Temperature]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the temperature to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the temperature
 *       404:
 *         description: Temperature not found
 *       500:
 *         description: Internal server error
 */

const temperatureController = require('../controllers/temperatureController');
const { body } = require('express-validator');
const authenticateToken = require("../middlewares/authenticateToken");
const Device = require('../models/device');
const sequelize = require("../database");
const temperatureRouter = require('express').Router();

temperatureRouter.post('/temperature-statistics', [
    // Validation middleware for request body
    body('delay').isInt().toInt(),
], authenticateToken, async (req, res) => {
    try {
        const { delay } = req.body;
        const { id: userId } = req.user;

        const device = await Device.findOne({ where: { user_id: userId } });
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

        const { id: deviceId } = device;

        const now = new Date();
        const startTime = new Date(now.getTime() - delay * 60000);

        const query = 'SELECT * FROM temperatures WHERE device_id = :deviceId AND created_at >= :startTime AND created_at <= :endTime ORDER BY created_at ASC';

        const temperatureData = await sequelize.query(query, {
            replacements: {
                deviceId,
                startTime,
                endTime: now,
            },
            type: sequelize.QueryTypes.SELECT,
        });

        const calculateAverageTemperature = (temperatureData) => {
            if (temperatureData.length === 0) {
                return '0';
            }

            const sum = temperatureData.reduce((total, { temperature }) => total + temperature, 0);
            const average = sum / temperatureData.length;
            const roundedAverage = average.toFixed(0);
            return roundedAverage;
        };

        const averageTemperature = calculateAverageTemperature(temperatureData);

        const statistics = {
            temperature: temperatureData,
            averageTemperature,
        };

        res.status(200).json(statistics);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while fetching temperature statistics' });
    }
});



temperatureRouter.post('/add', temperatureController.addTemperature);

temperatureRouter.get('/getAll', temperatureController.getAllTemperatures);



temperatureRouter.get('/:id', temperatureController.getOneTemperature);

temperatureRouter.put('/:id', temperatureController.updateTemperature);

temperatureRouter.delete('/:id', temperatureController.deleteTemperature);

module.exports = temperatureRouter;