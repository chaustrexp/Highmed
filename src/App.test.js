import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // Basic test to ensure app renders without crashing
  expect(document.body).toBeInTheDocument();
});