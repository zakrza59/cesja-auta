'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset } from '@mantine/core';

import { api } from '~/trpc/react';
import { Select } from '~/app/_components/Select';

export const AddOfferForm = () => {
  const { control, handleSubmit, watch, resetField, setValue } = useForm({});

  const selectedMake = watch('make');

  useEffect(() => {
    resetField('model');
  }, [resetField, selectedMake]);

  const {
    data: makes,
    error: makesError,
    isPending: makesPending,
  } = api.offer.getMakes.useQuery(undefined, { initialData: [] });
  const {
    data: makeModels,
    error: makeModelsError,
    isPending: makeModelsPending,
  } = api.offer.getMakeModels.useQuery({ makeId: selectedMake }, { initialData: [], enabled: !!selectedMake });
  console.log(makes, 'makes');
  console.log(makeModels, 'makeModels');
  console.log(selectedMake, 'selectedMake');

  return (
    <form
      onSubmit={handleSubmit(
        (data) => console.log('weszlo', data),
        (error) => console.log('weszlo error', error),
      )}
    >
      <Fieldset legend="Personal information">
        <Select
          data={makes.map((el) => ({ value: el.id, label: el.name }))}
          name="make"
          label="Marka pojazdu"
          placeholder="Wybierz"
          searchable
          allowDeselect={false}
          control={control}
          disabled={makesPending}
        />
        <Select
          data={makeModels.map((el) => ({ value: el.id, label: el.name }))}
          name="model"
          label="Model pojazdu"
          placeholder="Wybierz"
          searchable
          allowDeselect={false}
          control={control}
          disabled={!makes.length || !makeModels.length || makeModelsPending}
          defaultValue={null} // TODO: move it to initial form data
        />
      </Fieldset>
      <button type="submit">Testuj</button>
    </form>
  );
};
