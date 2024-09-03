import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { MultiSelect } from '~/app/_components/MultiSelect';
import { api } from '~/trpc/react';

export const BrandAndModelSelect = () => {
  const { control, watch, setValue } = useFormContext(); // retrieve all hook methods

  const selectedMakes = watch('makes');
  const selectedModels = watch('models');

  const { data: makes, isPending: makesPending } = api.offer.getMakes.useQuery(undefined, { initialData: [] });
  const { data: makesModels, isPending: makesModelsPending } = api.offer.getMakesModels.useQuery(
    { makeIds: selectedMakes },
    { initialData: [], enabled: !!selectedMakes.length },
  );

  useEffect(() => {
    //remove models when removing makes
    const filteredModels = selectedModels.filter((selectedModel) => {
      const [name] = selectedModel.split('.');
      return selectedMakes.includes(name as string);
    });
    console.log(filteredModels, 'WESZLO filteredModels');
    setValue('models', filteredModels);
  }, [selectedMakes, setValue]);

  return (
    <>
      <MultiSelect
        mb="sm"
        data={makes.map((el) => ({ value: el.id, label: el.name }))}
        name="makes"
        label="Marka pojazdu"
        placeholder="Wybierz"
        searchable
        control={control}
        disabled={makesPending}
      />
      <MultiSelect
        mb="sm"
        data={makesModels}
        name="models"
        label="Model pojazdu"
        placeholder="Wybierz"
        searchable
        control={control}
        disabled={!makes.length || !makesModels.length || makesModelsPending}
      />
    </>
  );
};
