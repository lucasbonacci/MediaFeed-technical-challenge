import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';

interface EmptyListProps {
  text?: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ text = '' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: fonts.size.medium,
    color: colors.secondary,
    textAlign: 'center',
  },
});

export default EmptyList;
