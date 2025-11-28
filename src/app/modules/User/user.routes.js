const auth = require('../../middleware/auth');
const validateRequest = require('../../middleware/validateRequest');
const UserController = require('./user.controller');

const router = require('express').Router();
const { createUserValidation, updateAccountStatusValidation } = require('./user.validation');

router.get('/', auth('superAdmin', 'admin'), UserController.users);
router.post('/', auth('superAdmin'),validateRequest(createUserValidation), UserController.createUser);
router.patch('/:id', auth('superAdmin'), UserController.updateUser);
router.patch('/:id/status', auth('superAdmin'),validateRequest(updateAccountStatusValidation), UserController.updateAccountStatus);
router.delete('/:id', auth('superAdmin'), UserController.deleteUser);

const userRoutes = router;
module.exports = userRoutes;

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User Management (Admin Only)
 */

/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users (Admin/SuperAdmin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or phone
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user (SuperAdmin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 example: "01712345678"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update user information (SuperAdmin only)
 *     security:
 *       - bearerAuth: []
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
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               phone:
 *                 type: string
 *                 example: "01700000000"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /users/{id}/status:
 *   patch:
 *     tags: [Users]
 *     summary: Update user account status (SuperAdmin only)
 *     security:
 *       - bearerAuth: []
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, disabled]
 *                 example: "disabled"
 *     responses:
 *       200:
 *         description: Account status updated successfully
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user (SuperAdmin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
