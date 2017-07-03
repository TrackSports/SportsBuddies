import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sportToolbarReducer from 'features/sportevent/reducers/toolbarReducer';

export default combineReducers({
  routing: routerReducer,
  sportToolbar: sportToolbarReducer
});
