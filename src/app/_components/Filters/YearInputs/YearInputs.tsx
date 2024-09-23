import React, { useEffect } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { NumberInput } from '~/app/_components/Filters/NumberInput';

const MIN_YEAR = 2010;
const MAX_YEAR = 2026;

enum YearInputType {
  from = 'yearFrom',
  to = 'yearTo',
}

export const YearInputs = () => {
  const [from, setFrom] = useQueryState(
    YearInputType.from,
    parseAsInteger.withOptions({
      history: 'push',
      shallow: false,
    }),
  );

  const [to, setTo] = useQueryState(
    YearInputType.to,
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
        name={YearInputType.from}
        label="Rocznik od"
        value={from}
        onChange={setFrom}
        min={MIN_YEAR}
        max={MAX_YEAR}
      />
      <NumberInput
        name={YearInputType.to}
        label="Rocznik do"
        value={to}
        onChange={setTo}
        min={MIN_YEAR}
        max={MAX_YEAR}
      />
    </>
  );
};
