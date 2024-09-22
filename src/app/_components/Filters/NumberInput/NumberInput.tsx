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

export const NumberInput = ({ name, label, value, onChange, min = 2000, max = 2010 }: NumberInputProps) => {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value ? Number(value) : null);
  }, [value]);

  const handleChange = (value: number | string) => {
    setLocalValue(value ? Number(value) : null);
  };

  const handleBlur = () => {
    if (localValue !== value) {
      onChange(localValue ? Number(localValue) : null);
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
    />
  );
};
