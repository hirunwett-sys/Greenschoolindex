import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const existing = await prisma.admin.count();
    if (existing > 0) {
        console.log('Admin already exists, skipping seed.');
        return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.admin.create({
        data: {
            username: 'admin',
            password: hashedPassword,
        },
    });

    console.log(`Created admin: username="${admin.username}", password="admin123"`);
    console.log('Please change the password after first login via /api/admin/setup');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
