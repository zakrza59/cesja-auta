'use client';

import { useEffect } from 'react';
import { z } from 'zod';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { GetOfferSchema } from '~/server/api/routers/offer.schema';
import { BrandAndModelSelect } from '~/app/_components/Filters/BrandAndModelSelect';
import { InstallmentRange } from '~/app/_components/Filters/InstallmentRange';

type GetOfferFormType = z.infer<typeof GetOfferSchema>;

export const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const methods = useForm<GetOfferFormType>({
    mode: 'all',
    resolver: zodResolver(GetOfferSchema),
    defaultValues: {
      brands: [],
      models: [],
      installmentFrom: undefined,
      installmentTo: undefined,
    },
  });

  const formValues = methods.watch();

  function handleSearch(form: GetOfferFormType) {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(form)) {
      console.log(params, searchParams, 'WESZLO');
      if (Array.isArray(value)) {
        if (value.length > 0) {
          const param = value.sort().join(',');
          params.set(key, param);
        } else {
          params.delete(key);
        }
      } else {
        if (value) {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      }
    }
    console.log(pathname, decodeURIComponent(params.toString()), params.toString(), 'path');
    push(`${pathname}?${decodeURIComponent(params.toString()).split('&').sort().join('&')}`);
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
          <InstallmentRange />
        </form>
      </FormProvider>
    </div>
  );
};
