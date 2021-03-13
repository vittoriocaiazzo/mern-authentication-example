const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const emailServices = require('../services/emailServices');
const GlobalError = require('../services/GlobalError');

const createConfirmationToken = (id) =>
  jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '10m' });

const createLoginToken = (id) =>
  jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.LOGIN_TOKEN_EXPIRATION,
  });

const createResetToken = (id) =>
  jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '10m' });

const verifyToken = (token) => jwt.verify(token, process.env.JWT_KEY);

const sendConfirmationToken = async (user, req) => {
  const confirmationToken = createConfirmationToken(user._id);

  // sending a confirmation email
  const urlToSend = `${req.protocol}://localhost:3000/SignUpConfirmation/${confirmationToken}`;
  await emailServices.sendConfirmationEmail(user, urlToSend);
};

// signup
exports.signup = async (req, res, next) => {
  try {
    // getting the user data from the request
    const reqUser = { ...req.body };

    // creating the user in the db
    await userModel.create(reqUser);

    // getting the created user from the db and create a confirmation token
    const user = await userModel.findOne({ email: reqUser.email });
    await sendConfirmationToken(user, req);

    // sending the response
    res.status(200).send({
      status: 'success',
      message: 'A confirmation link has been sent to your email address.',
    });
  } catch (e) {
    next(e);
  }
};

exports.confirmSignup = async (req, res, next) => {
  try {
    // getting the token from the url and verifying it
    const decoded = verifyToken(req.params.confirmationToken);

    // checking if there is a user with the decode user id
    const user = await userModel.findById(decoded.id);
    if (!user) return next(new GlobalError('Error confirming the user', 400));

    // activating the user and deleting the confirmation token
    user.active = true;
    await user.save();

    // sending a welcome email
    await emailServices.sendWelcomeEmail(user);

    res.status(200).send({
      status: 'success',
      message: 'The user has been created',
    });
  } catch (e) {
    res.status(400).send({
      status: 'error',
      message: 'The user was not created',
      error: e,
    });
  }
};

// login
exports.login = async (req, res, next) => {
  try {
    // getting the user data from the request
    const reqUser = { ...req.body };

    // checking if the user provided both the email and the password
    if (!reqUser.email) return next(new GlobalError('Email not provided', 400)); // email not provided
    if (!reqUser.password)
      return next(new GlobalError('Password not provided', 400)); // password not provided

    // getting the user from the db
    const user = await userModel
      .findOne({ email: reqUser.email })
      .select('+password');

    // checking if the email is correct
    if (!user) return next(new GlobalError('Incorrect email', 400));

    // checking if the password is correct
    if (!(await user.checkPassword(reqUser.password, user.password)))
      return next(new GlobalError('Incorrect password', 400));

    // removing the password from the user object
    user.password = undefined;

    // checking if the user is active
    if (!user.active) {
      // sending the new confirmation token
      await sendConfirmationToken(user, req);

      // // sending the response if the user is not yet active
      return next(
        new GlobalError('A confirmation link has been sent to the user', 400)
      );
    } else {
      // creating a token for the login
      const token = createLoginToken(user._id);

      // sending the cookie with the token
      res.cookie('jwt', token, {
        maxAge: process.env.LOGIN_COOKIE_EXPIRATION,
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
      });
      // logging in the user and sending the user back if the user is active
      res.status(200).send({
        status: 'success',
        message: 'You are logged in',
        user: {
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.private = async (req, res, next) => {
  try {
    // getting the token from the cookie
    const token = req.cookies.jwt;

    // checking it there is a token
    if (!token) return next(new GlobalError('You are logged out', 400));

    // checking if the token is valid
    const decoded = verifyToken(token);

    // searching for the user
    const user = await userModel.findById(decoded.id);
    if (!user) return next(new GlobalError('The user does not exists', 400));

    // granting access to private routes
    req.user = user;

    next();
  } catch (e) {
    res.status(400).send({
      status: 'error',
      message: 'You are logged out',
      error: e,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    maxAge: '1',
    httpOnly: true,
  });
  res.status(200).json({ status: 'success', message: 'You are logged out.' });
};

exports.changePassword = async (req, res, next) => {
  try {
    // searching for the user
    const user = await userModel.findById(req.user._id).select('+password');

    // checking if there is a user with this id
    if (!user) return next(new GlobalError('The user does not exists', 400));

    // comparing the old password in the db
    if (!(await user.checkPassword(req.body.currentPassword, user.password)))
      return next(new GlobalError('Password incorrect', 400));

    // changing the password
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    await user.save();

    // removing password from output
    user.password = undefined;

    // sending the response
    res.status(200).send({
      status: 'success',
      message: 'Password changed',
      user,
    });
  } catch (e) {
    res.status(400).send({
      status: 'error',
      message: 'Password not changed',
      error: e,
    });
  }
};

// creating a reset token and sending an email for a forgotten password
exports.forgotPassword = async (req, res, next) => {
  try {
    // getting the email from the request
    const userEmail = req.body.email;

    // checking if the user exists in the db
    const user = await userModel.findOne({ email: userEmail });
    if (!user)
      return next(new GlobalError('There is no user with this email', 400));

    // creating a reset token
    const resetToken = createResetToken(user.id);
    // await user.save({ validateBeforeSave: false });

    // sending the email to the user
    const urlToSend = `${req.protocol}://localhost:3000/ResetPassword/${resetToken}`;
    await emailServices.sendResetPasswordEmail(user, urlToSend);

    // send the response
    res.status(200).send({
      status: 'success',
      message: 'The email has been sent to the user.',
    });
  } catch (e) {
    next(e);
  }
};

// resetting the password based on the forgotPassword process
exports.resetPassword = async (req, res, next) => {
  try {
    // getting the token from the url and verifying it
    const decoded = verifyToken(req.params.resetToken);

    // checking if there is a user with the decode user id
    const user = await userModel.findById(decoded.id);
    if (!user) return next(new GlobalError('Error confirming the user', 400));

    // changing the password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // send the response
    res.status(200).send({
      status: 'success',
      message: 'Password reset successfully',
    });
  } catch (e) {
    next(e);
  }
};

// give permission to the admin role
exports.permissionToAdmin = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') next();
    else
      return next(new GlobalError('You are not allowed.', 401, 'Permission'));
  } catch (e) {
    next(e);
  }
};

exports.isLoggedin = async (req, res, next) => {
  res.status(200).send({
    status: 'success',
    message: 'You are logged in',
    user: {
      email: req.user.email,
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
    },
  });
};
