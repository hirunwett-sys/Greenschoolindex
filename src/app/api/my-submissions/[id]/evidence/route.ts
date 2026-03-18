import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyUserToken, USER_COOKIE_NAME } from '@/lib/userAuth';
import { verifyAdminToken, COOKIE_NAME as ADMIN_COOKIE_NAME } from '@/lib/auth';

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
    const userToken = request.cookies.get(USER_COOKIE_NAME)?.value;
    const userPayload = userToken ? await verifyUserToken(userToken) : null;
    const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const adminPayload = (!userPayload && adminToken) ? await verifyAdminToken(adminToken) : null;

    if (!userPayload && !adminPayload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const school = await prisma.school.findUnique({ where: { id }, include: { evidences: true } });
    if (!school) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const isOwner = userPayload
        ? school.userId === userPayload.userId
        : school.adminId === adminPayload!.adminId;
    if (!isOwner) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (school.evidences.length > 0) return NextResponse.json({ error: 'มีหลักฐานอยู่แล้ว' }, { status: 409 });

    const { fileName, fileData, fileSize } = await request.json();
    if (!fileName || !fileData || !fileSize) {
        return NextResponse.json({ error: 'ข้อมูลไฟล์ไม่ครบถ้วน' }, { status: 400 });
    }

    const evidence = await prisma.evidence.create({
        data: { schoolId: id, fileName, fileData, fileSize },
    });

    return NextResponse.json(
        { id: evidence.id, fileName: evidence.fileName, fileSize: evidence.fileSize, createdAt: evidence.createdAt.toISOString() },
        { status: 201 }
    );
}
