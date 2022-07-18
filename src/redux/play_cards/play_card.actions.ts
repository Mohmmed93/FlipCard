import {PlayCardActionTypes} from './play_card.constants';

interface cardType {
  id: number;
  number: string;
  matchStatus: boolean;
}

interface choiceResponse {
  firstChoice: cardType | undefined;
  secondChoice: cardType | undefined;
  shuffledCards?: cardType[];
  gameOver?: boolean;
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
  firstChoice: cardType,
  secondChoice: cardType,
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
