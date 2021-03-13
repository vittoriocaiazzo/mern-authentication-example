import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../store/contexts/AuthContext';
import { useContext } from 'react';

// import UserSubMenu from './MenuItem/UserSubMenu/UserSubMenu';

const NavigationItem = ({ item }) => {
  // const authState = useContext(AuthContext).authState;

  return (
    <li className="menu__list-item">
      <NavLink
        to={`/${item.replace(' ', '')}`}
        className="menu__link"
        activeClassName="active"
      >
        {item}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
