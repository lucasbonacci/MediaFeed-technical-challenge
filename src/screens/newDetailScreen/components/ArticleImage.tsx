import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { colors } from '@/theme';

type Props = {
  imageUrl?: string | null;
};

const ArticleImage: React.FC<Props> = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    backgroundColor: colors.backgroundSecondary,
  },
});

export default ArticleImage;
