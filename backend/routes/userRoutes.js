const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// auth routes
router.post('/signup', authController.signup);
router.get(
  '/signupConfirmation/:confirmationToken',
  authController.confirmSignup
);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:resetToken', authController.resetPassword);

// granting access for private routes
router.use(authController.private);

// private auth routes
router.patch('/changePassword', authController.changePassword);
router.get('/isLoggedin', authController.isLoggedin);

// private user routes
router.get('/myProfile', userController.getMyProfile);
router.patch('/changeName', userController.changeName);
router.delete('/deleteMyAccount', userController.deleteMyAccount);

// middleware for limiting access to admins
router.use(authController.permissionToAdmin);

// user routes
router.get('/allUsers', userController.getAllUsers);
router.delete('/deleteAccount', userController.deleteAccount);

module.exports = router;
