import { NavLink } from 'react-router-dom';

const LoggedOutItems = () => {
  return (
    <ul className="menu__list">
      <li className="menu__list-item">
        <NavLink to="/Login" className="menu__link" activeClassName="active">
          Log In
        </NavLink>
      </li>
      <li className="menu__list-item--btn">
        <NavLink to="/Signup" className="menu__link" activeClassName="active">
          Sign Up
        </NavLink>
      </li>
    </ul>
  );
};

export default LoggedOutItems;
