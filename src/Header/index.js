import { Avatar, Card, Grid, Tooltip } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { shape, string } from 'prop-types';
import { withRouter} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import DropDownMenu from '../DropDownMenu';
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import UserData from '../types/userData';

const useStyles = theme => ({
  paper: {
    padding: theme.spacing(1),
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
    width: 30,
    height: 30,
  },
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClickMenuItem = (event, url) => {
    const { history } = this.props;
    history.push(url);
  };

  generateMenu = () => [
    { label: 'prodile', handle: this.handleClickMenuItem, link: '/profile' },
    { label: 'toto', handle: this.handleClickMenuItem, link: '/transactions' },
  ];

  renderTooltip = () => {
    const { userData } = this.props;

    return (
      <React.Fragment>
        <b>{`${userData.LastName} ${userData.FirstName}`}</b>
        <br /> {userData.Email}
      </React.Fragment>
    );
  };
  renderBadge = () => {
    const { classes, userData } = this.props;
    const initiale = userData.LastName.substr(0, 1) + userData.FirstName.substr(0, 1);
    return (
      <Avatar className={classes.purpleAvatar}>
        <h6>{initiale}</h6>
      </Avatar>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <Grid container justify="flex-end" style={{ height: '50px' }}>
          <DropDownMenu menuItems={this.generateMenu()} menuLabel="toto" />
          <DropDownMenu menuItems={this.generateMenu()} menuLabel="Transaction" />
          <DropDownMenu menuItems={this.generateMenu()} menuLabel="Operations" />

          <Tooltip classes={{ tooltip: classes.tooltip }} title={this.renderTooltip()}>
            {this.renderBadge()}
          </Tooltip>
        </Grid>
      </Card>
    );
  }
}

Header.defaultProps = {
  userData: {
    LastName: 'Super',
    FirstName: 'Connard',
    Email: 'SuperConnard@WorldCompany.com',
  },
  classes: {},
  history: [],

};
Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: shape({
    field1: string,
    field2: string,
  }),
  userData: shape(UserData),

  history: ReactRouterPropTypes.history,
};

export default withRouter(withStyles(useStyles, { withTheme: true })(Header));
