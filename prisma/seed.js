import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const clerkId = 'user_2kOClxrdmYwtC7gP3J0osyAJgyd';
  await prisma.bodyType.createMany({
    data: [
      { id: 'crossover', name: 'Crossover' },
      { id: 'hatchback', name: 'Hatchback' },
      { id: 'kombi', name: 'Kombi' },
      { id: 'sedan', name: 'Sedan' },
      { id: 'suv', name: 'SUV' },
      { id: 'coupe', name: 'Coupe' },
      { id: 'kabriolet', name: 'Kabriolet' },
      { id: 'minivan', name: 'Minivan' },
      { id: 'pick-up', name: 'Pick-up' },
      // { id: 'autolaweta', name: 'Autolaweta' },
      // { id: 'brygadowy', name: 'Brygadowy' },
      // { id: 'ciagnik-siodlowy-low-deck', name: 'Ciągnik siodłowy low deck' },
      // { id: 'ciagnik-siodlowy-standard', name: 'Ciągnik siodłowy standard' },
      // { id: 'doka', name: 'Doka' },
      // { id: 'furgon', name: 'Furgon' },
      // { id: 'izoterma', name: 'Izoterma' },
      // { id: 'kontener', name: 'Kontener' },
      // { id: 'plandeka', name: 'Plandeka' },
      // { id: 'skrzynia', name: 'Skrzynia' },
      // { id: 'wywrotka', name: 'Wywrotka' },
    ],
  });
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        clerkId,
        email: 'pzakrzewski59@gmail.com',
        createdAt: '2024-08-08T19:29:51.387Z',
        updatedAt: '2024-08-08T19:29:51.387Z',
        status: 'ACTIVE',
      },
    ],
  });
  await prisma.brand.createMany({
    data: [
      { name: 'BMW', id: 'bmw' },
      { name: 'Mercedes', id: 'mercedes' },
      { name: 'Audi', id: 'audi' },
    ],
  });
  await prisma.model.createMany({
    data: [
      { name: 'X1', id: 'bmw.x1', brandId: 'bmw' },
      { name: 'X3', id: 'bmw.x3', brandId: 'bmw' },
      { name: 'X5', id: 'bmw.x5', brandId: 'bmw' },
      { name: 'GLA', id: 'mercedes.gla', brandId: 'mercedes' },
      { name: 'GLB', id: 'mercedes.glb', brandId: 'mercedes' },
      { name: 'GLC', id: 'mercedes.glc', brandId: 'mercedes' },
      { name: 'A4', id: 'audi.a4', brandId: 'audi' },
      { name: 'A5', id: 'audi.a5', brandId: 'audi' },
      { name: 'A6', id: 'audi.a6', brandId: 'audi' },
    ],
  });
  await prisma.offer.createMany({
    data: [
      {
        id: '0dcfnurhZv',
        clerkId,
        installment: 1000,
        title: 'Mercedes GLC Lorem ipsum?',
        description: null,
        price: null,
        brandId: 'mercedes',
        modelId: 'mercedes.glc',
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        engineSize: null,
        bodyTypeId: 'suv',
        color: null,
        condition: null,
        slug: 'mercedes-glc-lorem-ipsum-0dcfnurhZv',
        status: 'ACTIVE',
        type: 'PERSONAL',
        createdAt: '2024-08-26T19:16:03.954Z',
        updatedAt: '2024-08-26T19:27:59.134Z',
      },
      {
        id: '4ZYGe15iMp',
        clerkId,
        installment: 1000,
        title: 'Mercedes GLB Drop database :"|}{_+<>?,./',
        description: null,
        price: null,
        brandId: 'mercedes',
        modelId: 'mercedes.glb',
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        engineSize: null,
        bodyTypeId: 'suv',
        color: null,
        condition: null,
        slug: 'mercedes-glb-drop-database-4ZYGe15iMp',
        status: 'ACTIVE',
        type: 'PERSONAL',
        createdAt: '2024-08-26T19:16:03.954Z',
        updatedAt: '2024-08-26T19:27:59.134Z',
      },
      {
        id: '6Scyb5Jwwa',
        clerkId,
        installment: 1100,
        title: 'Mercedes GLC Tanio od niemca',
        description: null,
        price: null,
        brandId: 'mercedes',
        modelId: 'mercedes.glc',
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        engineSize: null,
        bodyTypeId: 'suv',
        color: null,
        condition: null,
        slug: 'mercedes-glc-tanio-od-niemca-6Scyb5Jwwa',
        status: 'ACTIVE',
        type: 'PERSONAL',
        createdAt: '2024-08-26T19:16:03.954Z',
        updatedAt: '2024-08-26T19:27:59.134Z',
      },
      {
        id: 'FNIANEEBcx',
        clerkId,
        installment: 1100,
        title: 'BMW X1 Test db',
        description: null,
        price: null,
        brandId: 'bmw',
        modelId: 'bmw.x1',
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        engineSize: null,
        bodyTypeId: 'suv',
        color: null,
        condition: null,
        slug: 'bmw-x1-test-db-FNIANEEBcx',
        status: 'ACTIVE',
        type: 'PERSONAL',
        createdAt: '2024-08-26T19:16:03.954Z',
        updatedAt: '2024-08-26T19:27:59.134Z',
      },
      {
        id: 'OxTN7Iy3Vb',
        clerkId,
        installment: 1200,
        title: 'Audi A5 Powypadkowe | Tanio | Do NEGOO?',
        description: null,
        price: null,
        brandId: 'audi',
        modelId: 'audi.a5',
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        engineSize: null,
        bodyTypeId: 'coupe',
        color: null,
        condition: null,
        slug: 'audi-a5-powypadkowe-tanio-do-negoo-OxTN7Iy3Vb',
        status: 'ACTIVE',
        type: 'PERSONAL',
        createdAt: '2024-08-26T19:16:03.954Z',
        updatedAt: '2024-08-26T19:27:59.134Z',
      },
      {
        id: 'VKpEBHlU0v',
        clerkId,
        installment: 1200,
        title: 'Audi A5 Rata 1000PLN !!!! Polecam!',
        description: null,
        price: null,
        brandId: 'audi',
        modelId: 'audi.a5',
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        engineSize: null,
        bodyTypeId: 'coupe',
        color: null,
        condition: null,
        slug: 'audi-a5-rata-1000-pln-polecam-VKpEBHlU0v',
        status: 'ACTIVE',
        type: 'PERSONAL',
        createdAt: '2024-08-26T19:16:03.954Z',
        updatedAt: '2024-08-26T19:27:59.134Z',
      },
      {
        id: 'YJz6oQWClQ',
        clerkId,
        installment: 1300,
        title: 'Mercedes GLA Nie lubie zupy :)',
        description: null,
        price: null,
        brandId: 'mercedes',
        modelId: 'mercedes.gla',
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        engineSize: null,
        bodyTypeId: 'crossover',
        color: null,
        condition: null,
        slug: 'mercedes-gla-nie-lubie-zupy-YJz6oQWClQ',
        status: 'ACTIVE',
        type: 'PERSONAL',
        createdAt: '2024-08-26T19:16:03.954Z',
        updatedAt: '2024-08-26T19:27:59.134Z',
      },
      {
        id: 'ZUILpIlIIW',
        clerkId,
        installment: 1300,
        title: 'BMW X1 Jedyny W POLSCE!! Taniocha',
        description: null,
        price: null,
        brandId: 'bmw',
        modelId: 'bmw.x1',
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        engineSize: null,
        bodyTypeId: 'suv',
        color: null,
        condition: null,
        slug: 'bmw-x1-jedyny-w-polsce-taniocha-ZUILpIlIIW',
        status: 'ACTIVE',
        type: 'PERSONAL',
        createdAt: '2024-08-26T19:16:03.954Z',
        updatedAt: '2024-08-26T19:27:59.134Z',
      },
      {
        id: 'kCkEw9avTW',
        clerkId,
        installment: 1400,
        title: 'Mercedes GLA Najnowsze z salonu',
        description: null,
        price: null,
        brandId: 'mercedes',
        modelId: 'mercedes.gla',
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        engineSize: null,
        bodyTypeId: 'crossover',
        color: null,
        condition: null,
        slug: 'mercedes-gla-najnowsze-z-salonu-kCkEw9avTW',
        status: 'ACTIVE',
        type: 'PERSONAL',
        createdAt: '2024-08-26T19:16:03.954Z',
        updatedAt: '2024-08-26T19:27:59.134Z',
      },
      {
        id: 'msq3ffqpdw',
        clerkId,
        installment: 2200,
        title: 'BMW X1 Pierwszy właściiel, || {}Pedał ściana/ / Używany',
        description: null,
        price: null,
        brandId: 'bmw',
        modelId: 'bmw.x1',
        year: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        engineSize: null,
        bodyTypeId: 'suv',
        color: null,
        condition: null,
        slug: 'bmw-x1-pierwszy-wlasciiel-pedal-sciana-uzywany-msq3ffqpdw',
        status: 'ACTIVE',
        type: 'PERSONAL',
        createdAt: '2024-08-26T19:16:03.954Z',
        updatedAt: '2024-08-26T19:27:59.134Z',
      },
    ],
  });
}

seed()
  .then(async () => {
    console.error('Seeded successfully');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding failed', e);
    await prisma.$disconnect();
    process.exit(1);
  });
