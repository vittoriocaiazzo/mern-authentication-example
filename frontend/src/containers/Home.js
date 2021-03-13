import { useEffect, useContext } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
import { CLEAR } from '../store/actions/actionTypes';
import { isLoggedIn } from '../store/actions/authActions';

const Home = () => {
  const { authState, dispatch } = useContext(AuthContext);

  // clearing messages received from the server and checking if the user is already logged in
  useEffect(() => {
    dispatch({ type: CLEAR });
    isLoggedIn(dispatch);
  }, []);

  return (
    <div className="home">
      <div className="home__status">
        {authState.isLoggedIn ? 'YOU ARE LOGGED IN' : 'YOU ARE LOGGED OUT'}
      </div>
    </div>
  );
};

export default Home;
