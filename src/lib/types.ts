export interface EvaluationResponse {
    id: string;
    schoolName: string;
    coverage: string | null;
    area: string;
    staff: string;
    totalScore: number;
    submittedAt: string;
    scores: ScoresData;
    evidence?: EvidenceData | null;
}

export interface ScoresData {
    sti1: number;
    sti2: number;
    sti3: number;
    sti4: number;
    wmr1: number;
    wmr2: number;
    wmr3: number;
    wmr4: number;
    wmr5: number;
    ecc1: number;
    ecc2: number;
    ecc3: number;
    ecc4: number;
    ecc5: number;
    hwq1: number;
    hwq2: number;
    hwq3: number;
    gpm1: number;
    gpm2: number;
    gpm3: number;
    ilp1: number;
    ilp2: number;
    ere1: number;
    ere2: number;
    ere3: number;
    ere4: number;
    ere5: number;
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