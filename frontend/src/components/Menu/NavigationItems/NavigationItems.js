import { useContext } from 'react';
import { AuthContext } from '../../../store/contexts/AuthContext';

// importing components
import NavigationItem from './NavigationItem';

const NavigationItems = () => {
  const authState = useContext(AuthContext).authState;

  const items = [
    'Home',
    authState.isLoggedIn && authState.user.role === 'admin'
      ? 'Users'
      : undefined,
  ];

  return (
    <ul className="menu__list">
      {items.map((item) => item && <NavigationItem key={item} item={item} />)}
    </ul>
  );
};

export default NavigationItems;
