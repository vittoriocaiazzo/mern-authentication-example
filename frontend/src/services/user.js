import axios from 'axios';

const config = {
  withCredentials: true,
};

const getMe = async (user) => await axios.get('/api/v1/user/myProfile', config);

const getAllUsers = async () =>
  await axios.get('/api/v1/user/allUsers', config);

const changeName = async (names) =>
  await axios.patch('/api/v1/user/changeName', names, config);

const deleteMe = async (password) =>
  axios.delete('/api/v1/user/deleteMyAccount', {
    headers: {
      withCredentials: true,
    },
    data: {
      password,
    },
  });

const deleteUser = async (userEmail) =>
  axios.delete('/api/v1/user/deleteAccount', {
    headers: {
      withCredentials: true,
    },
    data: {
      userEmail,
    },
  });

export { getMe, getAllUsers, deleteMe, deleteUser, changeName };
