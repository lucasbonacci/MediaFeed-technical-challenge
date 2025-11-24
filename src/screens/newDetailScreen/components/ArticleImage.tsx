import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { colors } from '@/theme';

type Props = {
  imageUrl?: string | null;
};

const ArticleImage: React.FC<Props> = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <FastImage
      source={{
        uri: imageUrl,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.immutable,
      }}
      style={styles.image}
      resizeMode={FastImage.resizeMode.cover}
    />
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
