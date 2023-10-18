import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import CardNote from '@components/Card/CardNote';

describe('Testing Card Note', () => {
  test('should render normally', () => {
    const {getByTestId} = render(
      <CardNote
        item={{
          content: 'This is content',
          created_at: new Date(),
          title: 'This is title',
        }}
      />,
    );

    const element = getByTestId('card-note-container');

    fireEvent.press(element);

    expect(element).toBeTruthy();
  });
});
