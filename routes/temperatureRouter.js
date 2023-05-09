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

const temperatureRouter = require('express').Router();

temperatureRouter.post('/add', temperatureController.addTemperature);

temperatureRouter.get('/getAll', temperatureController.getAllTemperatures);



temperatureRouter.get('/:id', temperatureController.getOneTemperature);

temperatureRouter.put('/:id', temperatureController.updateTemperature);

temperatureRouter.delete('/:id', temperatureController.deleteTemperature);

module.exports = temperatureRouter;