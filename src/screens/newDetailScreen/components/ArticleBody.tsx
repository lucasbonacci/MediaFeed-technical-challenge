import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

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
    fontSize: 18,
    color: colors.textDark,
    lineHeight: 26,
    marginBottom: 16,
    fontWeight: '500',
  },
  contentText: {
    fontSize: 16,
    color: colors.textMedium,
    lineHeight: 24,
    marginBottom: 24,
  },
});

export default ArticleBody;
