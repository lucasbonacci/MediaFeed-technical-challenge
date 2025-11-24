import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import { Routes } from '@/navigation/paths';
import { useArticleFavorite } from '@/hooks/useArticleFavorite';
import { openUrl } from '@/utils';
import {
  ArticleImage,
  ArticleHeader,
  ArticleMeta,
  ArticleBody,
  ReadMoreButton,
  VideoPlayer,
} from './components';

type Props = StackScreenProps<RootStackParamList, Routes.NewDetailScreen>;

const NewDetailScreen: React.FC<Props> = ({ route }) => {
  const { article } = route.params;
  const { favorite, handleFavoritePress } = useArticleFavorite(article);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <ArticleImage imageUrl={article.urlToImage} />

      <View style={styles.content}>
        <ArticleHeader
          title={article.title}
          isFavorite={favorite}
          onToggleFavorite={handleFavoritePress}
        />

        <ArticleMeta
          sourceName={article.source.name}
          publishedAt={article.publishedAt}
          author={article.author}
        />

        <ArticleBody
          description={article.description}
          content={article.content}
        />

        <VideoPlayer videoUrl={article.videoUrl} />

        {article.url && <ReadMoreButton onPress={() => openUrl(article.url)} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  content: {
    padding: 16,
  },
});

export default NewDetailScreen;
