import { createContext, useContext, useState, useMemo, useEffect } from 'react';

import { pricePerItem } from '../constants';

const OrderDetails = createContext();

// create custom hook to check wether we're inside a prodiver
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrdeDatailsProvider'
    );
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;

  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProdiver(props) {
  const [optionsCounts, setOptionsCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionsCounts);
    const toppingSubtotal = calculateSubtotal('toppings', optionsCounts);
    const grandTotal = scoopsSubtotal + toppingSubtotal;

    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingSubtotal,
      grandTotal,
    });
  }, [optionsCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionsCounts = { ...optionsCounts };

      // update option count for this item with the new value
      const optionCountsMap = optionsCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionsCounts(newOptionsCounts);
    }
    // getter: object containing options counts for scoops and toppings, subtotals and totals

    // setter: updateOptionsCount
    return [{ ...optionsCounts, totals }, updateItemCount];
  }, [optionsCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
