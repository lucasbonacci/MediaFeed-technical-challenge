import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import { Routes } from '@/navigation/paths';
import { useFavorites } from '@/context/FavoritesContext';
import { StarIcon } from '@/assets/svg';
import VideoPlayer from './components/VideoPlayer';
import { colors } from '@/theme/colors';

type Props = StackScreenProps<RootStackParamList, Routes.NewDetailScreen>;

const NewDetailScreen: React.FC = ({ route }: Props) => {
  const { article } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(article.url);

  const handleOpenUrl = async () => {
    if (article.url) {
      const supported = await Linking.canOpenURL(article.url);
      if (supported) {
        await Linking.openURL(article.url);
      }
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(article);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{article.title}</Text>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <StarIcon
              width={28}
              height={28}
              isFilled={favorite}
              filledColor={colors.favorite}
              outlineColor={colors.textTertiary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.metaContainer}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
        {article.author && (
          <Text style={styles.author}>Por: {article.author}</Text>
        )}
        {article.description && (
          <Text style={styles.description}>{article.description}</Text>
        )}
        {article.content && (
          <Text style={styles.contentText}>
            {article.content.replace(/\[\+\d+ chars\]/g, '')}
          </Text>
        )}
        <VideoPlayer videoUrl={article.videoUrl} />
        {article.url && (
          <TouchableOpacity
            onPress={handleOpenUrl}
            style={styles.urlButton}
            activeOpacity={0.7}
          >
            <Text style={styles.urlButtonText}>Leer artículo completo</Text>
          </TouchableOpacity>
        )}
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
  image: {
    width: '100%',
    height: 250,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 32,
    flex: 1,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 4,
    marginTop: 2,
  },
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
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  author: {
    fontSize: 14,
    color: colors.secondary,
    fontStyle: 'italic',
    marginBottom: 16,
  },
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
  urlButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  urlButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewDetailScreen;
