import { createContext, useContext, useState, useMemo, useEffect } from 'react';

import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

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
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionsCounts);
    const toppingSubtotal = calculateSubtotal('toppings', optionsCounts);
    const grandTotal = scoopsSubtotal + toppingSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingSubtotal),
      grandTotal: formatCurrency(grandTotal),
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

    function resetOrder() {
      setOptionsCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    }
    return [{ ...optionsCounts, totals }, updateItemCount, resetOrder];
  }, [optionsCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
