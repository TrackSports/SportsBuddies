
import React from 'react';
import { Provider } from 'react-redux';
import routes from './routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import configureStore from './configureStore';
import sagas from './sagas';

const browserHistory = useRouterHistory(createHistory)({ basename: window.rootUrl });
const store = configureStore();
store.runSaga(sagas);
const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);
