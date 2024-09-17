import React from 'react';
import { useFormContext } from 'react-hook-form';

import { NumberInput } from '~/app/_components/WithRHF';

export const InstallmentRange = () => {
  const { control, watch, setValue } = useFormContext();

  return (
    <>
      <NumberInput
        mb="sm"
        name="installmentFrom"
        control={control}
        label="Rata od"
        min={1}
        allowNegative={false}
        allowDecimal={false}
        thousandSeparator=" "
        hideControls
      />
      <NumberInput
        mb="sm"
        name="installmentTo"
        control={control}
        label="Rata do"
        min={1}
        max={100000}
        allowNegative={false}
        allowDecimal={false}
        thousandSeparator=" "
        hideControls
      />
    </>
  );
};
