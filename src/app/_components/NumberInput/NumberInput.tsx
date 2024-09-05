import { type UseControllerProps, useController, type FieldValues } from 'react-hook-form';
import { NumberInput as $NumberInput, type NumberInputProps as $NumberInputProps } from '@mantine/core';

export type NumberInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<$NumberInputProps, 'value' | 'defaultValue'>;

export const NumberInput = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: NumberInputProps<T>) => {
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
    <$NumberInput
      variant="filled"
      value={value}
      onChange={(value) => {
        if (value === '') {
          fieldOnChange(undefined);
          // @ts-expect-error fix it later
          onChange?.(undefined);
          return;
        }

        fieldOnChange(value);
        onChange?.(value);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
};
