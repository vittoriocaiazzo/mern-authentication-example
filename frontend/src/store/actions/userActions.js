import { changeName, deleteMe, deleteUser } from '../../services/user';
import * as actionTypes from './actionTypes';

const fail = (e, dispatch) => {
  dispatch({
    type: actionTypes.FAIL,
    payload: { errorMessage: e.response.data.message },
  });
};

export const changeNameAction = (dispatch, names) => {
  dispatch({ type: actionTypes.REQUEST });

  changeName(names)
    .then((res) =>
      dispatch({
        type: actionTypes.SUCCESS,
        payload: { message: res.data.message },
      })
    )
    .catch((e) => fail(e, dispatch));
};

export const deleteMeAction = (dispatch, password) => {
  dispatch({ type: actionTypes.REQUEST });

  deleteMe(password)
    .then((res) =>
      dispatch({
        type: actionTypes.LOGOUT_SUCCESS,
        payload: { message: res.data.message },
      })
    )
    .catch((e) => fail(e, dispatch));
};

export const deleteUserAction = (dispatch, email) => {
  dispatch({ type: actionTypes.REQUEST });

  deleteUser(email)
    .then((res) =>
      dispatch({
        type: actionTypes.SUCCESS,
        payload: { message: res.data.message },
      })
    )
    .catch((e) => fail(e, dispatch));
};
