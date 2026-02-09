import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EvaluationResponse, CreateEvaluationRequest, ErrorResponse } from "@/lib/types";

export async function GET(): Promise<NextResponse<EvaluationResponse[] | ErrorResponse>> {
    try {
        const evaluations = await prisma.school.findMany({
        include: {
            scores: true,
            evidences: true,
        },
        orderBy: {
            totalScore: 'desc', 
        },
        });

        const response: EvaluationResponse[] = evaluations.map((evaluation) => {
        const scoreData = evaluation.scores[0]; 
        const evidenceData = evaluation.evidences[0];
        
        return {
            id: evaluation.id,
            schoolName: evaluation.schoolName,
            coverage: evaluation.coverage,
            area: evaluation.area,
            staff: evaluation.staff,
            totalScore: evaluation.totalScore,
            submittedAt: evaluation.submittedAt.toISOString(),
            scores: {
            sti1: scoreData?.sti1 ?? 0,
            sti2: scoreData?.sti2 ?? 0,
            sti3: scoreData?.sti3 ?? 0,
            sti4: scoreData?.sti4 ?? 0,
            wmr1: scoreData?.wmr1 ?? 0,
            wmr2: scoreData?.wmr2 ?? 0,
            wmr3: scoreData?.wmr3 ?? 0,
            wmr4: scoreData?.wmr4 ?? 0,
            wmr5: scoreData?.wmr5 ?? 0,
            ecc1: scoreData?.ecc1 ?? 0,
            ecc2: scoreData?.ecc2 ?? 0,
            ecc3: scoreData?.ecc3 ?? 0,
            ecc4: scoreData?.ecc4 ?? 0,
            ecc5: scoreData?.ecc5 ?? 0,
            hwq1: scoreData?.hwq1 ?? 0,
            hwq2: scoreData?.hwq2 ?? 0,
            hwq3: scoreData?.hwq3 ?? 0,
            gpm1: scoreData?.gpm1 ?? 0,
            gpm2: scoreData?.gpm2 ?? 0,
            gpm3: scoreData?.gpm3 ?? 0,
            ilp1: scoreData?.ilp1 ?? 0,
            ilp2: scoreData?.ilp2 ?? 0,
            ere1: scoreData?.ere1 ?? 0,
            ere2: scoreData?.ere2 ?? 0,
            ere3: scoreData?.ere3 ?? 0,
            ere4: scoreData?.ere4 ?? 0,
            ere5: scoreData?.ere5 ?? 0,
            },
            evidence: evidenceData ? {
            id: evidenceData.id,
            fileName: evidenceData.fileName,
            fileData: evidenceData.fileData,
            fileSize: evidenceData.fileSize,
            mimeType: evidenceData.mimeType,
            createdAt: evidenceData.createdAt.toISOString(),
            } : null,
        };
        });

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching evaluations:", error);
        return NextResponse.json(
        { 
            error: "Failed to fetch evaluations",
            details: error instanceof Error ? error.message : "Unknown error"
        },
        { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest
    ): Promise<NextResponse<EvaluationResponse | ErrorResponse>> {
    try {
        const body: CreateEvaluationRequest = await request.json();
        if (!body.schoolName || !body.area || !body.staff || !body.scores) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
        }

        const newEvaluation = await prisma.school.create({
        data: {
            schoolName: body.schoolName,
            coverage: body.coverage || null,
            area: body.area,
            staff: body.staff,
            totalScore: body.totalScore,
            scores: {
            create: {
                sti1: body.scores.sti1 ?? 0,
                sti2: body.scores.sti2 ?? 0,
                sti3: body.scores.sti3 ?? 0,
                sti4: body.scores.sti4 ?? 0,
                wmr1: body.scores.wmr1 ?? 0,
                wmr2: body.scores.wmr2 ?? 0,
                wmr3: body.scores.wmr3 ?? 0,
                wmr4: body.scores.wmr4 ?? 0,
                wmr5: body.scores.wmr5 ?? 0,
                ecc1: body.scores.ecc1 ?? 0,
                ecc2: body.scores.ecc2 ?? 0,
                ecc3: body.scores.ecc3 ?? 0,
                ecc4: body.scores.ecc4 ?? 0,
                ecc5: body.scores.ecc5 ?? 0,
                hwq1: body.scores.hwq1 ?? 0,
                hwq2: body.scores.hwq2 ?? 0,
                hwq3: body.scores.hwq3 ?? 0,
                gpm1: body.scores.gpm1 ?? 0,
                gpm2: body.scores.gpm2 ?? 0,
                gpm3: body.scores.gpm3 ?? 0,
                ilp1: body.scores.ilp1 ?? 0,
                ilp2: body.scores.ilp2 ?? 0,
                ere1: body.scores.ere1 ?? 0,
                ere2: body.scores.ere2 ?? 0,
                ere3: body.scores.ere3 ?? 0,
                ere4: body.scores.ere4 ?? 0,
                ere5: body.scores.ere5 ?? 0,
            },
            },
            evidences: body.evidence ? {
            create: {
                fileName: body.evidence.fileName,
                fileData: body.evidence.fileData,
                fileSize: body.evidence.fileSize,
            }
            } : undefined,
        },
        include: {
            scores: true,
            evidences: true,
        },
        });

        const scoreData = newEvaluation.scores[0];
        const evidenceData = newEvaluation.evidences[0];
        
        const response: EvaluationResponse = {
        id: newEvaluation.id,
        schoolName: newEvaluation.schoolName,
        coverage: newEvaluation.coverage,
        area: newEvaluation.area,
        staff: newEvaluation.staff,
        totalScore: newEvaluation.totalScore,
        submittedAt: newEvaluation.submittedAt.toISOString(),
        scores: {
            sti1: scoreData?.sti1 ?? 0,
            sti2: scoreData?.sti2 ?? 0,
            sti3: scoreData?.sti3 ?? 0,
            sti4: scoreData?.sti4 ?? 0,
            wmr1: scoreData?.wmr1 ?? 0,
            wmr2: scoreData?.wmr2 ?? 0,
            wmr3: scoreData?.wmr3 ?? 0,
            wmr4: scoreData?.wmr4 ?? 0,
            wmr5: scoreData?.wmr5 ?? 0,
            ecc1: scoreData?.ecc1 ?? 0,
            ecc2: scoreData?.ecc2 ?? 0,
            ecc3: scoreData?.ecc3 ?? 0,
            ecc4: scoreData?.ecc4 ?? 0,
            ecc5: scoreData?.ecc5 ?? 0,
            hwq1: scoreData?.hwq1 ?? 0,
            hwq2: scoreData?.hwq2 ?? 0,
            hwq3: scoreData?.hwq3 ?? 0,
            gpm1: scoreData?.gpm1 ?? 0,
            gpm2: scoreData?.gpm2 ?? 0,
            gpm3: scoreData?.gpm3 ?? 0,
            ilp1: scoreData?.ilp1 ?? 0,
            ilp2: scoreData?.ilp2 ?? 0,
            ere1: scoreData?.ere1 ?? 0,
            ere2: scoreData?.ere2 ?? 0,
            ere3: scoreData?.ere3 ?? 0,
            ere4: scoreData?.ere4 ?? 0,
            ere5: scoreData?.ere5 ?? 0,
        },
        evidence: evidenceData ? {
            id: evidenceData.id,
            fileName: evidenceData.fileName,
            fileData: evidenceData.fileData,
            fileSize: evidenceData.fileSize,
            mimeType: evidenceData.mimeType,
            createdAt: evidenceData.createdAt.toISOString(),
        } : null,
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error("Error creating evaluation:", error);
        return NextResponse.json(
        { 
            error: "Failed to create evaluation",
            details: error instanceof Error ? error.message : "Unknown error"
        },
        { status: 500 }
        );
    }
}