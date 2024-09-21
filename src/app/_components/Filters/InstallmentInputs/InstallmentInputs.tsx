import React, { useEffect } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';

import { NumberInput } from '~/app/_components/Filters/NumberInput';

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
      <NumberInput name={InstallmentInputType.from} label="Rata od" value={from} onChange={setFrom} />
      <NumberInput name={InstallmentInputType.to} label="Rata do" value={to} onChange={setTo} />
    </>
  );
};
