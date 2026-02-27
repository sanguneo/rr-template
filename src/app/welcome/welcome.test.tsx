import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Welcome } from './welcome';

describe('Welcome Component', () => {
  it('renders correctly', () => {
    // We just test if it can be rendered without crashing
    const { container } = render(<Welcome />);
    expect(container).toBeInTheDocument();
  });
});
