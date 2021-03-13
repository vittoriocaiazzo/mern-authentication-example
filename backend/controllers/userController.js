const userModel = require('../models/userModel');
const GlobalError = require('../services/GlobalError');

exports.getMyProfile = (req, res) => {
  res.status(200).send({
    status: 'success',
    user: req.user,
  });
};

exports.getAllUsers = async (req, res) => {
  // getting all the users from the db
  const users = await userModel.find({});

  // sending the response
  res.status(200).send({
    status: 'success',
    users,
  });
};

exports.deleteMyAccount = async (req, res, next) => {
  try {
    // getting the user from the request
    const user = req.user;

    // searching for the user
    const dbUser = await userModel.findById(user._id).select('+password');

    // checking if the password is correct
    if (!(await user.checkPassword(req.body.password, dbUser.password)))
      return next(new GlobalError('Incorrect password', 400));

    // deleting the user
    await userModel.findByIdAndDelete(user._id);

    // removing the cookie
    res.cookie('jwt', 'deleted', {
      maxAge: '1',
      httpOnly: true,
    });

    // sending the response
    res.status(200).send({
      status: 'success',
      message: 'Your account was deleted',
    });
  } catch (e) {
    next(e);
  }
};

exports.deleteAccount = async (req, res) => {
  // searching the user and deleting it
  await userModel.findOneAndRemove({ email: req.body.userEmail });

  // sending the response
  res.status(200).send({
    status: 'success',
    message: 'The user was deleted',
  });
};

exports.changeName = async (req, res) => {
  // getting the user from the request
  const user = await userModel.findById(req.user._id);

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  await user.save();

  // sending the response
  res.status(200).send({
    status: 'success',
    message: 'You successfully changed your name.',
  });
};
