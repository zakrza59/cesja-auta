import React, { useEffect } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { NumberInput } from '~/app/_components/Filters/NumberInput';

const MIN_INSTALLMENT = 1;
const MAX_INSTALLMENT = 1_000_000;

enum InstallmentInputType {
  from = 'installmentFrom',
  to = 'installmentTo',
}

export const InstallmentInputs = () => {
  const [from, setFrom] = useQueryState(
    InstallmentInputType.from,
    parseAsInteger.withOptions({
      history: 'push',
      shallow: false,
    }),
  );

  const [to, setTo] = useQueryState(
    InstallmentInputType.to,
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
        name={InstallmentInputType.from}
        label="Rata od"
        value={from}
        onChange={setFrom}
        min={MIN_INSTALLMENT}
        max={MAX_INSTALLMENT}
      />
      <NumberInput
        name={InstallmentInputType.to}
        label="Rata do"
        value={to}
        onChange={setTo}
        min={MIN_INSTALLMENT}
        max={MAX_INSTALLMENT}
      />
    </>
  );
};
