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
  NavigationContainer: ({ children }) => children,
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

// Mock @d11/react-native-fast-image
jest.mock('@d11/react-native-fast-image', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockFastImage = React.forwardRef((props, ref) => {
    return <View ref={ref} {...props} />;
  });

  MockFastImage.resizeMode = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
  };

  MockFastImage.priority = {
    low: 'low',
    normal: 'normal',
    high: 'high',
  };

  MockFastImage.cacheControl = {
    immutable: 'immutable',
    web: 'web',
    cacheOnly: 'cacheOnly',
  };

  return MockFastImage;
});

// Global fetch mock
global.fetch = jest.fn();
