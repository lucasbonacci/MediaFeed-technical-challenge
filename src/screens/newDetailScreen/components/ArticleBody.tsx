import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';

type Props = {
  description?: string | null;
  content?: string | null;
};

const ArticleBody: React.FC<Props> = ({ description, content }) => {
  const cleanedContent = content?.replace(/\[\+\d+ chars\]/g, '') ?? null;

  if (!description && !cleanedContent) {
    return null;
  }

  return (
    <>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}

      {cleanedContent ? (
        <Text style={styles.contentText}>{cleanedContent}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: fonts.size.large,
    color: colors.textDark,
    lineHeight: fonts.lineHeight.large,
    marginBottom: 16,
    fontWeight: fonts.weight.medium,
  },
  contentText: {
    fontSize: fonts.size.medium,
    color: colors.textMedium,
    lineHeight: fonts.lineHeight.medium,
    marginBottom: 24,
  },
});

export default ArticleBody;
