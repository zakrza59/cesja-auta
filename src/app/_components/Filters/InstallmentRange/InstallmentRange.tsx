import React from 'react';
import { NumberInput } from '@mantine/core';
import { parseAsInteger, useQueryState } from 'nuqs';

export const InstallmentRange = () => {
  const [from, setFrom] = useQueryState(
    'installmentFrom',
    parseAsInteger.withOptions({
      history: 'push',
      shallow: false,
    }),
  );
  const [to, setTo] = useQueryState(
    'installmentTo',
    parseAsInteger.withOptions({
      history: 'push',
      shallow: false,
    }),
  );

  const handleFromChange = (value: number | string) => {
    setFrom(value ? Number(value) : null);
  };

  const handleToChange = (value: number | string) => {
    setTo(value ? Number(value) : null);
  };

  return (
    <>
      <NumberInput
        mb="sm"
        name="installmentFrom"
        label="Rata od"
        min={1}
        max={1000000}
        value={from || ''}
        onChange={handleFromChange}
        allowNegative={false}
        allowDecimal={false}
        thousandSeparator=" "
        hideControls
        withKeyboardEvents={false}
        clampBehavior="strict"
      />
      <NumberInput
        mb="sm"
        name="installmentTo"
        label="Rata do"
        value={to || ''}
        onChange={handleToChange}
        min={1}
        max={1000000}
        allowNegative={false}
        allowDecimal={false}
        thousandSeparator=" "
        hideControls
        withKeyboardEvents={false}
        clampBehavior="strict"
      />
    </>
  );
};
