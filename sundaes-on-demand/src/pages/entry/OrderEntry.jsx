import React from 'react';
import { Button } from 'react-bootstrap';

import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <Button onClick={() => setOrderPhase('review')}>Order Sundae!</Button>
    </div>
  );
}
