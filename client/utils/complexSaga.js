import { call, put } from 'redux-saga/effects';

export default function* complexSaga(onSuccess, onFailure, apiFunc, action) {
  try {
    const response = yield call(apiFunc, action.payload);
    if (typeof onSuccess === 'function') {
      yield put(onSuccess(response));
    }
    if (Array.isArray(onSuccess)) {
      yield* onSuccess.map(
        (successChild, index) => {
          if (Object.keys(response).length > 1) {
            return put(successChild(response[Object.keys(response)[index]]));
          }
          return put(successChild(response));
        }
        );
    }
  } catch (error) {
    if (window.console) {
      window.console.error(error);
    }
    yield put(onFailure(error));
  }
}
