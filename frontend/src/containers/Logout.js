import { useContext, useEffect } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
import { logoutAction } from '../store/actions/authActions';

// importing components
import Loading from '../components/Loading/Loading';

const Logout = (props) => {
  const { authState, dispatch } = useContext(AuthContext);

  // redirecting to /Home after logout
  useEffect(() => {
    logoutAction(dispatch);
    if (!authState.isLoggedIn) props.history.push('/Home');
  });

  return <div>{authState.isLoading && <Loading />}</div>;
};

export default Logout;
