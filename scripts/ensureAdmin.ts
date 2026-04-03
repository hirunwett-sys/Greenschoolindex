import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma';

async function main() {
  const username = 'admin';
  const password = 'admin123';

  const hashedPassword = await bcrypt.hash(password, 12);

  const existing = await prisma.admin.findUnique({ where: { username } });
  if (existing) {
    await prisma.admin.update({
      where: { username },
      data: { password: hashedPassword },
    });
    console.log(`Updated admin '${username}' password to '${password}' (hashed).`);
  } else {
    await prisma.admin.create({
      data: { username, password: hashedPassword },
    });
    console.log(`Created admin '${username}' with password '${password}' (hashed).`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
