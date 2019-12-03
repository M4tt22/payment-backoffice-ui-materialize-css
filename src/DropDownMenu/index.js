import { arrayOf, object, shape, string } from 'prop-types';
import { ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { Component } from 'react';

import MenuItems from '../types/menuItems';

const useStyles = theme => ({});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: '#D3D4D5',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleDoubleAction = (event, menuItem) => {
    this.handleClose();
    if (typeof menuItem.handle === 'function') {
      menuItem.handle(event, menuItem.link);
    }
  };
  renderMenuItem = (menuItem, key) => (
    <StyledMenuItem key={key} onClick={event => this.handleDoubleAction(event, menuItem)}>
      <ListItemText primary={menuItem.label} />
    </StyledMenuItem>
  );

  renderMenu = () => {
    const { anchorEl } = this.state;
    const { menuItems } = this.props;
    return (
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
      >
        {menuItems.map((element, index) => this.renderMenuItem(element, index))}
      </StyledMenu>
    );
  };

  render() {
    const { menuLabel } = this.props;

    return (
      <div>
        <ListItem style={{ right: 0, top: 5 }} button onClick={this.handleClick}>
          <ListItemText primary={menuLabel} />
          <ArrowDropDownIcon />
        </ListItem>
        {this.renderMenu()}
      </div>
    );
  }
}

DropDownMenu.defaultProps = {
  menuItems: {},
  menuLabel: '',
  classes: {},
};
DropDownMenu.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: object.isRequired,
  menuItems: arrayOf(shape(MenuItems)),
  menuLabel: string,
};

export default withStyles(useStyles, { withTheme: true })(DropDownMenu);
