import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import { Routes } from './paths';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export const NavigationService = {
  navigate: (routeName: keyof typeof Routes, params?: any) => {
    navigationRef.current?.navigate(routeName, params);
  },
  goBack: () => {
    navigationRef.current?.goBack();
  },
};

