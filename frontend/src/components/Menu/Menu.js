// importing components
import NavigationItems from './NavigationItems/NavigationItems';
import UserItems from './UserItems/UserItems';

const Menu = () => {
  return (
    <nav className="menu">
      <NavigationItems />
      <UserItems />
    </nav>
  );
};

export default Menu;
