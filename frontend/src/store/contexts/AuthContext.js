import { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';

export const AuthContext = createContext();

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  isLoading: false,
  isLoggedIn: localStorage.getItem('user') ? true : false,
  message: '',
  errorMessage: '',
};

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
