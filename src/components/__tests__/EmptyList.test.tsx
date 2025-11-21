import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyList from '../EmptyList';

describe('EmptyList', () => {
  it('renders the default message when no text prop is provided', () => {
    const { getByText } = render(<EmptyList />);
    expect(getByText('')).toBeTruthy();
  });

  it('renders the custom text passed through props', () => {
    const customText = 'No articles available';
    const { getByText } = render(<EmptyList text={customText} />);
    expect(getByText(customText)).toBeTruthy();
  });

  it('updates the message when props change', () => {
    const { rerender, getByText, queryByText } = render(
      <EmptyList text="Initial" />
    );

    expect(getByText('Initial')).toBeTruthy();

    rerender(<EmptyList text="Updated" />);

    expect(queryByText('Initial')).toBeNull();
    expect(getByText('Updated')).toBeTruthy();
  });

  it('supports complex text (emojis, line breaks, spaces)', () => {
    const complexText = '😢 No results.\nTry again?   ';
    const { getByText } = render(<EmptyList text={complexText} />);
    expect(getByText(complexText)).toBeTruthy();
  });
});
