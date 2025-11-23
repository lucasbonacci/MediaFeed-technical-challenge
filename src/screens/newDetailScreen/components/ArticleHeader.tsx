import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StarIcon } from '@/assets/svg';
import { colors, fonts } from '@/theme';

type Props = {
  title: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const ArticleHeader: React.FC<Props> = ({
  title,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        onPress={onToggleFavorite}
        style={styles.favoriteButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <StarIcon
          width={28}
          height={28}
          isFilled={isFavorite}
          filledColor={colors.favorite}
          outlineColor={colors.textTertiary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: fonts.size.xlarge,
    fontWeight: fonts.weight.bold,
    color: colors.primary,
    lineHeight: fonts.lineHeight.xlarge,
    flex: 1,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 4,
    marginTop: 2,
  },
});

export default ArticleHeader;
