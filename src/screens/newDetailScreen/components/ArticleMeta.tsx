import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';
import { formatDate } from '@/utils';

type Props = {
  sourceName: string;
  publishedAt: string;
  author?: string | null;
};

const ArticleMeta: React.FC<Props> = ({ sourceName, publishedAt, author }) => {
  return (
    <>
      <View style={styles.metaContainer}>
        <Text style={styles.source}>{sourceName}</Text>
        <Text style={styles.date}>{formatDate.full(publishedAt)}</Text>
      </View>

      {author ? <Text style={styles.author}>Por: {author}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  source: {
    fontSize: fonts.size.small,
    color: colors.secondary,
    fontWeight: fonts.weight.semibold,
    textTransform: 'uppercase',
  },
  date: {
    fontSize: fonts.size.small,
    color: colors.textTertiary,
  },
  author: {
    fontSize: fonts.size.small,
    color: colors.secondary,
    fontStyle: fonts.style.italic,
    marginBottom: 16,
  },
});

export default ArticleMeta;
