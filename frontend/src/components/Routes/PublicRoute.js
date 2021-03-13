import { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../store/contexts/AuthContext';
import { CLEAR } from '../../store/actions/actionTypes';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { authState, dispatch } = useContext(AuthContext);
  const [history, setHistory] = useState();

  useEffect(() => {
    const location = { ...rest }.location.pathname;
    if (history !== location) {
      dispatch({ type: CLEAR });
      setHistory(location);
    }
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isLoggedIn ? (
          <Redirect to={'/Home'} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
