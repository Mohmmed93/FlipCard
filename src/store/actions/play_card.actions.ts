import {PlayCardActionTypes} from '../reducers/play_card.constants';

interface cardPair {
  id: number;
  number: string;
  matchStatus: boolean;
}

interface choiceResponse {
  firstChoice: undefined;
  secondChoice: undefined;
  shuffledCards?: any;
}

export function initCard() {
  return {
    type: PlayCardActionTypes.INITIALIZE,
  };
}

export function stepCount(count: number) {
  return {
    type: PlayCardActionTypes.STEPS,
    count,
  };
}

export function choices(
  firstChoice: cardPair,
  secondChoice: cardPair,
  shuffledCards: any,
) {
  return {
    type: PlayCardActionTypes.FLIP,
    firstChoice,
    secondChoice,
    shuffledCards,
  };
}

export function choicesResponse(response: choiceResponse) {
  return {
    type: PlayCardActionTypes.FLIP_RESPONSE,
    response,
  };
}

export function resetCard() {
  return {
    type: PlayCardActionTypes.RESET,
  };
}
