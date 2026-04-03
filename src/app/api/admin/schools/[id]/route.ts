import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken, COOKIE_NAME } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface RouteParams {
    params: Promise<{ id: string }>;
}

async function checkAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return !!(await verifyAdminToken(token));
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
    if (!(await checkAdmin())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;

        const school = await prisma.school.findUnique({ where: { id } });
        if (!school) {
            return NextResponse.json({ error: 'School not found' }, { status: 404 });
        }

        // Cascade deletes Score and Evidence automatically (onDelete: Cascade in schema)
        await prisma.school.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting school:', error);
        return NextResponse.json({ error: 'Failed to delete school' }, { status: 500 });
    }
}
