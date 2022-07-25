import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping when toppings change', async () => {
  render(<Options optionType='toppings' />);

  const toppingTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingTotal).toHaveTextContent('0.00');

  const cherriesInput = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesInput);
  expect(toppingTotal).toHaveTextContent('1.50');

  const hotfudgeInput = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  userEvent.click(hotfudgeInput);
  expect(toppingTotal).toHaveTextContent('3.00');

  userEvent.click(hotfudgeInput);
  expect(toppingTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  // test('grand total starts at $0.00', async () => {
  //   render(<OrderEntry />);

  //   const total = screen.getByText('Grand total: $', { exact: false });
  //   expect(total).toHaveTextContent('0.00');
  // });

  test('grand total updates properly if scoop is added', async () => {
    render(<OrderEntry />);

    const total = screen.getByText('Grand total: $', { exact: false });
    expect(total).toHaveTextContent('0.00');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '1');
    expect(total).toHaveTextContent('2.00');
  });

  test('grand total updates properly if topping is added', async () => {
    render(<OrderEntry />);

    const total = screen.getByText('Grand total: $', { exact: false });
    const cherriesInput = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.click(cherriesInput);
    expect(total).toHaveTextContent('1.50');
  });

  test('grand total updates properly if topping item is removed', async () => {
    render(<OrderEntry />);

    const total = screen.getByText('Grand total: $', { exact: false });
    const cherriesInput = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.click(cherriesInput);
    userEvent.click(cherriesInput);
    expect(total).toHaveTextContent('0.00');
  });
});
