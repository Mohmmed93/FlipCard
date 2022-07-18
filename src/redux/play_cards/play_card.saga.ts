import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {delayPromise} from '../../utils/util';
import {choicesResponse} from './play_card.actions';
import {PlayCardActionTypes} from './play_card.constants';

async function delay() {
  await delayPromise(1000);

  return;
}

interface cardType {
  id: number;
  number: string;
  matchStatus: boolean;
}

export function* playCardSaga(actions: {
  firstChoice: cardType | undefined;
  secondChoice: cardType | undefined;
  shuffledCards?: cardType[];
  type: string;
}) {
  if (actions.firstChoice && actions.secondChoice) {
    if (actions?.firstChoice?.number === actions?.secondChoice?.number) {
      const shuffleCards = actions.shuffledCards?.map((card: any) => {
        if (card.number === actions?.firstChoice?.number) {
          return {...card, matchStatus: true};
        } else {
          return card;
        }
      });

      const matchStatusCheck = shuffleCards?.some(card => {
        if (card.matchStatus === false) {
          return true;
        }
        return false;
      });

      if (!matchStatusCheck) {
        const response = {
          success: true,
          data: {
            firstChoice: undefined,
            secondChoice: undefined,
            shuffledCards: shuffleCards,
            gameOver: true,
          },
          message: 'Success',
        };
        yield put(choicesResponse(response.data));
      } else {
        const response = {
          success: true,
          data: {
            firstChoice: undefined,
            secondChoice: undefined,
            shuffledCards: shuffleCards,
          },
          message: 'Success',
        };
        yield put(choicesResponse(response.data));
      }
    } else {
      yield call(delay);
      const response = {
        success: true,
        data: {
          firstChoice: undefined,
          secondChoice: undefined,
        },
        message: 'Success',
      };
      yield put(choicesResponse(response.data));
    }
  } else {
    const response = {
      success: true,
      data: {
        firstChoice: actions.firstChoice,
        secondChoice: actions.secondChoice,
      },
      message: 'Success',
    };

    yield put(choicesResponse(response.data));
  }
}

export function* watchPlayCardSaga() {
  yield takeEvery(PlayCardActionTypes.FLIP, playCardSaga);
}

function* cardSaga() {
  yield all([fork(watchPlayCardSaga)]);
}

export default cardSaga;
