import { useQueryState, parseAsString, parseAsArrayOf } from 'nuqs';
import { MultiSelect } from '@mantine/core';

import { api } from '~/trpc/react';

export const FuelSelect = () => {
  const [model, setFuel] = useQueryState(
    'fuelType',
    parseAsArrayOf(parseAsString)
      .withOptions({
        history: 'push',
        shallow: false,
      })
      .withDefault([]),
  );

  const { data, isFetching } = api.offer.getFuelTypes.useQuery(undefined, { initialData: [] });

  const handleChange = (value: string[]) => {
    setFuel(value.length > 0 ? value.sort() : null);
  };

  //TODO add loading view so we cant se selected values without fetched options
  if (isFetching) {
    return <div>Loading models...</div>;
  }

  return (
    <>
      <MultiSelect
        name="fuelType"
        data={data.map((el) => ({ value: el.id, label: el.name }))}
        value={model}
        onChange={handleChange}
        label="Rodzaj paliwa"
        placeholder="Wybierz"
        searchable
        disabled={!data.length || isFetching}
        mb="sm"
      />
    </>
  );
};
