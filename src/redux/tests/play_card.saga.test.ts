import {runSaga} from 'redux-saga';
import {CARD_PAIRS_VALUE} from '../../utils/consts';
import {shuffle} from '../../utils/util';
import {PlayCardActionTypes} from '../play_cards/play_card.constants';
import {playCardSaga} from '../play_cards/play_card.saga';

describe('play card saga', () => {
  const dispatched: any = [];
  let shuffled;

  beforeAll(() => {
    shuffled = shuffle(CARD_PAIRS_VALUE);
  });

  it('two different number user choice should return undefined both choices', async () => {
    const playCardAction = {
      firstChoice: shuffled[0],
      secondChoice: shuffled[1],
      shuffledCards: shuffled,
      type: PlayCardActionTypes.FLIP,
    };

    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({state: test}),
      },
      playCardSaga,
      playCardAction,
    ).toPromise();

    expect(dispatched[0].response.firstChoice).toEqual(undefined);
    expect(dispatched[0].response.secondChoice).toEqual(undefined);
  });

  it('one user choice and undefined should return same user inputs', async () => {
    const playCardAction = {
      firstChoice: undefined,
      secondChoice: shuffled[1],
      shuffledCards: shuffled,
      type: PlayCardActionTypes.FLIP,
    };

    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({state: test}),
      },
      playCardSaga,
      playCardAction,
    ).toPromise();

    expect(dispatched[1].response.firstChoice).toEqual(undefined);
    expect(dispatched[1].response.secondChoice).toEqual(shuffled[1]);
  });

  it('user choose same two card should return both user input undefined and shffle array', async () => {
    const sameNumber = shuffled.filter(card => card.number === '55');
    const playCardAction = {
      firstChoice: sameNumber[0],
      secondChoice: sameNumber[1],
      shuffledCards: shuffled,
      type: PlayCardActionTypes.FLIP,
    };

    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({state: test}),
      },
      playCardSaga,
      playCardAction,
    ).toPromise();

    const num = dispatched[2].response.shuffledCards.filter(
      card => card.matchStatus === true,
    );
    expect(dispatched[2].response.firstChoice).toEqual(undefined);
    expect(dispatched[2].response.secondChoice).toEqual(undefined);
    expect(num[0].number).toEqual('55');
    expect(num[1].number).toEqual('55');
  });

  it('all match status true should make game over true', async () => {
    const CARD_PAIRS_VALUE_TRUE = [
      {number: '43', matchStatus: true},
      {number: '55', matchStatus: false},
      {number: '66', matchStatus: true},
      {number: '77', matchStatus: true},
      {number: '88', matchStatus: true},
      {number: '99', matchStatus: true},
    ];

    const trueShuffleCard = shuffle(CARD_PAIRS_VALUE_TRUE);
    const sameNumber = trueShuffleCard.filter(card => card.number === '55');
    const playCardAction = {
      firstChoice: sameNumber[0],
      secondChoice: sameNumber[1],
      shuffledCards: trueShuffleCard,
      type: PlayCardActionTypes.FLIP,
    };

    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({state: test}),
      },
      playCardSaga,
      playCardAction,
    ).toPromise();

    expect(dispatched[3].response.firstChoice).toEqual(undefined);
    expect(dispatched[3].response.secondChoice).toEqual(undefined);
    expect(dispatched[3].response.gameOver).toEqual(true);
  });
});
