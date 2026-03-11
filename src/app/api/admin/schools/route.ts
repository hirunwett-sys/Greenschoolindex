import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const schools = await prisma.school.findMany({
            include: {
                scores: true,
                evidences: {
                    select: {
                        id: true,
                        fileName: true,
                        fileData: true,
                        fileSize: true,
                        mimeType: true,
                        createdAt: true,
                    },
                },
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
            orderBy: { submittedAt: 'desc' },
        });

        const response = schools.map((school) => ({
            id: school.id,
            schoolName: school.schoolName,
            coverage: school.coverage,
            area: school.area,
            staff: school.staff,
            totalScore: school.totalScore,
            status: school.status,
            verifiedAt: school.verifiedAt?.toISOString() ?? null,
            submittedAt: school.submittedAt.toISOString(),
            hasEvidence: school.evidences.length > 0,
            submittedBy: school.user ? { id: school.user.id, name: school.user.name, email: school.user.email } : null,
            evidence: school.evidences[0]
                ? {
                      id: school.evidences[0].id,
                      fileName: school.evidences[0].fileName,
                      fileData: school.evidences[0].fileData,
                      fileSize: school.evidences[0].fileSize,
                      mimeType: school.evidences[0].mimeType,
                      createdAt: school.evidences[0].createdAt.toISOString(),
                  }
                : null,
        }));

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching schools:', error);
        return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
    }
}
