import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyUserToken, USER_COOKIE_NAME } from '@/lib/userAuth';
import { verifyAdminToken, COOKIE_NAME as ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function GET(request: NextRequest) {
    // Try user token first
    const userToken = request.cookies.get(USER_COOKIE_NAME)?.value;
    const userPayload = userToken ? await verifyUserToken(userToken) : null;

    // Then admin token
    const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const adminPayload = (!userPayload && adminToken) ? await verifyAdminToken(adminToken) : null;

    if (!userPayload && !adminPayload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const where = userPayload
        ? { userId: userPayload.userId }
        : { adminId: adminPayload!.adminId };

    const schools = await prisma.school.findMany({
        where,
        include: {
            evidences: {
                select: { id: true, fileName: true, fileSize: true, mimeType: true, createdAt: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
        schools.map((s) => ({
            id: s.id,
            schoolName: s.schoolName,
            coverage: s.coverage,
            area: s.area,
            staff: s.staff,
            totalScore: s.totalScore,
            status: s.status,
            verifiedAt: s.verifiedAt?.toISOString() ?? null,
            submittedAt: s.submittedAt.toISOString(),
            evidence: s.evidences[0]
                ? {
                      id: s.evidences[0].id,
                      fileName: s.evidences[0].fileName,
                      fileSize: s.evidences[0].fileSize,
                      mimeType: s.evidences[0].mimeType,
                      createdAt: s.evidences[0].createdAt.toISOString(),
                  }
                : null,
        }))
    );
}
