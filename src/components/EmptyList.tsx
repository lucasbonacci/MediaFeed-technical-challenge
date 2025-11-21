import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface EmptyListProps {
  text?: string;
}

const EmptyList: React.FC<EmptyListProps> = ({text = ''}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {text}
      </Text>
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
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default EmptyList;
