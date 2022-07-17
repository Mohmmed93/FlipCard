import {call, put} from 'redux-saga/effects';
import {choicesResponse} from '../actions/play_card.actions';

function delayPromise(milliseconds: any){
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

async function delay() {
  await delayPromise(1000);

  return;
}

export default function* playCardSaga(actions: any) {
  if (actions.firstChoice && actions.secondChoice) {
    if (actions?.firstChoice?.number === actions?.secondChoice?.number) {
      const shuffleCards = actions.shuffledCards?.map((card: any) => {
        if (card.number === actions.firstChoice.number) {
          return {...card, matchStatus: true};
        } else {
          return card;
        }
      });
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
