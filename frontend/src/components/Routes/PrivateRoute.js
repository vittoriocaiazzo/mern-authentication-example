import { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../store/contexts/AuthContext';
import { isLoggedIn } from '../../store/actions/authActions';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authState, dispatch } = useContext(AuthContext);
  const [history, setHistory] = useState();

  useEffect(() => {
    const location = { ...rest }.location.pathname;
    if (history !== location) {
      isLoggedIn(dispatch);
      setHistory(location);
    }
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={'/Home'} />
        )
      }
    />
  );
};

export default PrivateRoute;
