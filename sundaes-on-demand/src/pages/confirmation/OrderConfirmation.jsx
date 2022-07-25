import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((err) => {
        // TODO: handle error here
      });
  }, []);

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank You!</h1>
        <p>your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button
          onClick={() => {
            resetOrder();
            setOrderPhase('inProgress');
          }}
        >
          Create new order
        </Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
