import { useQueryState, parseAsString, parseAsArrayOf } from 'nuqs';
import { MultiSelect } from '@mantine/core';
import { useMemo } from 'react';

import { api } from '~/trpc/react';

export const BrandSelect = () => {
  const [brand, setBrand] = useQueryState(
    'brand',
    parseAsArrayOf(parseAsString)
      .withOptions({
        history: 'push',
        shallow: false,
      })
      .withDefault([]),
  );

  const { data, isFetching } = api.offer.getBrands.useQuery(undefined, { initialData: [] });

  // const brandOptions = useMemo(() => data.map((el) => ({ value: el.id, label: el.name })), [data]);
  //
  // const validSelectedBrands = useMemo(
  //   () => brand.filter((b) => brandOptions.some((option) => option.value === b)),
  //   [brand, brandOptions],
  // );

  const handleChange = (value: string[]) => {
    console.log(value, 'VALUE');
    setBrand(value.length > 0 ? value.sort() : null);
  };

  //TODO add loading view so we cant se selected values without fetched options
  if (isFetching) {
    return <div>Loading brands...</div>;
  }

  return (
    <>
      <MultiSelect
        // data={brandOptions}
        // value={validSelectedBrands}
        name="brand"
        data={data.map((el) => ({ value: el.id, label: el.name }))}
        value={brand}
        onChange={handleChange}
        label="Marka pojazdu"
        placeholder="Wybierz"
        searchable
        disabled={isFetching}
        mb="sm"
      />
    </>
  );
};
