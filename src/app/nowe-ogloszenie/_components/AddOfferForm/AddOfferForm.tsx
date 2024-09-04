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
      brand: null,
      // @ts-expect-error needs to be null otherwise reset will not work
      model: null,
    },
  });

  const selectedBrand = watch('brand');

  useEffect(() => {
    resetField('model');
  }, [resetField, selectedBrand]);

  const {
    data: brands,
    // error: brandsError,
    isPending: brandsPending,
  } = api.offer.getBrands.useQuery(undefined, { initialData: [] });
  const {
    data: brandModels,
    // error: brandModelsError,
    isPending: brandModelsPending,
  } = api.offer.getBrandModels.useQuery({ brandId: selectedBrand }, { initialData: [], enabled: !!selectedBrand });
  const { mutate, isPending } = api.offer.addOffer.useMutation({
    onSuccess: () => {
      resetField('title');
      resetField('brand');
      resetField('model');

      router.push(routes.myAccount);
    },
  });

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
          maxLength={70}
        />
        <Select
          mb="sm"
          data={brands.map((el) => ({ value: el.id, label: el.name }))}
          name="brand"
          label="Marka pojazdu"
          placeholder="Wybierz"
          searchable
          allowDeselect={false}
          control={control}
          disabled={brandsPending}
        />
        <Select
          data={brandModels.map((el) => ({ value: el.id, label: el.name }))}
          name="model"
          label="Model pojazdu"
          placeholder="Wybierz"
          searchable
          allowDeselect={false}
          control={control}
          disabled={!brands.length || !brandModels.length || brandModelsPending}
        />
      </Fieldset>
      <button type="submit" disabled={isPending}>
        Testuj
      </button>
    </form>
  );
};
