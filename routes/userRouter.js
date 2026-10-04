const express = require('express');
const { userController, updateUserProfile } = require('../controllers/userController');

const _ = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/v1/user/alluser:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       500:
 *         description: Server error
 */
_.get('/alluser', userController);

/**
 * @swagger
 * /api/v1/user/updateprofile/{id}:
 *   post:
 *     summary: Update user profile
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: "01712345678"
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
_.post('/updateprofile/:id', updateUserProfile);

module.exports = _;