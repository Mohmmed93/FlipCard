interface cardType {
  number: string;
  matchStatus: boolean;
}

export function shuffle(cards: cardType[]) {
  return [...cards, ...cards]
    .sort(() => Math.random() - 0.5)
    .map(card => ({...card, id: Math.random()}));
}

export function delayPromise(milliseconds: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, milliseconds);
  });
}
