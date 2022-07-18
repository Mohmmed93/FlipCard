import {CARD_PAIRS_VALUE} from '../../utils/consts';
import {shuffle} from '../../utils/util';
import {PlayCardActionTypes} from '../play_cards/play_card.constants';
import {playCard} from '../play_cards/play_card.reducers';

describe('play card reducer', () => {
  let shuffled;
  beforeAll(() => {
    shuffled = shuffle(CARD_PAIRS_VALUE);
  });

  it('should return the initial state', () => {
    expect(playCard(undefined, {})).toEqual({count: 0});
  });

  it('should handle initialize card', () => {
    const startAction = {
      type: PlayCardActionTypes.INITIALIZE,
    };

    const initReducer = playCard({}, startAction);
    expect(initReducer.count).toEqual(0);
    expect(initReducer.firstChoice).toEqual(undefined);
    expect(initReducer.secondChoice).toEqual(undefined);
    expect(initReducer.shuffledCards).toHaveLength(12);
    expect(initReducer.disabled).toEqual(false);
    expect(initReducer.gameOver).toEqual(false);
  });

  it('should handle count steps', () => {
    const initialState = {count: 1};
    const startAction = {
      type: PlayCardActionTypes.STEPS,
      count: 1,
    };
    expect(playCard(initialState, startAction)).toEqual({count: 2});
  });

  it('should return user choices', () => {
    const startAction = {
      type: PlayCardActionTypes.FLIP,
      firstChoice: shuffled[0],
      secondChoice: shuffled[1],
      shuffledCards: shuffled,
    };
    const flipReducer = playCard({shuffledCards: shuffled}, startAction);
    expect(flipReducer.firstChoice).toEqual(shuffled[0]);
    expect(flipReducer.secondChoice).toEqual(shuffled[1]);
    expect(flipReducer.shuffledCards).toEqual(shuffled);
    expect(flipReducer.disabled).toEqual(true);
  });

  it('should return disabled false if a choice is undefined', () => {
    const startAction = {
      type: PlayCardActionTypes.FLIP,
      firstChoice: undefined,
      secondChoice: shuffled[1],
      shuffledCards: shuffled,
    };
    const flipReducer = playCard({shuffledCards: shuffled}, startAction);
    expect(flipReducer.firstChoice).toEqual(undefined);
    expect(flipReducer.secondChoice).toEqual(shuffled[1]);
    expect(flipReducer.shuffledCards).toEqual(shuffled);
    expect(flipReducer.disabled).toEqual(false);
  });
});
