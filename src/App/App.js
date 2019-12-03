import './App.css';
import { Assignment, Home, SyncAlt } from '@material-ui/icons';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Graph from '../Graph';
import Header from '../Header';
import LeftMenu from '../LeftMenu';

import 'materialize-css/dist/css/materialize.min.css'

const menu = [
  { label: 'Home', handle: null, link: '/graph', imgCompoment: Home, id: 0 },
  { label: 'Transaction', handle: null, link: '/transaction', imgCompoment: Assignment, id: 1 },
  { label: 'Fraude', handle: null, link: '/fraud', imgCompoment: SyncAlt, id: 2 },
];
export default class App extends Component {
  render = () => (
    <div id='main' className='row'>
      <Router>
        <Header />{/*Attention, si on déplace le composant Header juste au dessus du composant Switch, on obtient du margin et du padding*/}
        <div id='left-menu' className='col s2'>
          <div className='sidenav sidenav-fixed #4a148c purple darken-4 white-text'>
            <LeftMenu menuItems={menu} />
          </div>
        </div>
        <div id='content' className='col s10'>
          <Switch>
            <Route path="/" component={Graph} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
