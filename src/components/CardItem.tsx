import React from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type cardType = {id: number; number: string; matchStatus: boolean};

const CardItem: React.FC<{
  card: cardType;
  flipped: boolean;
  disabled?: boolean;
  onClickCard: (item: cardType) => void;
}> = ({card, flipped, disabled, onClickCard}) => {
  /*
  let animatedValue = new Animated.Value(0);
  let currentValue = 0;

  animatedValue.addListener(({value}) => {
    currentValue = value;
  });

  const flipCardAnimation = () => {
    if (currentValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 18,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 18,
        useNativeDriver: false,
      }).start();
    }
  };

  const setFrontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const setBackInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const backAnimatedStyle = {
    transform: [{rotateY: setBackInterpolate}],
  };

  const frontAnimatedStyle = {
    transform: [{rotateY: setFrontInterpolate}],
  };
  */

  return (
    <View style={styles.base}>
      <Pressable
        onPress={() => {
          !disabled && onClickCard(card);
        }}>
        <View style={flipped ? [styles.flipBack] : [styles.flipFront]}>
          {
            <Text
              style={[
                styles.text,
                flipped ? styles.textNumber : styles.textQuestion,
              ]}>
              {flipped ? card.number : '?'}
            </Text>
          }
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  flipFront: {
    borderRadius: 16,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: '#0096FF',
    height: Dimensions.get('window').height / 4 - 40,
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  flipBack: {
    borderRadius: 16,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    height: Dimensions.get('window').height / 4 - 40,
    justifyContent: 'center',
    width: '100%',
    // position: 'absolute',
  },
  base: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  text: {alignSelf: 'center'},
  textNumber: {color: 'black'},
  textQuestion: {color: 'white'},
});

export default CardItem;
