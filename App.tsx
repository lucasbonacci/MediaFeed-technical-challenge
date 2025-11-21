/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/react-query';
import { FavoritesProvider } from '@/context/FavoritesContext';
import Application from '@/navigation/Application';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Application />
        </SafeAreaProvider>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;
