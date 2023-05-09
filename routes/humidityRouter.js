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

const humidityRouter = require('express').Router();

humidityRouter.post('/add', humidityController.addHumidity);

humidityRouter.get('/getAll', humidityController.getAllHumidities);



humidityRouter.get('/:id', humidityController.getOneHumidity);

humidityRouter.put('/:id', humidityController.updateHumidity);

humidityRouter.delete('/:id', humidityController.deleteHumidity);

module.exports = humidityRouter;