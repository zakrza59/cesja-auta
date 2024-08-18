'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { Fieldset } from '@mantine/core';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { api } from '~/trpc/react';
import { Select } from '~/app/_components/Select';
import { TextInput } from '~/app/_components/TextInput';
import { AddOfferSchema } from '~/server/api/routers/offer.schema';
import { routes } from '~/const/routes';

type AddOfferFormType = z.infer<typeof AddOfferSchema>;

export const AddOfferForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<AddOfferFormType>({
    resolver: zodResolver(AddOfferSchema),
    defaultValues: {
      title: '',
      // @ts-expect-error needs to be null otherwise reset will not work
      make: null,
      // @ts-expect-error needs to be null otherwise reset will not work
      model: null,
    },
  });

  const selectedMake = watch('make');

  useEffect(() => {
    resetField('model');
  }, [resetField, selectedMake]);

  const {
    data: makes,
    // error: makesError,
    isPending: makesPending,
  } = api.offer.getMakes.useQuery(undefined, { initialData: [] });
  const {
    data: makeModels,
    // error: makeModelsError,
    isPending: makeModelsPending,
  } = api.offer.getMakeModels.useQuery({ makeId: selectedMake }, { initialData: [], enabled: !!selectedMake });
  const { mutate, isPending } = api.offer.addOffer.useMutation({
    onSuccess: () => {
      resetField('title');
      resetField('make');
      resetField('model');

      router.push(routes.myAccount);
    },
  });
  //
  // console.log(makes, 'makes');
  // console.log(makeModels, 'makeModels');
  // console.log(selectedMake, 'selectedMake');

  const onSubmit: SubmitHandler<AddOfferFormType> = (data) => {
    mutate(data);
    console.log('weszlo', data);
  };

  const onError: SubmitErrorHandler<AddOfferFormType> = (error) => {
    console.log('weszlo error', error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Fieldset legend="Personal information">
        <TextInput
          mb="sm"
          name="title"
          label="Tytuł ogłoszenia"
          placeholder="np. pierwszy właściciel, stan idealny, nowy akumulator"
          control={control}
        />
        <Select
          mb="sm"
          data={makes.map((el) => ({ value: el.id, label: el.name }))}
          name="make"
          label="Marka pojazdu"
          placeholder="Wybierz"
          searchable
          allowDeselect={false}
          control={control}
          disabled={makesPending}
          error={errors.make?.message}
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
          error={errors.model?.message}
        />
      </Fieldset>
      <button type="submit" disabled={isPending}>
        Testuj
      </button>
    </form>
  );
};
