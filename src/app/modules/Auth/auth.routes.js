const validateRequest = require('../../middleware/validateRequest');
const AuthController = require('./auth.controller');
const { loginSchema, registerSchema, resendVerificationSchema, resetPasswordSchema } = require('./auth.validation');

const router = require('express').Router();
router.post('/login', validateRequest(loginSchema), AuthController.login);
router.post('/register', validateRequest(registerSchema), AuthController.register);
router.get('/verify-email', AuthController.verfiyEmail);
router.post('/resend-verification', validateRequest(resendVerificationSchema), AuthController.resendVerification);
router.post('/forgot-password', validateRequest(resendVerificationSchema), AuthController.forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema), AuthController.resetPassword);

const authRoutes = router;
module.exports = authRoutes;
/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     accessToken:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test User"
 *               phone:
 *                 type: string
 *                 example: "01700000000"
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: User already exists
 */

/**
 * @openapi
 * /auth/verify-email:
 *   get:
 *     tags: [Auth]
 *     summary: Verify user email
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token sent to email
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Token invalid or user already verified
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /auth/resend-verification:
 *   post:
 *     tags: [Auth]
 *     summary: Resend verification email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *     responses:
 *       200:
 *         description: Verification email sent
 *       400:
 *         description: User already verified
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Send password reset link to email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password using token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - token
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *               token:
 *                 type: string
 *                 example: "jwt_reset_token_here"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid or expired token
 */
