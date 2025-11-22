/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { queryClient } from '@/config/react-query';
import { FavoritesProvider } from '@/context/FavoritesContext';
import Application from '@/navigation/Application';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Application />
          </SafeAreaProvider>
        </FavoritesProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;


const styles = StyleSheet.create({
  container: { flex: 1 },
});