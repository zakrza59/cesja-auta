import { useQueryState, parseAsString, parseAsArrayOf } from 'nuqs';
import { MultiSelect } from '@mantine/core';

import { api } from '~/trpc/react';

export const GearboxSelect = () => {
  const [model, setFuel] = useQueryState(
    'gearbox',
    parseAsArrayOf(parseAsString)
      .withOptions({
        history: 'push',
        shallow: false,
      })
      .withDefault([]),
  );

  const { data, isFetching } = api.offer.getGearboxes.useQuery(undefined, { initialData: [] });

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
        name="gearbox"
        data={data.map((el) => ({ value: el.id, label: el.name }))}
        value={model}
        onChange={handleChange}
        label="Skrzynia biegów"
        placeholder="Wybierz"
        searchable
        disabled={!data.length || isFetching}
        mb="sm"
      />
    </>
  );
};
