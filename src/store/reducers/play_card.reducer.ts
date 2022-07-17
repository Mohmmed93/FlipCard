import {ChoiceResponseState, PlayCard} from '../actions/play_card';

import createReducer from './createReducer';
import {PlayCardState} from './play_card';
import {PlayCardActionTypes} from './play_card.constants';

const CARD_PAIRS_VALUE = [
  {number: '43', matchStatus: false},
  {number: '55', matchStatus: false},
  {number: '66', matchStatus: false},
  {number: '77', matchStatus: false},
  {number: '88', matchStatus: false},
  {number: '99', matchStatus: false},
];

const initialState: PlayCardState = {
  steps: 0,
  count: 0,
};

function delay(milliseconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

export const playCard = createReducer(initialState, {
  [PlayCardActionTypes.INITIALIZE](state: PlayCardState) {
    const shuffledCards = [...CARD_PAIRS_VALUE, ...CARD_PAIRS_VALUE]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}));
    return {
      ...state,
      step: 0,
      count: 0,
      shuffledCards: shuffledCards,
      firstChoice: undefined,
      secondChoice: undefined,
      disabled: false,
    };
  },
  [PlayCardActionTypes.STEPS](state: PlayCardState) {
    const step = state.count + 1;
    return {
      ...state,
      count: step,
    };
  },
  [PlayCardActionTypes.FLIP](state: PlayCardState, actions: PlayCard) {
    let disabled;
    if (actions.firstChoice && actions.secondChoice) {
      disabled = true;
    } else {
      disabled = false;
    }

    return {
      ...state,
      shuffledCards: state.shuffledCards,
      firstChoice: actions.firstChoice,
      secondChoice: actions.secondChoice,
      disabled: disabled,
    };
  },
  [PlayCardActionTypes.FLIP_RESPONSE](
    state: PlayCardState,
    actions: ChoiceResponseState,
  ) {
    return {
      ...state,
      shuffledCards: actions.response.shuffledCards
        ? actions.response.shuffledCards
        : state.shuffledCards,
      firstChoice: actions.response.firstChoice,
      secondChoice: actions.response.secondChoice,
      disabled: false,
    };
  },
  [PlayCardActionTypes.RESET](state: PlayCardState) {
    return {
      state: undefined,
    };
  },
});
