import { Container } from 'react-bootstrap';

import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProdiver } from './contexts/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProdiver>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProdiver>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
