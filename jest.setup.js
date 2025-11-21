// Setup oficial react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock react-native-config
jest.mock('react-native-config', () => ({
  NEWS_API_KEY: 'test-api-key',
  NEWS_API_BASE_URL: 'https://newsapi.org/v2',
}));

// Mock react-navigation (without requireActual to avoid ES module issues)
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  NavigationContainer: ({ children }: any) => children,
  useFocusEffect: jest.fn(),
  useRoute: () => ({ params: {} }),
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');

  return {
    GestureHandlerRootView: View,
  };
});

// Global fetch mock
global.fetch = jest.fn();
