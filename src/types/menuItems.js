import { elementType, func, string } from 'prop-types';

const MenuItems = {
  label: string,
  handle: func,
  link: string,
  imgComponent: elementType,
};

export default MenuItems;
