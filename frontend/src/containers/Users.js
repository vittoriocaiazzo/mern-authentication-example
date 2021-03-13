import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
import { getAllUsers } from '../services/user';
import { deleteUserAction } from '../store/actions/userActions';

// importing components
import User from '../components/User/User';
import Loading from '../components/Loading/Loading';

const Users = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const [users, setUsers] = useState();

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data.users));
  }, []);

  const onClick = (email) => {
    deleteUserAction(dispatch, email);
    getAllUsers().then((res) => setUsers(res.data.users));
  };

  return (
    <div className="users">
      {users &&
        users.map((user) => (
          <User key={user.email} user={user} onClick={onClick} />
        ))}
      {authState.isLoading && <Loading />}
    </div>
  );
};

export default Users;
