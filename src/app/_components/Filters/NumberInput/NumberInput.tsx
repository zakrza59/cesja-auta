import React, { useEffect, useRef, useState } from 'react';
import { NumberInput as $NumberInput } from '@mantine/core';

type NumberInputProps = {
  name: string;
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
};

export const NumberInput = ({ name, label, value, onChange, min = 1, max = 1000000 }: NumberInputProps) => {
  const [localFrom, setLocalFrom] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalFrom(value ? Number(value) : null);
  }, [value]);

  const handleChange = (value: number | string) => {
    setLocalFrom(value ? Number(value) : null);
  };

  const handleBlur = () => {
    if (localFrom !== value) {
      onChange(localFrom ? Number(localFrom) : null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
      inputRef.current?.blur();
    }
  };

  return (
    <$NumberInput
      ref={inputRef}
      mb="sm"
      name={name}
      label={label}
      min={min}
      max={max}
      value={value || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      allowNegative={false}
      allowDecimal={false}
      thousandSeparator=" "
      hideControls
      withKeyboardEvents={false}
      clampBehavior="strict"
    />
  );
};
