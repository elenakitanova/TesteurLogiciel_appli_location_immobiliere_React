import React from 'react';
import { render, screen } from '@testing-library/react';

function Hello() {
  return <h1>Hello test</h1>;
}

test('rend Hello test', () => {
  render(<Hello />);
  expect(screen.getByText(/hello test/i)).toBeInTheDocument();
});
