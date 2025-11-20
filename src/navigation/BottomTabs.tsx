import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from './paths';
import Feed from '@/screens/Feed';
import Favorites from '@/screens/Favorites';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={Routes.Feed} component={Feed} />
      <Tab.Screen name={Routes.Favorites} component={Favorites} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

