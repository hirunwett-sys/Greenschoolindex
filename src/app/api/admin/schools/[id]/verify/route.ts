import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        const school = await prisma.school.findUnique({ where: { id } });
        if (!school) {
            return NextResponse.json({ error: 'School not found' }, { status: 404 });
        }

        const updated = await prisma.school.update({
            where: { id },
            data: {
                status: 'verified',
                verifiedAt: new Date(),
            },
        });

        return NextResponse.json({
            id: updated.id,
            status: updated.status,
            verifiedAt: updated.verifiedAt?.toISOString() ?? null,
        });
    } catch (error) {
        console.error('Error verifying school:', error);
        return NextResponse.json({ error: 'Failed to verify school' }, { status: 500 });
    }
}
