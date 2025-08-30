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

const Tab = createBottomTabNavigator();

function getTabBarIcon(routeName: string, color: string, size: number) {
  let iconName:
    | 'home-outline'
    | 'add-circle-outline'
    | 'heart-outline'
    | 'alert-circle-outline';

  switch (routeName) {
    case 'Home':
      iconName = 'home-outline';
      break;
    case 'Add':
      iconName = 'add-circle-outline';
      break;
    case 'Favorites':
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
        tabBarLabelPosition: 'below-icon'
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Add" component={AddPage} />
      <Tab.Screen
        name="Favorites"
        component={FavoriteStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
