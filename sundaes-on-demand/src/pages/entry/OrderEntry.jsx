import React from 'react';

import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderEntry() {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
    </div>
  );
}
