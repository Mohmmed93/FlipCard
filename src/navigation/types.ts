import {StackNavigationProp} from '@react-navigation/stack';
import {MainRoutes, MainStackParamsList} from './MainStack';

export type MainNavigationProp<
  RouteName extends keyof MainStackParamsList = MainRoutes,
> = StackNavigationProp<MainStackParamsList, RouteName>;
