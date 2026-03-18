import { prisma } from '../src/lib/prisma';

async function main() {
  const admins = await prisma.admin.findMany();
  console.log('admins:', admins);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
