import { NavLink } from 'react-router-dom';

const LoggedInItems = (props) => {
  return (
    <ul className="menu__list">
      <li className="menu__list-useritem">
        {props.username}
        <ul className="submenu">
          <li className="submenu__list-item">
            <NavLink
              to="/MyProfile"
              className="submenu__link"
              activeClassName="active"
            >
              My Profile
            </NavLink>
          </li>
          <li className="submenu__list-item">
            <NavLink
              to="/Logout"
              className="submenu__link"
              activeClassName="active"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default LoggedInItems;
