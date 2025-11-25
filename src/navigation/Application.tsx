import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { NavigationService } from '@/navigation/NavigationService';
import { navigationRef } from './NavigationService';
import { NewDetailScreen } from '@/screens/index';
import { ArrowBackIcon } from '@/assets/svg';
import { RootStackParamList } from '@/types/navigation';
import { Routes } from './paths';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator<RootStackParamList>();

const renderHeaderBackButton = () => (
  <TouchableOpacity
    onPress={NavigationService.goBack}
    style={styles.padding}
  >
    <ArrowBackIcon width={22} height={22} />
  </TouchableOpacity>
);

const Application: React.FC = () => {
  const { t } = useTranslation();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
        <Stack.Screen
          name={Routes.Main}
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.NewDetailScreen}
          component={NewDetailScreen}
          options={({ route }) => ({
            title: route.params?.article.title ?? t('navigation.article'),
            headerLeft: renderHeaderBackButton,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;

const styles = StyleSheet.create({
  padding: { paddingHorizontal: 12 },
});
