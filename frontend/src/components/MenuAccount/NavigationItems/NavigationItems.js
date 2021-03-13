import NavigationItem from './NavigationItem';

const NavigationItems = () => {
  const items = ['My Personal Data', 'Delete Account'];

  return (
    <ul className="menu-account__list">
      {items.map((item) => (
        <NavigationItem key={item} item={item} />
      ))}
    </ul>
  );
};

export default NavigationItems;
