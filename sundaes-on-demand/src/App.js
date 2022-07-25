import { useState } from 'react';
import { Container } from 'react-bootstrap';

import { OrderDetailsProdiver } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <Container>
      <OrderDetailsProdiver>
        {<Component setOrderPhase={setOrderPhase} />}
      </OrderDetailsProdiver>
    </Container>
  );
}

export default App;
