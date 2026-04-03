import { NextResponse } from 'next/server';
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
            scores: school.scores[0] ? {
                id: school.scores[0].id,
                sti1: school.scores[0].sti1, sti1Reason: school.scores[0].sti1Reason,
                sti2: school.scores[0].sti2, sti2Reason: school.scores[0].sti2Reason,
                sti3: school.scores[0].sti3, sti3Reason: school.scores[0].sti3Reason,
                sti4: school.scores[0].sti4, sti4Reason: school.scores[0].sti4Reason,
                wmr1: school.scores[0].wmr1, wmr1Reason: school.scores[0].wmr1Reason,
                wmr2: school.scores[0].wmr2, wmr2Reason: school.scores[0].wmr2Reason,
                wmr3: school.scores[0].wmr3, wmr3Reason: school.scores[0].wmr3Reason,
                wmr4: school.scores[0].wmr4, wmr4Reason: school.scores[0].wmr4Reason,
                wmr5: school.scores[0].wmr5, wmr5Reason: school.scores[0].wmr5Reason,
                ecc1: school.scores[0].ecc1, ecc1Reason: school.scores[0].ecc1Reason,
                ecc2: school.scores[0].ecc2, ecc2Reason: school.scores[0].ecc2Reason,
                ecc3: school.scores[0].ecc3, ecc3Reason: school.scores[0].ecc3Reason,
                ecc4: school.scores[0].ecc4, ecc4Reason: school.scores[0].ecc4Reason,
                ecc5: school.scores[0].ecc5, ecc5Reason: school.scores[0].ecc5Reason,
                hwq1: school.scores[0].hwq1, hwq1Reason: school.scores[0].hwq1Reason,
                hwq2: school.scores[0].hwq2, hwq2Reason: school.scores[0].hwq2Reason,
                hwq3: school.scores[0].hwq3, hwq3Reason: school.scores[0].hwq3Reason,
                gpm1: school.scores[0].gpm1, gpm1Reason: school.scores[0].gpm1Reason,
                gpm2: school.scores[0].gpm2, gpm2Reason: school.scores[0].gpm2Reason,
                gpm3: school.scores[0].gpm3, gpm3Reason: school.scores[0].gpm3Reason,
                ilp1: school.scores[0].ilp1, ilp1Reason: school.scores[0].ilp1Reason,
                ilp2: school.scores[0].ilp2, ilp2Reason: school.scores[0].ilp2Reason,
                ere1: school.scores[0].ere1, ere1Reason: school.scores[0].ere1Reason,
                ere2: school.scores[0].ere2, ere2Reason: school.scores[0].ere2Reason,
                ere3: school.scores[0].ere3, ere3Reason: school.scores[0].ere3Reason,
                ere4: school.scores[0].ere4, ere4Reason: school.scores[0].ere4Reason,
                ere5: school.scores[0].ere5, ere5Reason: school.scores[0].ere5Reason,
            } : null,
        }));

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching schools:', error);
        return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
    }
}
