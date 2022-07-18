import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CardItem from '../components/CardItem';
import useRedux from '../hooks/useRedux';
import {
  choices,
  initCard,
  stepCount,
} from '../redux/play_cards/play_card.actions';

type cardTypes = {id: number; number: string; matchStatus: boolean}[];
type cardType = {id: number; number: string; matchStatus: boolean};

const MainScreen = () => {
  const [cards, setCards] = useState<cardTypes>([]);
  const [userSteps, setUserSteps] = useState(0);
  const {dispatch, appSelector} = useRedux();

  useEffect(() => {
    dispatch(initCard());
  }, [dispatch]);

  const {shuffledCards, count, firstChoice, secondChoice, disabled, gameOver} =
    appSelector((state: any) => ({
      shuffledCards: state.playCard.shuffledCards,
      count: state.playCard.count,
      firstChoice: state.playCard.firstChoice,
      secondChoice: state.playCard.secondChoice,
      disabled: state.playCard.disabled,
      gameOver: state.playCard.gameOver,
    }));

  useEffect(() => {
    setCards(shuffledCards);
    setUserSteps(count);
  }, [shuffledCards]);

  useEffect(() => {
    if (gameOver) {
      Alert.alert('Congratulations!', `You win this game by ${count}!`, [
        {
          text: 'Try another round',
          onPress: () => {
            dispatch(initCard());
          },
        },
      ]);
    }
  }, [gameOver]);

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
    dispatch(stepCount(count));
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <View>
        <View style={styles.topContainer}>
          <Button
            title="Restart"
            onPress={() => {
              dispatch(initCard());
            }}
          />
          <Text>STEPS: {userSteps}</Text>
        </View>
        <FlatList
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
  safeStyle: {
    backgroundColor: '#404040',
    height: Dimensions.get('screen').height,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
});

export default MainScreen;
