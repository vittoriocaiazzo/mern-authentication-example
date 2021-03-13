import * as actionTypes from '../actions/actionTypes';

export const authReducer = (state, action) => {
  switch (action.type) {
    // request
    case actionTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    // success

    case actionTypes.SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        errorMessage: '',
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        message: action.payload.message,
        errorMessage: '',
        isLoggedIn: true,
      };

    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        isLoading: false,
        isLoggedIn: false,
        message: '',
        errorMessage: '',
      };

    // fail
    case actionTypes.FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };

    // various
    case actionTypes.IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        user: action.payload.user,
      };
    case actionTypes.IS_LOGGED_OUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        isLoading: false,
      };

    case actionTypes.CLEAR:
      return {
        ...state,
        message: '',
        errorMessage: '',
      };
  }
};
