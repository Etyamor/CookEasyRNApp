import React from 'react';
import AddPage from '../pages/AddPage';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Colors } from '../../theme';
import HomeStack from './HomeStack';
import FavoriteStack from './FavoriteStack';
import { SCREENS, STACKS } from '../constants';

const Tab = createBottomTabNavigator();

function getTabBarIcon(routeName: string, color: string, size: number) {
  let iconName:
    | 'home-outline'
    | 'add-circle-outline'
    | 'heart-outline'
    | 'alert-circle-outline';

  switch (routeName) {
    case STACKS.HOME:
      iconName = 'home-outline';
      break;
    case SCREENS.ADD:
      iconName = 'add-circle-outline';
      break;
    case STACKS.FAVORITES:
      iconName = 'heart-outline';
      break;
    default:
      iconName = 'alert-circle-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: Colors.blue['500'],
        tabBarInactiveTintColor: Colors.dark['200'],
        tabBarLabelPosition: 'below-icon',
      })}
    >
      <Tab.Screen
        name={STACKS.HOME}
        component={HomeStack}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Tab.Screen name={SCREENS.ADD} component={AddPage} options={{ title: 'Add' }} />
      <Tab.Screen
        name={STACKS.FAVORITES}
        component={FavoriteStack}
        options={{ headerShown: false, title: 'Favorites' }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
