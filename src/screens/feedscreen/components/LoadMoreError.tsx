import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';

type Props = {
  message?: string;
};

const LoadMoreError: React.FC<Props> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {message || 'Ocurrió un error al cargar más resultados.'}
      </Text>
    </View>
  );
};

export default LoadMoreError;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.secondary,
    fontSize: fonts.size.small,
    textAlign: 'center',
  },
});
