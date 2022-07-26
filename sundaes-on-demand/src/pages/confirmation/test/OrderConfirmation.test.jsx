import { render, screen } from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';

import { server } from '../../../mocks/server';
import OrderConfirmation from '../OrderConfirmation';

test('loading show while contacting server', async () => {
  render(<OrderConfirmation />);
  const loading = screen.getByText('Loading');
  expect(loading).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole('heading', {
    name: 'Thank You!',
  });
  expect(thankYouHeader).toBeInTheDocument();

  const notLoading = screen.queryByText('Loading');
  expect(notLoading).not.toBeInTheDocument();
});

test('error response from server for submitting order', async () => {
  // override default msw for options endpoint error response
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(
    'An unexpected error ocurred. Please try again later'
  );
});
