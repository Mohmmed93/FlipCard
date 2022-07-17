import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';

export type MainStackParamsList = {
  [MainRoutes.Main]: undefined;
};

const Stack = createStackNavigator<MainStackParamsList>();

export enum MainRoutes {
  Main = 'Main',
}

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName={MainRoutes.Main}>
      <Stack.Screen
        name={MainRoutes.Main}
        component={MainScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
