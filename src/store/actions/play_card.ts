interface cardPair {
  number: string;
  matchStatus: boolean;
}

export interface PlayCard {
  firstChoice: cardPair;
  secondChoice: cardPair;
}

interface IResponse {
  firstChoice: cardPair;
  secondChoice: cardPair;
  shuffledCards: any;
}

export interface ChoiceResponseState {
  type: String;
  response: IResponse;
}
