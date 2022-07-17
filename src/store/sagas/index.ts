import {takeEvery, all} from 'redux-saga/effects';
import {PlayCardActionTypes} from '../reducers/play_card.constants';
import playCardSaga from './play_card.saga';

export default function* watch() {
  yield all([takeEvery(PlayCardActionTypes.FLIP, playCardSaga)]);
}
