type cardType = {id: number; number: string; matchStatus: boolean};

export interface PlayCardState {
  steps: number;
  count: number;
  shuffledCards?: {
    id: number;
    number: string;
    matchStatus: boolean;
  }[];
  firstChoice?: cardType;
  secondChoice?: cardType;
}
