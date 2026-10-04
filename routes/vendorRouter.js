const express = require('express');

const {
    createCategory,
    getAllCategory,
    createSubCategory,
    getAllSubCategory,
    getAllCategoryWiseSubCategory,
    getAllOwnerWiseCategory,
    updateCategory
} = require('../controllers/vendorController');

const _ = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vendor
 *   description: Vendor category and subcategory management
 */

/**
 * @swagger
 * /api/v1/vendor/create/category:
 *   post:
 *     summary: Create a category
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - owner
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               owner:
 *                 type: string
 *                 example: 64f123456789abcdef123456
 *     responses:
 *       201:
 *         description: Category created
 */
_.post('/create/category', createCategory);

/**
 * @swagger
 * /api/v1/vendor/create/subcategory:
 *   post:
 *     summary: Create a subcategory
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - parentCategory
 *             properties:
 *               name:
 *                 type: string
 *                 example: Smartphones
 *               parentCategory:
 *                 type: string
 *                 example: 64f123456789abcdef123456
 *     responses:
 *       201:
 *         description: Subcategory created
 */
_.post('/create/subcategory', createSubCategory);

/**
 * @swagger
 * /api/v1/vendor/all/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: All categories
 */
_.get('/all/category', getAllCategory);

/**
 * @swagger
 * /api/v1/vendor/update/category/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
_.patch('/update/category/:id', updateCategory);

/**
 * @swagger
 * /api/v1/vendor/subcategory:
 *   get:
 *     summary: Get all subcategories
 *     tags: [Vendor]
 *     responses:
 *       200:
 *         description: All subcategories
 */
_.get('/subcategory', getAllSubCategory);

/**
 * @swagger
 * /api/v1/vendor/category/{id}/subcategory:
 *   get:
 *     summary: Get subcategories by category
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: All subcategories belonging to the category
 */
_.get('/category/:id/subcategory', getAllCategoryWiseSubCategory);

/**
 * @swagger
 * /api/v1/vendor/all/user/{id}/category:
 *   get:
 *     summary: Get all categories created by an owner
 *     tags: [Vendor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Owner user ID
 *     responses:
 *       200:
 *         description: All categories and their subcategories created by the owner
 */
_.get('/all/user/:id/category', getAllOwnerWiseCategory);

module.exports = _;