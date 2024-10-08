import { useQueryState, parseAsString, parseAsArrayOf } from 'nuqs';
import { MultiSelect } from '@mantine/core';

import { api } from '~/trpc/react';

export const BodySelect = () => {
  const [model, setBody] = useQueryState(
    'body',
    parseAsArrayOf(parseAsString)
      .withOptions({
        history: 'push',
        shallow: false,
      })
      .withDefault([]),
  );

  const { data, isFetching } = api.offer.getBodies.useQuery(undefined, { initialData: [] });

  const handleChange = (value: string[]) => {
    setBody(value.length > 0 ? value.sort() : null);
  };

  //TODO add loading view so we cant se selected values without fetched options
  if (isFetching) {
    return <div>Loading models...</div>;
  }

  return (
    <>
      <MultiSelect
        name="body"
        data={data.map((el) => ({ value: el.id, label: el.name }))}
        value={model}
        onChange={handleChange}
        label="Typ nadwozia"
        placeholder="Wybierz"
        searchable
        disabled={!data.length || isFetching}
        mb="sm"
      />
    </>
  );
};
