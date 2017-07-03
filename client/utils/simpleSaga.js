import { call, put } from 'redux-saga/effects';

export default function* simpleSaga(onSuccess, onFailure, apiFunc, action) {
  try {
    const response = yield call(apiFunc, action.payload);
    yield put(onSuccess(response));
  } catch (error) {
    if (window.console) {
      window.console.error(error);
    }
    yield put(onFailure(error));
  }
}
