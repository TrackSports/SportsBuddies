import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Login from 'features/sportevent/components/login';
import SportEvent from 'features/sportevent/components';

export default (
  <Route path="/hackit" component={Layout}>
    <Route path="sport/login/:AccessCode" component={Login} />
    <Route path="sport/:AccessCode" component={SportEvent} />
  </Route>
);
