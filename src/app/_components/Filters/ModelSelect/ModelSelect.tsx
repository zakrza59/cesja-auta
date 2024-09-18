import { useQueryState, parseAsString, parseAsArrayOf } from 'nuqs';
import { MultiSelect } from '@mantine/core';
import { useEffect, useMemo } from 'react';

import { api } from '~/trpc/react';

export const ModelSelect = () => {
  const [model, setModel] = useQueryState(
    'model',
    parseAsArrayOf(parseAsString)
      .withOptions({
        history: 'push',
        shallow: false,
      })
      .withDefault([]),
  );
  const [brand] = useQueryState('brand', parseAsArrayOf(parseAsString).withDefault([]));

  const { data, isFetching } = api.offer.getBrandsModels.useQuery(
    { brandIds: brand },
    { initialData: [], enabled: !!brand.length },
  );

  const handleChange = (value: string[]) => {
    setModel(value.length > 0 ? value.sort() : null);
  };

  const validModels = useMemo(
    () =>
      model.filter((selectedModel) => {
        const [brandName] = selectedModel.split('.');
        return brand.includes(brandName as string);
      }),
    [model, brand],
  );

  useEffect(() => {
    if (validModels.length !== model.length) {
      setModel(validModels.length > 0 ? validModels : null);
    }
  }, [validModels, model, setModel]);

  //TODO add loading view so we cant se selected values without fetched options
  if (isFetching) {
    return <div>Loading models...</div>;
  }

  return (
    <>
      <MultiSelect
        name="model"
        data={data}
        value={model}
        onChange={handleChange}
        label="Model pojazdu"
        placeholder="Wybierz"
        searchable
        disabled={!brand.length || !data.length || isFetching}
        mb="sm"
      />
    </>
  );
};
