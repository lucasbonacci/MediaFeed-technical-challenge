import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationService } from '@/navigation/NavigationService';
import { navigationRef } from './NavigationService';
import { NewDetailScreen } from '@/screens/index';
import { ArrowBackIcon } from '@/assets/svg';
import { RootStackParamList } from '@/types/navigation';
import { Routes } from './paths';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator<RootStackParamList>();

const Application: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name={Routes.Main}
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.NewDetailScreen}
          component={NewDetailScreen}
          options={({ route }) => ({
            title: route.params?.article.title ?? 'News Detail',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => NavigationService.goBack()}
                style={{ paddingHorizontal: 12 }}
              >
                <ArrowBackIcon width={22} height={22} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;
