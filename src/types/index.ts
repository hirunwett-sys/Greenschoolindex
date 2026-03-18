export interface EvaluationCriteria {
    id: string;
    name: string;
    description: string;
    weight: number;
}

export interface School {
    id: string;
    name: string;
    country: string;
    totalScore: number;
}

export interface EvaluationResult {
    criteriaId: string;
    score: number;
    weightedScore: number;
}

export interface SchoolEvaluation {
    schoolName: string;
    country: string;
    criteria: EvaluationResult[];
    totalScore: number;
}

export interface FormData {
    schoolName: string;
    country: string;
    scores: Record<string, number>;
}