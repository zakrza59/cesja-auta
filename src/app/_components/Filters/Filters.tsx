'use client';

import { z } from 'zod';

import { GetOfferSchema } from '~/server/api/routers/offer.schema';
import { BrandSelect } from '~/app/_components/Filters/BrandSelect';
import { ModelSelect } from '~/app/_components/Filters/ModelSelect';
import { InstallmentInputs } from 'src/app/_components/Filters/InstallmentInputs';
import { PriceInputs } from '~/app/_components/Filters/PriceInputs';
import { YearInputs } from '~/app/_components/Filters/YearInputs';
import { BodySelect } from '~/app/_components/Filters/BodySelect';
import { FuelSelect } from '~/app/_components/Filters/FuelSelect';
import { GearboxSelect } from '~/app/_components/Filters/GearboxSelect';

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
        <InstallmentInputs />
        <PriceInputs />
        <YearInputs />
        <BodySelect />
        <FuelSelect />
        <GearboxSelect />
      </form>
    </div>
  );
};
