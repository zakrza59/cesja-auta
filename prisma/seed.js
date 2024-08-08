import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.make.createMany({
    data: [
      { name: 'BMW', id: 'bmw' },
      { name: 'Mercedes', id: 'mercedes' },
      { name: 'Audi', id: 'audi' },
    ],
  });
  await prisma.model.createMany({
    data: [
      { name: 'X1', id: 'bmw.x1', makeId: 'bmw' },
      { name: 'X3', id: 'bmw.x3', makeId: 'bmw' },
      { name: 'X5', id: 'bmw.x5', makeId: 'bmw' },
      { name: 'GLA', id: 'mercedes.gla', makeId: 'mercedes' },
      { name: 'GLB', id: 'mercedes.glb', makeId: 'mercedes' },
      { name: 'GLC', id: 'mercedes.glc', makeId: 'mercedes' },
      { name: 'A4', id: 'audi.a4', makeId: 'audi' },
      { name: 'A5', id: 'audi.a5', makeId: 'audi' },
      { name: 'A6', id: 'audi.a6', makeId: 'audi' },
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
