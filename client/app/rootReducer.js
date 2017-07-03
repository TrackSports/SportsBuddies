import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sportToolbarReducer from 'features/sportevent/reducers/toolbarReducer';
import sportEventDetailReducer from 'features/sportevent/reducers/eventDetailReducer';

export default combineReducers({
  routing: routerReducer,
  sportToolbar: sportToolbarReducer,
  sportEventDetail: sportEventDetailReducer
});
