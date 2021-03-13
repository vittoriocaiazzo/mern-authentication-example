import { useContext } from 'react';
import { AuthContext } from '../../../store/contexts/AuthContext';

import LoggedOutItems from './LoggedOutItems';
import LoggedInItems from './LoggedInItems';

const UserItems = () => {
  const authState = useContext(AuthContext).authState;

  return authState.isLoggedIn ? (
    <LoggedInItems username={authState.user.username} />
  ) : (
    <LoggedOutItems />
  );
};

export default UserItems;
