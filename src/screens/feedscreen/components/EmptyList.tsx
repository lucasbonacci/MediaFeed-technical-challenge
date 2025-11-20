import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface EmptyListProps {
  isSearch?: boolean;
}

const EmptyList: React.FC<EmptyListProps> = ({isSearch = false}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {isSearch
          ? 'No se encontraron resultados para tu búsqueda.'
          : 'No hay datos disponibles.'}
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
