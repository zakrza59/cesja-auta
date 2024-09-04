'use client';

import { z } from 'zod';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { BrandAndModelSelect } from '~/app/_components/Filters/BrandAndModelSelect';
import { GetOfferSchema } from '~/server/api/routers/offer.schema';

type GetOfferFormType = z.infer<typeof GetOfferSchema>;

export const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const methods = useForm<GetOfferFormType>({
    mode: 'all',
    resolver: zodResolver(GetOfferSchema),
    defaultValues: {
      brands: [],
      models: [],
    },
  });

  const formValues = methods.watch();

  function handleSearch(form: GetOfferFormType) {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(form)) {
      console.log(params, searchParams, 'WESZLO');
      if (value.length > 0) {
        const param = value.sort().join(',');
        params.set(key, param);
      } else {
        params.delete(key);
      }
    }
    console.log(pathname, decodeURIComponent(params.toString()), 'path');
    replace(`${pathname}?${decodeURIComponent(params.toString())}`);
  }

  useEffect(() => {
    console.log('Form values changed:', formValues);
    handleSearch(formValues);
  }, [formValues, handleSearch]);

  return (
    <div>
      <FormProvider {...methods}>
        <form role="search">
          <BrandAndModelSelect />
        </form>
      </FormProvider>
    </div>
  );
};
