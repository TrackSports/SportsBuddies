import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import nswVS from 'features/nsw/reducers/vendorSolicitor';
import nswPS from 'features/nsw/reducers/purchaserSolicitor';
import nswDocument from 'features/nsw/reducers/document';

export default combineReducers({
  routing: routerReducer,
  nswVendorSolicitor: nswVS,
  nswPurchaserSolicitor: nswPS,
  nswDocument
});
