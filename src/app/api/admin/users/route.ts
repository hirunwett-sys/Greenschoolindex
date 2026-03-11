import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            _count: { select: { schools: true } },
        },
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(
        users.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            createdAt: u.createdAt.toISOString(),
            submissionCount: u._count.schools,
        }))
    );
}
