
import nsw from 'features/nsw';

const sagas = [...nsw.sagas];

export default function* root() {
  yield sagas;
}
