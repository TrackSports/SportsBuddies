
import sport from 'features/sportevent';

const sagas = [...sport.sagas];

export default function* root() {
  yield sagas;
}
