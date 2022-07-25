import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';
// import { OrderDetailsProdiver } from '../../../contexts/OrderDetails';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType='scoops' />);
  // render(<Options optionType='scoops' />, { wrapper: OrderDetailsProdiver });

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const atlText = scoopImages.map((element) => element.alt);
  expect(atlText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('display image for each topping option from server', async () => {
  render(<Options optionType='toppings' />);

  // find images
  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
