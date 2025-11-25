import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from '@/assets/svg';
import { colors, fonts } from '@/theme';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SearchIcon width={20} height={20} color={colors.searchIcon} />
      </View>
      <TextInput
        testID="search-input"
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={t('feed.search')}
        placeholderTextColor={colors.searchIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.borderLight,
    borderWidth: 1,
    margin: 16,
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingLeft: 18,
    paddingRight: 18,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    fontSize: fonts.size.medium,
  },
});

export default SearchInput;
