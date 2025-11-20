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

type Props = StackScreenProps<RootStackParamList, Routes.NewDetailScreen>;

const NewDetailScreen: React.FC = ({ route }: Props) => {
  const { article } = route.params;

  const handleOpenUrl = async () => {
    if (article.url) {
      const supported = await Linking.canOpenURL(article.url);
      if (supported) {
        await Linking.openURL(article.url);
      }
    }
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
        <Text style={styles.title}>{article.title}</Text>
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
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    lineHeight: 32,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  source: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  author: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#333',
    lineHeight: 26,
    marginBottom: 16,
    fontWeight: '500',
  },
  contentText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 24,
  },
  urlButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  urlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewDetailScreen;
