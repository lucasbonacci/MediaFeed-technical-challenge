import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { FALLBACK_VIDEO, POSTER_VIDEO } from '@/constants/media';
import { colors } from '@/theme';

interface Props {
  videoUrl?: string | null;
}

const VideoPlayer: React.FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<VideoRef>(null);

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={{ uri: videoUrl || FALLBACK_VIDEO }}
        style={styles.video}
        resizeMode="cover"
        controls
        onError={error => {
          console.error('Video error:', error);
        }}
        paused={true}
        poster={POSTER_VIDEO}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: 220,
    backgroundColor: colors.primary,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default VideoPlayer;
