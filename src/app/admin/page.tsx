'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ToastProvider';
import {
    Sprout,
    CheckCircle,
    Clock,
    FileText,
    ExternalLink,
    Download,
    Search,
    RefreshCw,
    School,
    AlertCircle,
    ShieldCheck,
    Settings,
    Trash2,
    Eye,
    X,
} from 'lucide-react';

interface AdminSchool {
    id: string;
    schoolName: string;
    coverage: string | null;
    area: string;
    staff: string;
    totalScore: number;
    status: string;
    verifiedAt: string | null;
    submittedAt: string;
    hasEvidence: boolean;
    submittedBy: { id: string; name: string; email: string } | null;
    evidence: {
        id: string;
        fileName: string;
        fileData: string;
        fileSize: number;
        mimeType: string;
        createdAt: string;
    } | null;
    scores: {
        id: string;
        sti1: number; sti1Reason: string;
        sti2: number; sti2Reason: string;
        sti3: number; sti3Reason: string;
        sti4: number; sti4Reason: string;
        wmr1: number; wmr1Reason: string;
        wmr2: number; wmr2Reason: string;
        wmr3: number; wmr3Reason: string;
        wmr4: number; wmr4Reason: string;
        wmr5: number; wmr5Reason: string;
        ecc1: number; ecc1Reason: string;
        ecc2: number; ecc2Reason: string;
        ecc3: number; ecc3Reason: string;
        ecc4: number; ecc4Reason: string;
        ecc5: number; ecc5Reason: string;
        hwq1: number; hwq1Reason: string;
        hwq2: number; hwq2Reason: string;
        hwq3: number; hwq3Reason: string;
        gpm1: number; gpm1Reason: string;
        gpm2: number; gpm2Reason: string;
        gpm3: number; gpm3Reason: string;
        ilp1: number; ilp1Reason: string;
        ilp2: number; ilp2Reason: string;
        ere1: number; ere1Reason: string;
        ere2: number; ere2Reason: string;
        ere3: number; ere3Reason: string;
        ere4: number; ere4Reason: string;
        ere5: number; ere5Reason: string;
    } | null;
}

const getEvidenceStatus = (school: AdminSchool) => {
    if (!school.hasEvidence) {
        return { label: 'รอส่งหลักฐาน', color: 'bg-gray-100 text-gray-600', icon: Clock };
    }
    if (school.status === 'verified') {
        return { label: 'ตรวจสอบแล้ว', color: 'bg-green-100 text-green-700', icon: CheckCircle };
    }
    return { label: 'รอผู้ดูแลตรวจสอบหลักฐาน', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle };
};

const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
};

export default function AdminDashboard() {
    const [schools, setSchools] = useState<AdminSchool[]>([]);
    const [filtered, setFiltered] = useState<AdminSchool[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified'>('all');
    const [evidenceFilter, setEvidenceFilter] = useState<'all' | 'has' | 'none'>('all');
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;
    const [verifyingId, setVerifyingId] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [selectedScores, setSelectedScores] = useState<{ school: AdminSchool; scores: AdminSchool['scores'] } | null>(null);
    const { showToast } = useToast();

    const loadSchools = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/schools');
            if (!res.ok) throw new Error();
            const data: AdminSchool[] = await res.json();
            setSchools(data);
            setFiltered(data);
        } catch {
            showToast('เกิดข้อผิดพลาดในการโหลดข้อมูล', 'error');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSchools();
    }, [loadSchools]);

    useEffect(() => {
        const q = search.toLowerCase();
        const result = schools.filter((s) => {
            const matchSearch = s.schoolName.toLowerCase().includes(q);
            const matchStatus =
                statusFilter === 'all' ? true :
                statusFilter === 'pending' ? s.status === 'pending' :
                s.status === 'verified';
            const matchEvidence =
                evidenceFilter === 'all' ? true :
                evidenceFilter === 'has' ? s.hasEvidence :
                !s.hasEvidence;
            return matchSearch && matchStatus && matchEvidence;
        });
        setFiltered(result);
        setPage(1);
    }, [search, statusFilter, evidenceFilter, schools]);

    const handleVerify = async (id: string, schoolName: string) => {
        setVerifyingId(id);
        try {
            const res = await fetch(`/api/admin/schools/${id}/verify`, { method: 'PATCH' });
            if (!res.ok) throw new Error();
            setSchools((prev) =>
                prev.map((s) =>
                    s.id === id ? { ...s, status: 'verified', verifiedAt: new Date().toISOString() } : s
                )
            );
            showToast(`ตรวจสอบ "${schoolName}" เรียบร้อยแล้ว`, 'success');
        } catch {
            showToast('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error');
        } finally {
            setVerifyingId(null);
        }
    };

    const handlePreviewEvidence = (evidence: AdminSchool['evidence']) => {
        if (!evidence) return;
        const blob = base64ToBlob(evidence.fileData, evidence.mimeType);
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 60000);
    };

    const handleDownloadEvidence = (evidence: AdminSchool['evidence']) => {
        if (!evidence) return;
        const blob = base64ToBlob(evidence.fileData, evidence.mimeType);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = evidence.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDelete = async (id: string, schoolName: string) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/schools/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            setSchools((prev) => prev.filter((s) => s.id !== id));
            setDeleteConfirm(null);
            showToast(`ลบผลประเมิน "${schoolName}" เรียบร้อยแล้ว`, 'success');
        } catch {
            showToast('เกิดข้อผิดพลาดในการลบ กรุณาลองใหม่', 'error');
        } finally {
            setDeletingId(null);
        }
    };

    const pendingCount = schools.filter((s) => s.status === 'pending').length;
    const verifiedCount = schools.filter((s) => s.status === 'verified').length;
    const evidenceCount = schools.filter((s) => s.hasEvidence).length;

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page title */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                            <Sprout className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-display text-2xl font-bold text-gray-900 leading-none">Admin Dashboard</h1>
                            <p className="font-body text-xs text-gray-500 mt-0.5">Green School Index</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-2 text-sm font-body text-gray-600 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200"
                    >
                        <Settings className="w-4 h-4" />
                        ตั้งค่า
                    </Link>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'โรงเรียนทั้งหมด', value: schools.length, icon: School, color: 'text-blue-600 bg-blue-50' },
                        { label: 'รอตรวจสอบ', value: pendingCount, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
                        { label: 'ตรวจสอบแล้ว', value: verifiedCount, icon: ShieldCheck, color: 'text-green-600 bg-green-50' },
                        { label: 'ส่งหลักฐานแล้ว', value: evidenceCount, icon: FileText, color: 'text-purple-600 bg-purple-50' },
                    ].map(({ label, value, icon: Icon, color }) => (
                        <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-display text-2xl font-bold text-gray-900">{value}</p>
                                    <p className="font-body text-xs text-gray-500">{label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search, Filters & Refresh */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="relative flex-1 min-w-[160px] max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="ค้นหาโรงเรียน..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg font-body text-sm focus:outline-none focus:border-primary"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                        className="py-2 px-3 border border-gray-200 rounded-lg font-body text-sm focus:outline-none focus:border-primary bg-white text-gray-700"
                    >
                        <option value="all">สถานะ: ทั้งหมด</option>
                        <option value="pending">รอตรวจสอบ</option>
                        <option value="verified">ตรวจสอบแล้ว</option>
                    </select>
                    <select
                        value={evidenceFilter}
                        onChange={(e) => setEvidenceFilter(e.target.value as typeof evidenceFilter)}
                        className="py-2 px-3 border border-gray-200 rounded-lg font-body text-sm focus:outline-none focus:border-primary bg-white text-gray-700"
                    >
                        <option value="all">หลักฐาน: ทั้งหมด</option>
                        <option value="has">มีหลักฐาน</option>
                        <option value="none">ยังไม่มีหลักฐาน</option>
                    </select>
                    <button
                        onClick={loadSchools}
                        className="flex items-center gap-2 text-sm font-body text-gray-600 hover:text-primary px-3 py-2 rounded-lg border border-gray-200 hover:border-primary/40 transition-colors ml-auto"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        รีเฟรช
                    </button>
                </div>

                {/* Schools Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <RefreshCw className="w-6 h-6 text-primary animate-spin" />
                            <span className="ml-3 font-body text-gray-500">กำลังโหลด...</span>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <School className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="font-body text-gray-500">ไม่พบข้อมูลโรงเรียน</p>
                        </div>
                    ) : (
                        <>
                        {/* ─── Mobile / tablet cards (hidden on md+) ─── */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {paginated.map((school) => {
                                const evidenceStatus = getEvidenceStatus(school);
                                const StatusIcon = evidenceStatus.icon;
                                return (
                                    <div key={school.id} className="p-4 space-y-3">
                                        {/* Name + score */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="font-body font-semibold text-gray-900 text-sm leading-snug">{school.schoolName}</p>
                                                <p className="font-body text-xs text-gray-400 mt-0.5">
                                                    {new Date(school.submittedAt).toLocaleDateString('th-TH')}
                                                </p>
                                                {school.submittedBy && (
                                                    <p className="font-body text-xs text-gray-500 mt-0.5">โดย: {school.submittedBy.name}</p>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end flex-shrink-0">
                                                <span className="font-display font-bold text-primary text-xl leading-none">{school.totalScore.toFixed(1)}</span>
                                                <span className="font-body text-xs text-gray-400">/ 145</span>
                                            </div>
                                        </div>
                                        {/* Status badges */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {school.status === 'verified' ? (
                                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-body font-medium">
                                                    <CheckCircle className="w-3 h-3" />ตรวจสอบแล้ว
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-body font-medium">
                                                    <Clock className="w-3 h-3" />รอตรวจสอบ
                                                </span>
                                            )}
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-body font-medium ${evidenceStatus.color}`}>
                                                <StatusIcon className="w-3 h-3" />{evidenceStatus.label}
                                            </span>
                                        </div>
                                        {/* Action buttons */}
                                        <div className="space-y-2">
                                            {/* First row: Evidence buttons */}
                                            {school.evidence && (
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <button
                                                        onClick={() => handlePreviewEvidence(school.evidence)}
                                                        className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-body px-2.5 py-1.5 rounded-lg transition-colors"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />ดูหลักฐาน
                                                    </button>
                                                    <button
                                                        onClick={() => handleDownloadEvidence(school.evidence)}
                                                        className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 text-xs font-body px-2.5 py-1.5 rounded-lg transition-colors"
                                                    >
                                                        <Download className="w-3 h-3" />ดาวน์โหลด
                                                    </button>
                                                </div>
                                            )}
                                            {/* Second row: Scores and verify buttons */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                {school.scores && (
                                                    <button
                                                        onClick={() => setSelectedScores({ school, scores: school.scores })}
                                                        className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 border border-purple-200 text-xs font-body px-2.5 py-1.5 rounded-lg transition-colors"
                                                    >
                                                        <Eye className="w-3 h-3" />ดูคะแนน
                                                    </button>
                                                )}
                                                {school.status !== 'verified' && (
                                                    <button
                                                        onClick={() => handleVerify(school.id, school.schoolName)}
                                                        disabled={verifyingId === school.id}
                                                        className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1 bg-gradient-to-r from-primary to-secondary text-white font-body font-semibold px-3 py-1.5 rounded-lg text-xs hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                                    >
                                                        {verifyingId === school.id ? (
                                                            <><RefreshCw className="w-3 h-3 animate-spin" />กำลังบันทึก...</>
                                                        ) : (
                                                            <><ShieldCheck className="w-3 h-3" />ตรวจสอบแล้ว</>
                                                        )}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => setDeleteConfirm({ id: school.id, name: school.schoolName })}
                                                    className="inline-flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-body px-2.5 py-1.5 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3" />ลบ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* ─── Desktop table (md+) ─── */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="text-left px-4 py-3 font-body font-semibold text-gray-700 text-sm">
                                            โรงเรียน
                                        </th>
                                        <th className="text-left px-4 py-3 font-body font-semibold text-gray-700 text-sm">
                                            ผู้ส่ง
                                        </th>
                                        <th className="text-center px-4 py-3 font-body font-semibold text-gray-700 text-sm">
                                            คะแนนรวม
                                        </th>
                                        <th className="text-center px-4 py-3 font-body font-semibold text-gray-700 text-sm">
                                            สถานะการตรวจสอบ
                                        </th>
                                        <th className="text-center px-4 py-3 font-body font-semibold text-gray-700 text-sm">
                                            สถานะหลักฐาน
                                        </th>
                                        <th className="text-center px-4 py-3 font-body font-semibold text-gray-700 text-sm">
                                            หลักฐาน
                                        </th>
                                        <th className="text-center px-4 py-3 font-body font-semibold text-gray-700 text-sm">
                                            คะแนน
                                        </th>
                                        <th className="text-center px-4 py-3 font-body font-semibold text-gray-700 text-sm">
                                            การดำเนินการ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {paginated.map((school) => {
                                        const evidenceStatus = getEvidenceStatus(school);
                                        const StatusIcon = evidenceStatus.icon;
                                        return (
                                            <tr key={school.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-4 py-4">
                                                    <div>
                                                        <p className="font-body font-semibold text-gray-900 text-sm">
                                                            {school.schoolName}
                                                        </p>
                                                        <p className="font-body text-xs text-gray-400 mt-0.5">
                                                            {new Date(school.submittedAt).toLocaleDateString('th-TH')}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    {school.submittedBy ? (
                                                        <div>
                                                            <p className="font-body text-sm text-gray-800 font-medium">{school.submittedBy.name}</p>
                                                            <p className="font-body text-xs text-gray-400 mt-0.5">{school.submittedBy.email}</p>
                                                        </div>
                                                    ) : (
                                                        <span className="font-body text-xs text-gray-400">ไม่ระบุ</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className="font-display font-bold text-primary text-lg">
                                                        {school.totalScore.toFixed(1)}
                                                    </span>
                                                    <span className="font-body text-xs text-gray-400"> / 145</span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    {school.status === 'verified' ? (
                                                        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-body font-medium">
                                                            <CheckCircle className="w-3.5 h-3.5" />
                                                            ตรวจสอบแล้ว
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-body font-medium">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            รอตรวจสอบ
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium ${evidenceStatus.color}`}
                                                    >
                                                        <StatusIcon className="w-3.5 h-3.5" />
                                                        {evidenceStatus.label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    {school.evidence ? (
                                                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                                                            <button
                                                                onClick={() => handlePreviewEvidence(school.evidence)}
                                                                className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border border-blue-200 text-xs font-body px-2.5 py-1.5 rounded-lg transition-colors"
                                                            >
                                                                <ExternalLink className="w-3 h-3" />
                                                                ดูหลักฐาน
                                                            </button>
                                                            <button
                                                                onClick={() => handleDownloadEvidence(school.evidence)}
                                                                className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-800 border border-gray-200 text-xs font-body px-2.5 py-1.5 rounded-lg transition-colors"
                                                            >
                                                                <Download className="w-3 h-3" />
                                                                ดาวน์โหลด
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="font-body text-xs text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    {school.scores ? (
                                                        <button
                                                            onClick={() => setSelectedScores({ school, scores: school.scores })}
                                                            className="inline-flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 border border-purple-200 text-xs font-body px-2.5 py-1.5 rounded-lg transition-colors"
                                                        >
                                                            <Eye className="w-3 h-3" />
                                                            ดูคะแนน
                                                        </button>
                                                    ) : (
                                                        <span className="font-body text-xs text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {school.status === 'verified' ? (
                                                            <div className="text-xs font-body text-gray-400">
                                                                {school.verifiedAt
                                                                    ? new Date(school.verifiedAt).toLocaleDateString('th-TH')
                                                                    : '-'}
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleVerify(school.id, school.schoolName)}
                                                                disabled={verifyingId === school.id}
                                                                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-secondary text-white font-body font-semibold px-4 py-2 rounded-lg text-sm hover:shadow-md hover:scale-[1.03] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                                                            >
                                                                {verifyingId === school.id ? (
                                                                    <>
                                                                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                                                        กำลังบันทึก...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <ShieldCheck className="w-3.5 h-3.5" />
                                                                        ตรวจสอบแล้ว
                                                                    </>
                                                                )}
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => setDeleteConfirm({ id: school.id, name: school.schoolName })}
                                                            className="inline-flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 rounded-lg transition-colors"
                                                            title="ลบผลประเมิน"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
                                <p className="font-body text-xs text-gray-500">
                                    แสดง {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} จาก {filtered.length} รายการ
                                </p>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="px-3 py-1.5 rounded-lg border border-gray-200 font-body text-xs text-gray-600 hover:border-primary/40 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        ก่อนหน้า
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                        .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                                            if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('...');
                                            acc.push(p);
                                            return acc;
                                        }, [])
                                        .map((p, i) =>
                                            p === '...'
                                                ? <span key={`ellipsis-${i}`} className="px-2 py-1.5 font-body text-xs text-gray-400">…</span>
                                                : <button
                                                    key={p}
                                                    onClick={() => setPage(p as number)}
                                                    className={`px-3 py-1.5 rounded-lg border font-body text-xs transition-colors ${
                                                        page === p
                                                            ? 'bg-primary text-white border-primary'
                                                            : 'border-gray-200 text-gray-600 hover:border-primary/40 hover:text-primary'
                                                    }`}
                                                >
                                                    {p}
                                                </button>
                                        )}
                                    <button
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="px-3 py-1.5 rounded-lg border border-gray-200 font-body text-xs text-gray-600 hover:border-primary/40 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        ถัดไป
                                    </button>
                                </div>
                            </div>
                        )}
                        </>
                    )}
                </div>
            </main>

            {/* ─── Delete confirmation modal ─── */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-gray-900 text-base">ยืนยันการลบ</h3>
                                <p className="font-body text-xs text-gray-500">การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
                            </div>
                        </div>
                        <p className="font-body text-sm text-gray-600 mb-6">
                            ต้องการลบผลประเมินของ{' '}
                            <span className="font-semibold text-gray-900">&ldquo;{deleteConfirm.name}&rdquo;</span>{' '}
                            ใช่หรือไม่? คะแนน หลักฐาน และข้อมูลทั้งหมดจะถูกลบออก
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                disabled={!!deletingId}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 font-body text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm.id, deleteConfirm.name)}
                                disabled={!!deletingId}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-body font-semibold text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {deletingId ? (
                                    <><RefreshCw className="w-4 h-4 animate-spin" />กำลังลบ...</>
                                ) : (
                                    <><Trash2 className="w-4 h-4" />ลบผลประเมิน</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Scores Modal ─── */}
            {selectedScores && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 my-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-display font-bold text-gray-900 text-lg">คะแนน: {selectedScores.school.schoolName}</h3>
                                <p className="font-body text-xs text-gray-500 mt-0.5">คะแนนรวม: <span className="font-bold text-primary">{selectedScores.school.totalScore.toFixed(1)} / 145</span></p>
                            </div>
                            <button
                                onClick={() => setSelectedScores(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-6 max-h-96 overflow-y-auto">
                            {selectedScores.scores && (
                                <>
                            {/* Site, Transportation & Infrastructure (STI) */}
                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    STI - Site, Transportation & Infrastructure
                                </h4>
                                <div className="space-y-2">
                                    {[1, 2, 3, 4].map((i) => {
                                        const scoreKey = `sti${i}` as const;
                                        const reasonKey = `sti${i}Reason` as const;
                                        const scores = selectedScores.scores!;
                                        return (
                                            <div key={`sti${i}`} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-body text-sm font-medium text-gray-700">ข้อที่ {i}</span>
                                                    <span className="font-display font-bold text-blue-600">{scores[scoreKey as keyof typeof scores] as number} คะแนน</span>
                                                </div>
                                                <p className="font-body text-xs text-gray-600">{(scores[reasonKey as keyof typeof scores] as string) || '-'}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Water & Material Resources (WMR) */}
                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                                    WMR - Water & Material Resources
                                </h4>
                                <div className="space-y-2">
                                    {[1, 2, 3, 4, 5].map((i) => {
                                        const scoreKey = `wmr${i}` as const;
                                        const reasonKey = `wmr${i}Reason` as const;
                                        const scores = selectedScores.scores!;
                                        return (
                                            <div key={`wmr${i}`} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-body text-sm font-medium text-gray-700">ข้อที่ {i}</span>
                                                    <span className="font-display font-bold text-cyan-600">{scores[scoreKey as keyof typeof scores] as number} คะแนน</span>
                                                </div>
                                                <p className="font-body text-xs text-gray-600">{(scores[reasonKey as keyof typeof scores] as string) || '-'}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Energy, Carbon & Climate (ECC) */}
                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                    ECC - Energy, Carbon & Climate
                                </h4>
                                <div className="space-y-2">
                                    {[1, 2, 3, 4, 5].map((i) => {
                                        const scoreKey = `ecc${i}` as const;
                                        const reasonKey = `ecc${i}Reason` as const;
                                        const scores = selectedScores.scores!;
                                        return (
                                            <div key={`ecc${i}`} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-body text-sm font-medium text-gray-700">ข้อที่ {i}</span>
                                                    <span className="font-display font-bold text-yellow-600">{scores[scoreKey as keyof typeof scores] as number} คะแนน</span>
                                                </div>
                                                <p className="font-body text-xs text-gray-600">{(scores[reasonKey as keyof typeof scores] as string) || '-'}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Health, Wellbeing & Quality of Life (HWQ) */}
                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    HWQ - Health, Wellbeing & Quality of Life
                                </h4>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((i) => {
                                        const scoreKey = `hwq${i}` as const;
                                        const reasonKey = `hwq${i}Reason` as const;
                                        const scores = selectedScores.scores!;
                                        return (
                                            <div key={`hwq${i}`} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-body text-sm font-medium text-gray-700">ข้อที่ {i}</span>
                                                    <span className="font-display font-bold text-green-600">{scores[scoreKey as keyof typeof scores] as number} คะแนน</span>
                                                </div>
                                                <p className="font-body text-xs text-gray-600">{(scores[reasonKey as keyof typeof scores] as string) || '-'}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Green Campus Management (GPM) */}
                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                    GPM - Green Campus Management
                                </h4>
                                <div className="space-y-2">
                                    {[1, 2, 3].map((i) => {
                                        const scoreKey = `gpm${i}` as const;
                                        const reasonKey = `gpm${i}Reason` as const;
                                        const scores = selectedScores.scores!;
                                        return (
                                            <div key={`gpm${i}`} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-body text-sm font-medium text-gray-700">ข้อที่ {i}</span>
                                                    <span className="font-display font-bold text-emerald-600">{scores[scoreKey as keyof typeof scores] as number} คะแนน</span>
                                                </div>
                                                <p className="font-body text-xs text-gray-600">{(scores[reasonKey as keyof typeof scores] as string) || '-'}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Integrated Learning Pathways (ILP) */}
                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                                    ILP - Integrated Learning Pathways
                                </h4>
                                <div className="space-y-2">
                                    {[1, 2].map((i) => {
                                        const scoreKey = `ilp${i}` as const;
                                        const reasonKey = `ilp${i}Reason` as const;
                                        const scores = selectedScores.scores!;
                                        return (
                                            <div key={`ilp${i}`} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-body text-sm font-medium text-gray-700">ข้อที่ {i}</span>
                                                    <span className="font-display font-bold text-violet-600">{scores[scoreKey as keyof typeof scores] as number} คะแนน</span>
                                                </div>
                                                <p className="font-body text-xs text-gray-600">{(scores[reasonKey as keyof typeof scores] as string) || '-'}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Environmental Risk & Emergency (ERE) */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    ERE - Environmental Risk & Emergency
                                </h4>
                                <div className="space-y-2">
                                    {[1, 2, 3, 4, 5].map((i) => {
                                        const scoreKey = `ere${i}` as const;
                                        const reasonKey = `ere${i}Reason` as const;
                                        const scores = selectedScores.scores!;
                                        return (
                                            <div key={`ere${i}`} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-body text-sm font-medium text-gray-700">ข้อที่ {i}</span>
                                                    <span className="font-display font-bold text-orange-600">{scores[scoreKey as keyof typeof scores] as number} คะแนน</span>
                                                </div>
                                                <p className="font-body text-xs text-gray-600">{(scores[reasonKey as keyof typeof scores] as string) || '-'}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                                </>
                            )}
                        </div>

                        <div className="flex gap-3 mt-6 pt-6 border-t">
                            <button
                                onClick={() => setSelectedScores(null)}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 font-body text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                ปิด
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
