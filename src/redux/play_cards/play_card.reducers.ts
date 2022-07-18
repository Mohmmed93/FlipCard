import {CARD_PAIRS_VALUE} from '../../utils/consts';
import {shuffle} from '../../utils/util';
import createReducer from '../create_reducer';
import {PlayCardActionTypes} from './play_card.constants';

interface cardType {
  id: number;
  number: string;
  matchStatus: boolean;
}

interface PlayCardType {
  firstChoice: cardType;
  secondChoice: cardType;
  shuffledCards?: cardType[];
  gameOver: boolean;
}

interface ChoiceResponseState {
  type: string;
  response: PlayCardType;
}

export interface PlayCardState {
  count: number;
  shuffledCards?: {
    id: number;
    number: string;
    matchStatus: boolean;
  }[];
  firstChoice?: cardType;
  secondChoice?: cardType;
}

const initialState: PlayCardState = {
  count: 0,
};

export const playCard = createReducer(initialState, {
  [PlayCardActionTypes.INITIALIZE](state: PlayCardState) {
    const shuffledCards = shuffle(CARD_PAIRS_VALUE);
    return {
      ...state,
      count: 0,
      gameOver: false,
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
  [PlayCardActionTypes.FLIP](state: PlayCardState, actions: PlayCardType) {
    let disabled: boolean;
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
      gameOver: actions.response.gameOver,
    };
  },
  [PlayCardActionTypes.RESET]() {
    return {
      state: undefined,
    };
  },
});
