import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import { RootStackParamList } from '@/types/navigation';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export const NavigationService = {
  navigate<RouteName extends keyof RootStackParamList>(
    routeName: RouteName,
    params?: RootStackParamList[RouteName],
  ) {
    navigationRef.current?.navigate(routeName as any, params as any);
  },
  goBack: () => {
    navigationRef.current?.goBack();
  },
};
