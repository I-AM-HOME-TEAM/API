/**
 * @swagger
 * tags:
 *   name: OpenAI Logs
 *   description: OpenAI logs management
 */

/**
 * @swagger
 * /api/v1/openailogs/add:
 *   post:
 *     summary: Add a new OpenAI log
 *     tags: [OpenAI Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request:
 *                 type: string
 *                 description: The request sent to OpenAI
 *               response:
 *                 type: string
 *                 description: The response received from OpenAI
 *             required:
 *               - request
 *               - response
 *     responses:
 *       '201':
 *         description: OpenAI log added successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/openailogs/getAll:
 *   get:
 *     summary: Retrieve all OpenAI logs
 *     tags: [OpenAI Logs]
 *     responses:
 *       '200':
 *         description: An array of OpenAI log objects
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/openailogs/{id}:
 *   get:
 *     summary: Retrieve an OpenAI log by ID
 *     tags: [OpenAI Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the OpenAI log to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: An OpenAI log object
 *       '404':
 *         description: OpenAI log not found
 *       '500':
 *         description: Internal server error
 *
 *   put:
 *     summary: Update an existing OpenAI log
 *     tags: [OpenAI Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the OpenAI log to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request:
 *                 type: string
 *                 description: The updated request sent to OpenAI
 *               response:
 *                 type: string
 *                 description: The updated response received from OpenAI
 *             required:
 *               - request
 *               - response
 *     responses:
 *       '200':
 *         description: OpenAI log updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: OpenAI log not found
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete an OpenAI log
 *     tags: [OpenAI Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the OpenAI log to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OpenAI log deleted successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: OpenAI log not found
 *       '500':
 *         description: Internal server error
 */

const openAiLogsController = require('../controllers/openAiLogsController');

const openAiLogsRouter = require('express').Router();

openAiLogsRouter.post('/add', openAiLogsController.addOpenAiLog);

openAiLogsRouter.get('/getAll', openAiLogsController.getAllOpenAiLogs);



openAiLogsRouter.get('/:id', openAiLogsController.getOneOpenAiLog);

openAiLogsRouter.put('/:id', openAiLogsController.updateOpenAiLog);

openAiLogsRouter.delete('/:id', openAiLogsController.deleteOpenAiLog);

module.exports = openAiLogsRouter;