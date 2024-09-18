'use client';

import { z } from 'zod';

import { GetOfferSchema } from '~/server/api/routers/offer.schema';
import { InstallmentRange } from '~/app/_components/Filters/InstallmentRange';
import { BrandSelect } from '~/app/_components/Filters/BrandSelect';
import { ModelSelect } from '~/app/_components/Filters/ModelSelect';

import { BrandAndModelSelect } from '~/app/_components/Filters/BrandAndModelSelect';

type GetOfferFormType = z.infer<typeof GetOfferSchema>;

export const Filters = () => {
  // const methods = useForm<GetOfferFormType>({
  //   mode: 'all',
  //   resolver: zodResolver(GetOfferSchema),
  //   defaultValues: {
  //     brands: [],
  //     models: [],
  //     installmentFrom: undefined,
  //     installmentTo: undefined,
  //   },
  // });
  //
  return (
    <div style={{ border: '1px solid black', padding: '10px', width: 300 }}>
      <form role="search">
        <BrandSelect />
        <ModelSelect />
        <InstallmentRange />
      </form>
    </div>
  );
};
