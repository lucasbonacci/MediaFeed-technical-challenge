import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { FavoritesScreen, FeedScreen } from '@/screens/index';
import { ListIcon, StarIcon } from '@/assets/svg';
import { Routes } from './paths';
import { colors } from '@/theme';

const Tab = createBottomTabNavigator();

const createTabIcon =
  (IconComponent: React.ComponentType<any>, extraProps = {}) =>
  ({ color, size }: { color: string; size: number }) =>
    (
      <IconComponent
        width={size}
        height={size}
        color={color}
        outlineColor={color}
        {...extraProps}
      />
    );

const BottomTabs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen
        name={Routes.FeedScreen}
        component={FeedScreen}
        options={{
          tabBarIcon: createTabIcon(ListIcon),
          title: t('navigation.feed'),
        }}
      />
      <Tab.Screen
        name={Routes.FavoritesScreen}
        component={FavoritesScreen}
        options={{
          tabBarIcon: createTabIcon(StarIcon, { isFilled: false }),
          lazy: true,
          title: t('navigation.favorites'),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
