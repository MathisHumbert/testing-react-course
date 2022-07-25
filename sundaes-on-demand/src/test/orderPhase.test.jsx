import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  const vanillaInput = screen.getByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.type(vanillaInput, '1');

  const cherriesInput = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesInput);

  // find and click order button
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  userEvent.click(orderButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  // alertnatively
  // const optionItems = screen.getAllByRole('listitem')
  // const optionItemsText = optionItems.map(item => item.textContent)
  // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

  // accept terms and conditions and click button to confirm order
  const termsInput = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(termsInput);

  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  // const thankYouHeader = await screen.findByRole('heind', {
  //   name: /thank you/i,
  // });
  // expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/your order number is/i);
  expect(orderNumber).toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole('button', {
    name: 'Create new order',
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toBeInTheDocument();

  const toppingTotal = screen.getByText('Toppings total: $0.00');
  expect(toppingTotal).toBeInTheDocument();

  // wait for items to appear to avoid any errors
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});
