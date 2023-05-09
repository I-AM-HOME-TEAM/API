/**
 * @swagger
 * tags:
 *   name: IpAddresses
 *   description: IP addresses management
 */

/**
 * @swagger
 * /api/v1/ipaddress/add:
 *   post:
 *     summary: Create a new IP address.
 *     tags: [IpAddresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user associated with this IP address.
 *               ip:
 *                 type: string
 *                 description: The IP address.
 *               user_agent:
 *                 type: string
 *                 description: The user agent of the client associated with this IP address.
 *             example:
 *               user_id: 1
 *               ip: "192.168.1.1"
 *               user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
 *     responses:
 *       200:
 *         description: Successfully created a new IP address.
 *       400:
 *         description: Invalid request body or user ID.
 *       500:
 *         description: Failed to create the IP address.
 */

/**
 * @swagger
 * /api/v1/ipaddress/getAll:
 *   get:
 *     summary: Retrieve all IP addresses.
 *     tags: [IpAddresses]
 *     responses:
 *       200:
 *         description: Successfully retrieved all IP addresses.
 *       500:
 *         description: Failed to retrieve the IP addresses.
 */

/**
 * @swagger
 * /api/v1/ipaddress/{id}:
 *   get:
 *     summary: Retrieve an IP address by ID.
 *     tags: [IpAddresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the IP address.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the IP address.
 *       404:
 *         description: IP address not found.
 *       500:
 *         description: Failed to retrieve the IP address.
 *
 *   put:
 *     summary: Update an existing IP address.
 *     tags: [IpAddresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the IP address.
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
 *                 description: The ID of the user associated with this IP address.
 *               ip:
 *                 type: string
 *                 description: The IP address.
 *               user_agent:
 *                 type: string
 *                 description: The user agent of the client associated with this IP address.
 *             example:
 *               user_id: 1
 *               ip: "192.168.1.1"
 *               user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
 *     responses:
 *       200:
 *         description: Successfully updated the IP address.
 *       404:
 *         description: IP address not found.
 *       500:
 *         description: Failed to retrieve the IP address.
 *
 *   delete:
 *     summary: Delete IP Address by ID
 *     tags: [IpAddresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the IP address.
 *       404:
 *         description: IP address not found.
 *       500:
 *         description: Failed to retrieve the IP address.
 */

const ipAddressController = require('../controllers/ipAddressController');

const ipAddressRouter = require('express').Router();

ipAddressRouter.post('/add', ipAddressController.addIp);

ipAddressRouter.get('/getAll', ipAddressController.getAllIp);



ipAddressRouter.get('/:id', ipAddressController.getOneIp);

ipAddressRouter.put('/:id', ipAddressController.updateIp);

ipAddressRouter.delete('/:id', ipAddressController.deleteIp);

module.exports = ipAddressRouter;