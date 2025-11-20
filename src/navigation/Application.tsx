import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './NavigationService';
import { Routes } from './paths';
import BottomTabs from './BottomTabs';
import NewDetail from '@/screens/NewDetail';

const Stack = createStackNavigator();

const Application: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={Routes.NewDetail} component={NewDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;

