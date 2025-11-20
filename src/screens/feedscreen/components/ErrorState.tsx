import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.center}>
      <Text style={styles.errorText}>
        {message || 'Something went wrong'}
      </Text>

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
    color: '#000',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  retry: {
    color: '#4fa3ff',
    fontSize: 16,
  },
});
