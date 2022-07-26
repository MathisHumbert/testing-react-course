import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import { useOrderDetails } from '../../contexts/OrderDetails';
import AlertBanner from '../common/AlertBanner';

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((err) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <AlertBanner message={null} variant={null} />;
  }

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
