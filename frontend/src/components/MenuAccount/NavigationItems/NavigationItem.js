import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
  return (
    <li className="menu-account__list-item">
      <NavLink
        to={`/MyProfile/${props.item.replace(/\s+/g, '')}`}
        className="menu-account__link"
        activeClassName="active"
      >
        {props.item}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
