import { render, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('Renders', () => {
    render(<CartCount count={10} />);
  });

  it('Matches snapshot', () => {
    const { container, debug } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });

  it('updates via props', async () => {
    const { container, debug, rerender } = render(<CartCount count={11} />);
    expect(container.textContent).toBe('11');
    rerender(<CartCount count={'12'} />);
    await wait(400);
    // await screen.findByText('12');
    expect(container.textContent).toBe('12');
    expect(container).toMatchSnapshot();
  });
});
