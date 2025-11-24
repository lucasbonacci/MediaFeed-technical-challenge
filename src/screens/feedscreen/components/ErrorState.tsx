import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.center}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity onPress={onRetry}>
        <Text style={styles.retry}>Tap to retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorState;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  errorText: {
    color: colors.primary,
    fontSize: fonts.size.medium,
    marginBottom: 8,
    textAlign: 'center',
  },
  retry: {
    color: colors.link,
    fontSize: fonts.size.medium,
  },
});
