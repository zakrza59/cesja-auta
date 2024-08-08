'use client';

import { type UseControllerProps, useController, type FieldValues } from 'react-hook-form';
import { Select as $Select, type SelectProps as $SelectProps } from '@mantine/core';

export type SelectProps<T extends FieldValues> = UseControllerProps<T> & Omit<$SelectProps, 'value' | 'defaultValue'>;

export const Select = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: SelectProps<T>) => {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  console.log(value, 'VALUE FROM SELECT');
  return (
    <$Select
      variant="filled"
      size="md"
      value={value}
      onChange={(value, option) => {
        fieldOnChange(value);
        onChange?.(value, option);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
};
