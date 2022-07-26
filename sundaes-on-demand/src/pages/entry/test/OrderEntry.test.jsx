import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';

test('handles error for scoops and toppings route', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // const alerts = await screen.findAllByRole('alert');

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('disable order button for no scoops', async () => {
  render(<OrderEntry />);

  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(orderButton).toBeEnabled();

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '0');
  expect(orderButton).toBeDisabled();
});
