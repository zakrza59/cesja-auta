import React, { useEffect } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { NumberInput } from '~/app/_components/Filters/NumberInput';

const MIN_PRICE = 1;
const MAX_PRICE = 10_000_000;

enum PriceInputType {
  from = 'priceFrom',
  to = 'priceTo',
}

export const PriceInputs = () => {
  const [from, setFrom] = useQueryState(
    PriceInputType.from,
    parseAsInteger.withOptions({
      history: 'push',
      shallow: false,
    }),
  );

  const [to, setTo] = useQueryState(
    PriceInputType.to,
    parseAsInteger.withOptions({
      history: 'push',
      shallow: false,
    }),
  );

  useEffect(() => {
    if (from && to && from > to) {
      setTo(from);
      setFrom(to);
    }
  }, [from, to, setTo, setFrom]);

  return (
    <>
      <NumberInput
        name={PriceInputType.from}
        label="Cena od"
        value={from}
        onChange={setFrom}
        min={MIN_PRICE}
        max={MAX_PRICE}
      />
      <NumberInput
        name={PriceInputType.to}
        label="Cena do"
        value={to}
        onChange={setTo}
        min={MIN_PRICE}
        max={MAX_PRICE}
      />
    </>
  );
};
