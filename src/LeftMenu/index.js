import { arrayOf, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Enumerable from 'linq';
import React from 'react';

import MenuItems from '../types/menuItems';
import './LeftMenu.css';

const useStyles = () => ({
  root: {
    width: '100%',
    backgroundColor: '#154360',
    color: '#FFFFFF',
    height: '100% ',
  },
  LstItem: {
    borderLeft: '6px solid white',
    opacity: 0.9,
    color: '#FFFFFF',
  },
  container: {
    backgroundColor: '#154360',
    color: '#FFFFFF',
    width: 200,
    paddingTop: 32,
    height: 'calc(100% - 32px)',
  },

  mainContainer: {
    height: '100%',
    minHeight: '100vh',
  },
  menuItemList: {
    marginTop: 52,
  },
});

class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  componentDidMount() {
    const { menuItems } = this.props;

    const queryResult = Enumerable.from(menuItems)
      .where(x => x.link === window.location.pathname)
      .select(x => x)
      .firstOrDefault();
    if (queryResult != null) {
      this.setState({ selected: queryResult });
    }
  }

  updateSelected(menuItem) {
    this.setState({ selected: menuItem });
  }

  renderMenuItem = (menuItem, index) => {
    const { selected } = this.state;
    const { classes } = this.props;

    return (
      <MenuItem
        button
        key={index}
        className={selected === menuItem ? classes.LstItem : null}
        selected={selected === menuItem}
        onClick={() => this.updateSelected(menuItem)}
        component={Link}
        to={menuItem.link}
      >
        <ListItemIcon>
          <menuItem.imgCompoment style={{ color: '#FFFF' }} />
        </ListItemIcon>
        <ListItemText primary={menuItem.label} />
      </MenuItem>
    );
  };

  render() {
    const { menuItems, classes } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <h4 className='center'>C.Payement</h4>
        <MenuList>
          {menuItems.map((mi, index) => this.renderMenuItem(mi, index))}
        </MenuList>
      </div>
    );
  }
}

LeftMenu.defaultProps = {
  classes: {},
  menuItems: {},
};
LeftMenu.propTypes = {
  menuItems: arrayOf(shape(MenuItems)),
  // eslint-disable-next-line react/forbid-prop-types
  classes: shape({
    field1: string,
    field2: string,
  }),
};
export default withStyles(useStyles)(LeftMenu);
