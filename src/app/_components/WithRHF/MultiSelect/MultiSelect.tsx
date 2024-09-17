import { type UseControllerProps, useController, type FieldValues } from 'react-hook-form';
import { MultiSelect as $MultiSelect, type MultiSelectProps as $MultiSelectProps } from '@mantine/core';

export type MultiSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<$MultiSelectProps, 'value' | 'defaultValue'>;

export const MultiSelect = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: MultiSelectProps<T>) => {
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

  return (
    <$MultiSelect
      value={value}
      onChange={(value) => {
        fieldOnChange(value);
        onChange?.(value);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
};
