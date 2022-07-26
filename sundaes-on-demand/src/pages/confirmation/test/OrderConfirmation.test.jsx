import { render, screen } from '../../../test-utils/testing-library-utils';

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
