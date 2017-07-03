import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import NSWVS from 'features/nsw/components/VendorSolicitor';
import NSWPS from 'features/nsw/components/PurchaserSolicitor';

export default (
  <Route path="/flexit" component={Layout}>
    <Route path="nswvs/:documentAccessCode" component={NSWVS} />
    <Route path="nswps/:documentAccessCode" component={NSWPS} />
    <Route path="demo/new" component={NSWVS} />
  </Route>
);
