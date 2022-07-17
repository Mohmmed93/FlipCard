import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CardItem from '../components/CardItem';
import useRedux from '../hooks/useRedux';
import {choices, initCard, stepCount} from '../store/actions/play_card.actions';

type cardTypes = {id: number; number: string; matchStatus: boolean}[];
type cardType = {id: number; number: string; matchStatus: boolean};

const MainScreen = () => {
  const [cards, setCards] = useState<cardTypes>([]);
  const [userSteps, setUserSteps] = useState(0);
  const {dispatch, appSelector} = useRedux();

  useEffect(() => {
    dispatch(initCard());
  }, [dispatch]);

  const {steps, shuffledCards, count, firstChoice, secondChoice, disabled} =
    appSelector((state: any) => ({
      steps: state.playCard.step,
      shuffledCards: state.playCard.shuffledCards,
      count: state.playCard.count,
      firstChoice: state.playCard.firstChoice,
      secondChoice: state.playCard.secondChoice,
      disabled: state.playCard.disabled,
    }));

  useEffect(() => {
    setCards(shuffledCards);
    setUserSteps(steps);
  }, [shuffledCards]);

  useEffect(() => {
    setUserSteps(count);
  }, [count]);

  const handleClick = (item: cardType) => {
    if (item.id === secondChoice?.id) {
      return;
    }
    firstChoice
      ? dispatch(choices(firstChoice, item, shuffledCards))
      : dispatch(choices(secondChoice, item, shuffledCards));
    dispatch(stepCount(steps));
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#404040',
        height: Dimensions.get('screen').height,
      }}>
      <StatusBar
        backgroundColor="rgba(0,0,0,0)"
        barStyle={'dark-content'}
        translucent={true}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 10,
          }}>
          <Button
            title="Restart"
            onPress={() => {
              dispatch(initCard());
            }}
          />
          <Text>STEPS: {userSteps}</Text>
        </View>
        <FlatList
          style={{backgroundColor: 'transparent'}}
          data={cards}
          renderItem={({item}) => {
            return (
              <CardItem
                card={item}
                onClickCard={handleClick}
                flipped={
                  item === firstChoice ||
                  item === secondChoice ||
                  item.matchStatus
                }
                disabled={disabled}
              />
            );
          }}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default MainScreen;
