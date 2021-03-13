import axios from 'axios';

const config = {
  withCredentials: true,
};

const isLoggedin = async () =>
  await axios.get('/api/v1/user/isLoggedin', config);

const signup = async (user) => await axios.post('/api/v1/user/signup', user);

const signupConfirmation = async (confirmationToken) =>
  await axios.get(`/api/v1/user/signupConfirmation/${confirmationToken}`);

const login = async (user) =>
  await axios.post('/api/v1/user/login', user, config);

const logout = async () => await axios.get('/api/v1/user/logout', config);

const changePassword = async (passwords) =>
  await axios.patch('/api/v1/user/changePassword', passwords, config);

const forgotPassword = async (email) =>
  await axios.post('/api/v1/user/forgotPassword', { email }, config);

const resetPassword = async (resetToken, newPassword) =>
  await axios.patch(
    `/api/v1/user/resetPassword/${resetToken}`,
    newPassword,
    config
  );

export {
  isLoggedin,
  login,
  signup,
  signupConfirmation,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
};
