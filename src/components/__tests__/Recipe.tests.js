import { render, screen } from '@testing-library/react';
import Recipe from '../Recipe';

test('displays recipe name', () => {
  render(<Recipe name="Pasta" />);
  expect(screen.getByText('Pasta')).toBeInTheDocument();
});
