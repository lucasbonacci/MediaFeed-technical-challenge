import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '@/theme';

type Props = {
  onPress: () => void;
};

const ReadMoreButton: React.FC<Props> = ({ onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.urlButton}
      activeOpacity={0.7}
    >
      <Text style={styles.urlButtonText}>{t('article.readMore')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  urlButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  urlButtonText: {
    color: colors.background,
    fontSize: fonts.size.medium,
    fontWeight: fonts.weight.semibold,
  },
});

export default ReadMoreButton;
