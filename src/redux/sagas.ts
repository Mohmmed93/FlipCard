import {all} from 'redux-saga/effects';
import cardSaga from './play_cards/play_card.saga';

export default function* rootSaga() {
  yield all([cardSaga()]);
}
