import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ViewIssues from '../src/modules/issues/view/ViewIssues';
import EditIssue from '../src/modules/issues/edit/EditIssue';
import Login from '../src/modules/auth/Login';

import Helper from '../src/utils/helper';

const routes = (
  <Switch>
    <Route exact path='/' render={() => {
      return Helper.isLoggedIn() ?
        ( <ViewIssues /> ) : ( <Redirect to='/login' /> )
    }} />
    <Route path='/edit' render={() => {
      return Helper.isLoggedIn() ?
        ( <EditIssue /> ) : ( <Redirect to='/login' /> )
    }} />
    <Route path='/login' component={Login} />
  </Switch>
);

export default routes;
