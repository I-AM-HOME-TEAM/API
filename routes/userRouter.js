/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/v1/users/add:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully added the user
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/users/getAll:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user and all related data by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete.
 *     responses:
 *       204:
 *         description: User and related data deleted successfully.
 *       404:
 *         description: User with the specified ID was not found.
 *       500:
 *         description: An error occurred while deleting the user and related data.
 */

const userController = require('../controllers/userController');
const passport = require("passport");
const userRouter = require('express').Router();

userRouter.post('/add', passport.authenticate("jwt", { session: false }), userController.addUser);

userRouter.get('/getAll', passport.authenticate("jwt", { session: false }), userController.getAllUsers);



userRouter.get('/:id', passport.authenticate("jwt", { session: false }), userController.getOneUser);

userRouter.put('/:id', passport.authenticate("jwt", { session: false }), userController.updateUser);

userRouter.delete('/:id', passport.authenticate("jwt", { session: false }), userController.deleteUser);

module.exports = userRouter;