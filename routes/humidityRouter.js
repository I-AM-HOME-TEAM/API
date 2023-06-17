/**
 * @swagger
 * tags:
 *   name: Humidity
 *   description: Humidity management
 */

/**
 * @swagger
 * /api/v1/humidity/add:
 *   post:
 *     summary: Add a new humidity
 *     tags: [Humidity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: integer
 *                 description: The ID of the device the humidity reading is from
 *               humidity:
 *                 type: number
 *                 description: The humidity reading
 *     responses:
 *       200:
 *         description: Successfully added a new humidity
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/humidity/getAll:
 *   get:
 *     summary: Get all humidities
 *     tags: [Humidity]
 *     responses:
 *       200:
 *         description: Successfully retrieved all humidities
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/humidity/{id}:
 *   get:
 *     summary: Get a single humidity by ID
 *     tags: [Humidity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the humidity to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the humidity
 *       404:
 *         description: Humidity not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a single humidity by ID
 *     tags: [Humidity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the humidity to update
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
 *                 description: The ID of the device the humidity reading is from
 *               humidity:
 *                 type: number
 *                 description: The updated humidity reading
 *     responses:
 *       200:
 *         description: Successfully updated the humidity
 *       400:
 *         description: Bad request
 *       404:
 *         description: Humidity not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a single humidity by ID
 *     tags: [Humidity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the humidity to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the humidity
 *       404:
 *         description: Humidity not found
 *       500:
 *         description: Internal server error
 */

const humidityController = require('../controllers/humidityController');
const {body} = require("express-validator");
const authenticateToken = require("../middlewares/authenticateToken");
const Device = require("../models/device");
const sequelize = require("../database");
const humidityRouter = require('express').Router();

humidityRouter.post('/humidity-statistics', [
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

        const query = 'SELECT * FROM humidities WHERE device_id = :deviceId AND created_at >= :startTime AND created_at <= :endTime ORDER BY created_at ASC';

        const humidityData = await sequelize.query(query, {
            replacements: {
                deviceId,
                startTime,
                endTime: now,
            },
            type: sequelize.QueryTypes.SELECT,
        });

        const calculateAverageHumidity = (humidityData) => {
            if (humidityData.length === 0) {
                return '0';
            }

            const sum = humidityData.reduce((total, { humidity }) => total + humidity, 0);
            const average = sum / humidityData.length;
            const roundedAverage = average.toFixed(0);
            return roundedAverage;
        };

        const averageHumidity = calculateAverageHumidity(humidityData);

        const statistics = {
            humidity: humidityData,
            averageHumidity,
        };

        res.status(200).json(statistics);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while fetching temperature statistics' });
    }
});



humidityRouter.post('/add', humidityController.addHumidity);

humidityRouter.get('/getAll', humidityController.getAllHumidities);



humidityRouter.get('/:id', humidityController.getOneHumidity);

humidityRouter.put('/:id', humidityController.updateHumidity);

humidityRouter.delete('/:id', humidityController.deleteHumidity);

module.exports = humidityRouter;