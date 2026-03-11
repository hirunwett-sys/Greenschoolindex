import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EvaluationResponse, ErrorResponse } from "@/lib/types";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    request: NextRequest,
    { params }: RouteParams
    ): Promise<NextResponse<EvaluationResponse | ErrorResponse>> {
    try {
        const { id } = await params;

        const evaluation = await prisma.school.findUnique({
        where: { id },
        include: {
            scores: true,
        },
        });

        if (!evaluation) {
        return NextResponse.json(
            { error: "Evaluation not found" },
            { status: 404 }
        );
        }

        const scoreData = evaluation.scores[0]; 

        const response: EvaluationResponse = {
        id: evaluation.id,
        schoolName: evaluation.schoolName,
        coverage: evaluation.coverage,
        area: evaluation.area,
        staff: evaluation.staff,
        totalScore: evaluation.totalScore,
        status: evaluation.status,
        verifiedAt: evaluation.verifiedAt?.toISOString() ?? null,
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
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching evaluation:", error);
        return NextResponse.json(
        { 
            error: "Failed to fetch evaluation",
            details: error instanceof Error ? error.message : "Unknown error"
        },
        { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
    ): Promise<NextResponse<{ message: string } | ErrorResponse>> {
    try {
        const { id } = await params;

        const evaluation = await prisma.school.findUnique({
        where: { id },
        });

        if (!evaluation) {
        return NextResponse.json(
            { error: "Evaluation not found" },
            { status: 404 }
        );
        }

        await prisma.school.delete({
        where: { id },
        });

        return NextResponse.json(
        { message: "Evaluation deleted successfully" },
        { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting evaluation:", error);
        return NextResponse.json(
        { 
            error: "Failed to delete evaluation",
            details: error instanceof Error ? error.message : "Unknown error"
        },
        { status: 500 }
        );
    }
}