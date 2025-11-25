import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '@/theme';

type Props = {
  message?: string;
};

const LoadMoreError: React.FC<Props> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {message || t('feed.loadMoreError')}
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
