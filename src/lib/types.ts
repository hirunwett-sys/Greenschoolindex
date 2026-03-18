export interface EvaluationResponse {
    id: string;
    schoolName: string;
    coverage: string | null;
    area: string;
    staff: string;
    totalScore: number;
    status: string;
    verifiedAt: string | null;
    submittedAt: string;
    scores: ScoresData;
    evidence?: EvidenceData | null;
}

export interface ScoresData {
    sti1: number;
    sti1Reason?: string;
    sti2: number;
    sti2Reason?: string;
    sti3: number;
    sti3Reason?: string;
    sti4: number;
    sti4Reason?: string;
    wmr1: number;
    wmr1Reason?: string;
    wmr2: number;
    wmr2Reason?: string;
    wmr3: number;
    wmr3Reason?: string;
    wmr4: number;
    wmr4Reason?: string;
    wmr5: number;
    wmr5Reason?: string;
    ecc1: number;
    ecc1Reason?: string;
    ecc2: number;
    ecc2Reason?: string;
    ecc3: number;
    ecc3Reason?: string;
    ecc4: number;
    ecc4Reason?: string;
    ecc5: number;
    ecc5Reason?: string;
    hwq1: number;
    hwq1Reason?: string;
    hwq2: number;
    hwq2Reason?: string;
    hwq3: number;
    hwq3Reason?: string;
    gpm1: number;
    gpm1Reason?: string;
    gpm2: number;
    gpm2Reason?: string;
    gpm3: number;
    gpm3Reason?: string;
    ilp1: number;
    ilp1Reason?: string;
    ilp2: number;
    ilp2Reason?: string;
    ere1: number;
    ere1Reason?: string;
    ere2: number;
    ere2Reason?: string;
    ere3: number;
    ere3Reason?: string;
    ere4: number;
    ere4Reason?: string;
    ere5: number;
    ere5Reason?: string;
}

export interface EvidenceData {
    id: string;
    fileName: string;
    fileData: string;
    fileSize: number;
    mimeType: string;
    createdAt: string;
}

export interface CreateEvaluationRequest {
    schoolName: string;
    coverage?: string;
    area: string;
    staff: string;
    scores: ScoresData;
    reasons?: Record<string, string>;
    totalScore: number;
    evidence?: {
        fileName: string;
        fileData: string; 
        fileSize: number;
    } | null;
}

export interface ErrorResponse {
    error: string;
    details?: string;
}