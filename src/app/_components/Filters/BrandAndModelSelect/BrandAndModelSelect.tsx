import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { MultiSelect } from '~/app/_components/WithRHF';
import { api } from '~/trpc/react';

export const BrandAndModelSelect = () => {
  const { control, watch, setValue } = useFormContext();

  const selectedBrands = watch('brands');
  const selectedModels = watch('models');

  const { data: brands, isPending: brandsPending } = api.offer.getBrands.useQuery(undefined, { initialData: [] });
  const { data: brandsModels, isPending: brandsModelsPending } = api.offer.getBrandsModels.useQuery(
    { brandIds: selectedBrands },
    { initialData: [], enabled: !!selectedBrands.length },
  );

  useEffect(() => {
    //remove models when removing brands
    const filteredModels = selectedModels.filter((selectedModel) => {
      const [name] = selectedModel.split('.');
      return selectedBrands.includes(name as string);
    });
    console.log(filteredModels, 'WESZLO filteredModels');
    setValue('models', filteredModels);
  }, [selectedBrands, setValue]);

  return (
    <>
      <MultiSelect
        mb="sm"
        data={brands.map((el) => ({ value: el.id, label: el.name }))}
        name="brands"
        label="Marka pojazdu"
        placeholder="Wybierz"
        searchable
        control={control}
        disabled={brandsPending}
      />
      <MultiSelect
        mb="sm"
        data={brandsModels}
        name="models"
        label="Model pojazdu"
        placeholder="Wybierz"
        searchable
        control={control}
        disabled={!brands.length || !brandsModels.length || brandsModelsPending}
      />
    </>
  );
};
