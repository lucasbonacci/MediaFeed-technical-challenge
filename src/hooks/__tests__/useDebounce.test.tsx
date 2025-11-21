import React from 'react';
import { Text } from 'react-native';
import { render, act } from '@testing-library/react-native';
import useDebounce from '../useDebounce';

const TestComponent = ({ value, delay }: { value: string; delay: number }) => {
  const debounced = useDebounce(value, delay);
  return <Text testID="value">{debounced}</Text>;
};

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { getByTestId } = render(
      <TestComponent value="initial" delay={500} />,
    );

    const text = getByTestId('value');
    expect(text.props.children).toBe('initial');
  });

  it('updates the value only after the delay', () => {
    jest.useFakeTimers();

    const { getByTestId, rerender } = render(
      <TestComponent value="initial" delay={500} />,
    );

    expect(getByTestId('value').props.children).toBe('initial');

    rerender(<TestComponent value="updated" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(getByTestId('value').props.children).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(getByTestId('value').props.children).toBe('updated');

    jest.useRealTimers();
  });
});
