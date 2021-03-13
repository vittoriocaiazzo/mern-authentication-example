import {
  login,
  signup,
  isLoggedin,
  signupConfirmation,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
} from '../../services/auth';
import * as actionTypes from './actionTypes';

const fail = (e, dispatch) => {
  dispatch({
    type: actionTypes.FAIL,
    payload: { errorMessage: e.response.data.message },
  });
};

// success
export const signupAction = async (dispatch, user) => {
  dispatch({ type: actionTypes.REQUEST });

  signup(user)
    .then((res) =>
      dispatch({
        type: actionTypes.SUCCESS,
        payload: { message: res.data.message },
      })
    )
    .catch((e) => fail(e, dispatch));
};

export const isLoggedIn = (dispatch) => {
  isLoggedin()
    .then((res) => {
      dispatch({
        type: actionTypes.IS_LOGGED_IN,
        payload: { user: res.data.user },
      });
    })
    .catch((e) => {
      dispatch({ type: actionTypes.IS_LOGGED_OUT });
      localStorage.clear();
    });
};

export const loginAction = (dispatch, user) => {
  dispatch({ type: actionTypes.REQUEST });

  login(user)
    .then((res) => {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: { user: res.data.user },
      });
      localStorage.setItem('user', JSON.stringify(res.data.user));
    })
    .catch((e) => {
      fail(e, dispatch);
    });
};

export const signupConfirmationAction = (dispatch, confirmationToken) => {
  dispatch({ type: actionTypes.REQUEST });

  signupConfirmation(confirmationToken)
    .then((res) =>
      dispatch({
        type: actionTypes.SUCCESS,
        payload: { message: res.data.message },
      })
    )
    .catch((e) => {
      fail(e, dispatch);
    });
};

export const logoutAction = (dispatch) => {
  dispatch({ type: actionTypes.REQUEST });

  logout()
    .then((res) => {
      dispatch({ type: actionTypes.LOGOUT_SUCCESS });
      localStorage.clear();
    })
    .catch((e) => fail(e, dispatch));
};

export const forgotPasswordAction = (dispatch, email) => {
  dispatch({ type: actionTypes.REQUEST });

  forgotPassword(email)
    .then((res) => {
      dispatch({
        type: actionTypes.SUCCESS,
        payload: { message: res.data.message },
      });
    })
    .catch((e) => {
      fail(e, dispatch);
    });
};

export const resetPasswordAction = (dispatch, resetToken, newPassword) => {
  dispatch({ type: actionTypes.REQUEST });

  resetPassword(resetToken, newPassword)
    .then((res) => {
      dispatch({
        type: actionTypes.SUCCESS,
        payload: { message: res.data.message },
      });
    })
    .catch((e) => {
      fail(e, dispatch);
    });
};

export const changePasswordAction = (dispatch, passwords) => {
  dispatch({ type: actionTypes.REQUEST });

  changePassword(passwords)
    .then((res) =>
      dispatch({
        type: actionTypes.SUCCESS,
        payload: { message: res.data.message },
      })
    )
    .catch((e) => fail(e, dispatch));
};
