import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders "Welcome to Intellimize" header', () => {
  const { getByText } = render(<App />);
  const welcomeElement = getByText(/Welcome to Intellimize/i);
  expect(welcomeElement).toBeInTheDocument();
});
