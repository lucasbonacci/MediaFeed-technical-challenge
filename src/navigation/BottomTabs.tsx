import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from './paths';
import FeedScreen from '@/screens/feedScreen/FeedScreen';
import Favorites from '@/screens/favoritesScreen/FavoritesScreen';
import { ListIcon, StarIcon } from '@/assets/svg';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#808080',
      }}>
      <Tab.Screen
        name={Routes.Feed}
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ListIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.Favorites}
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size }) => (
            <StarIcon
              width={size}
              height={size}
              isFilled={false}
              outlineColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

