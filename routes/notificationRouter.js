/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification management
 */

/**
 * @swagger
 * /api/v1/notification/add:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               message:
 *                 type: string
 *               open_ai_log_id:
 *                 type: integer
 *               type:
 *                 type: string
 *             example:
 *               user_id: 1
 *               message: "New message"
 *               open_ai_log_id: 2
 *               type: "Email"
 *     responses:
 *       200:
 *         description: Notification created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/notification/getAll:
 *   get:
 *     summary: Retrieve all notifications
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Returns a list of all notifications
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/notification/{id}:
 *   get:
 *     summary: Retrieve a notification by ID
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a notification object
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a notification by ID
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to update
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
 *               message:
 *                 type: string
 *               open_ai_log_id:
 *                 type: integer
 *               type:
 *                 type: string
 *             example:
 *               user_id: 1
 *               message: "New message"
 *               open_ai_log_id: 2
 *               type: "Email"
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a notification by ID
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */

const notificationController = require('../controllers/notificationController');

const notificationRouter = require('express').Router();

notificationRouter.post('/add', notificationController.addNotification);

notificationRouter.get('/getAll', notificationController.getAllNotifications);



notificationRouter.get('/:id', notificationController.getOneNotification);

notificationRouter.put('/:id', notificationController.updateNotification);

notificationRouter.delete('/:id', notificationController.deleteNotification);

module.exports = notificationRouter;