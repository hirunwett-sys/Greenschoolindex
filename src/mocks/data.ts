import { EvaluationCriteria, School, EvaluationResult } from '@/types';

export const mockCriteria: EvaluationCriteria[] = [
    {
        id: 'energy',
        name: 'Energy Efficiency',
        description: 'การใช้พลังงานอย่างมีประสิทธิภาพ รวมถึงการใช้พลังงานทดแทน',
        weight: 0.20,
    },
    {
        id: 'waste',
        name: 'Waste Management',
        description: 'การจัดการขยะและการรีไซเคิล ลดของเสียจากแหล่งกำเนิด',
        weight: 0.18,
    },
    {
        id: 'water',
        name: 'Water Conservation',
        description: 'การอนุรักษ์น้ำและการใช้น้ำอย่างยั่งยืน',
        weight: 0.15,
    },
    {
        id: 'curriculum',
        name: 'Green Curriculum',
        description: 'หลักสูตรและกิจกรรมการเรียนรู้ด้านสิ่งแวดล้อม',
        weight: 0.17,
    },
    {
        id: 'building',
        name: 'Green Building',
        description: 'อาคารและสิ่งก่อสร้างที่เป็นมิตรต่อสิ่งแวดล้อม',
        weight: 0.15,
    },
    {
        id: 'community',
        name: 'Community Engagement',
        description: 'การมีส่วนร่วมของชุมชนและการสร้างเครือข่าย',
        weight: 0.15,
    },
];

export const mockSchools: School[] = [
    {
        id: '1',
        name: 'Green Valley International School',
        country: 'Thailand',
        totalScore: 4.5,
    },
    {
        id: '2',
        name: 'Eco Academy Singapore',
        country: 'Singapore',
        totalScore: 4.3,
    },
    {
        id: '3',
        name: 'Sustainability School Tokyo',
        country: 'Japan',
        totalScore: 4.2,
    },
    {
        id: '4',
        name: 'Earth School Malaysia',
        country: 'Malaysia',
        totalScore: 4.0,
    },
    {
        id: '5',
        name: 'Nature International Vietnam',
        country: 'Vietnam',
        totalScore: 3.8,
    },
];

export const mockEvaluationResult: EvaluationResult[] = [
    {
        criteriaId: 'energy',
        score: 5,
        weightedScore: 1.0,
    },
    {
        criteriaId: 'waste',
        score: 4,
        weightedScore: 0.72,
    },
    {
        criteriaId: 'water',
        score: 5,
        weightedScore: 0.75,
    },
    {
        criteriaId: 'curriculum',
        score: 4,
        weightedScore: 0.68,
    },
    {
        criteriaId: 'building',
        score: 5,
        weightedScore: 0.75,
    },
    {
        criteriaId: 'community',
        score: 5,
        weightedScore: 0.75,
    },
];

export const calculateWeightedScore = (
    score: number,
    weight: number
): number => {
    return score * weight;
};

export const calculateTotalScore = (results: EvaluationResult[]): number => {
    return results.reduce((sum, result) => sum + result.weightedScore, 0);
};