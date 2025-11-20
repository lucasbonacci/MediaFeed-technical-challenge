import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Routes } from '../../navigation/paths';

const Favorites: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{Routes.Favorites}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Favorites;

