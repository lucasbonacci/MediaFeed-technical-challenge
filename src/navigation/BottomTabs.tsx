import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FavoritesScreen,FeedScreen} from '@/screens/index'
import { ListIcon, StarIcon } from '@/assets/svg';
import { Routes } from './paths';
import { colors } from '@/theme/colors';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
      }}>
      <Tab.Screen
        name={Routes.FeedScreen}
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ListIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.FavoritesScreen}
        component={FavoritesScreen}
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

