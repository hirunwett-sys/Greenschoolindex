'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    FileText, Upload, CheckCircle, Clock, AlertCircle,
    ExternalLink, Download, RefreshCw, Building, Calendar,
    Award, X, Loader2, History, PenTool,
} from 'lucide-react';

interface SubmissionEvidence {
    id: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    createdAt: string;
}

interface Submission {
    id: string;
    schoolName: string;
    coverage: string | null;
    area: string;
    staff: string;
    totalScore: number;
    status: string;
    verifiedAt: string | null;
    submittedAt: string;
    evidence: SubmissionEvidence | null;
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'verified') {
        return (
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-body px-2.5 py-1 rounded-full">
                <CheckCircle className="w-3 h-3" />
                ตรวจสอบแล้ว
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-body px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            รอการตรวจสอบ
        </span>
    );
}

function EvidenceUpload({ submissionId, onSuccess }: { submissionId: string; onSuccess: () => void }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFile = (file: File) => {
        const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg',
            'application/zip', 'application/x-zip-compressed'];
        if (!allowed.includes(file.type)) { setError('รองรับเฉพาะ PDF, JPG, PNG, ZIP'); return; }
        if (file.size > 50 * 1024 * 1024) { setError('ขนาดไฟล์ต้องไม่เกิน 50MB'); return; }
        setError('');
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setIsUploading(true);
        setError('');
        try {
            const fileData = await fileToBase64(selectedFile);
            const res = await fetch(`/api/my-submissions/${submissionId}/evidence`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName: selectedFile.name, fileData, fileSize: selectedFile.size }),
            });
            if (!res.ok) { const d = await res.json(); setError(d.error); return; }
            onSuccess();
        } catch {
            setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="mt-3 space-y-3">
            {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2 text-xs font-body">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {error}
                </div>
            )}
            {!selectedFile ? (
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}`}
                >
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="font-body text-xs text-gray-500">คลิกหรือลากไฟล์มาวาง</p>
                    <p className="font-body text-xs text-gray-400 mt-0.5">PDF, JPG, PNG, ZIP (สูงสุด 50MB)</p>
                    <input ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.zip" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                </div>
            ) : (
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-gray-800 truncate">{selectedFile.name}</p>
                        <p className="font-body text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                    </div>
                    <button onClick={() => setSelectedFile(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
            {selectedFile && (
                <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white font-body text-sm py-2.5 rounded-lg hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isUploading ? <><Loader2 className="w-4 h-4 animate-spin" />กำลังอัปโหลด...</> : <><Upload className="w-4 h-4" />ส่งหลักฐาน</>}
                </button>
            )}
        </div>
    );
}

export default function MySubmissionsPage() {
    const router = useRouter();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openEvidence, setOpenEvidence] = useState<string | null>(null);
    const [newSubmissionId, setNewSubmissionId] = useState<string | null>(null);

    const fetchSubmissions = async () => {
        const res = await fetch('/api/my-submissions');
        if (res.status === 401) { router.push('/login?redirect=/my-submissions'); return; }
        if (res.ok) setSubmissions(await res.json());
        setIsLoading(false);
    };

    useEffect(() => {
        const id = sessionStorage.getItem('newEvaluationId');
        if (id) { setNewSubmissionId(id); sessionStorage.removeItem('newEvaluationId'); }
        fetchSubmissions();
    }, []);

    const handleEvidenceSuccess = (id: string) => {
        setOpenEvidence(null);
        fetchSubmissions();
        // keep the "just submitted" highlight if it applies
        if (newSubmissionId === id) setNewSubmissionId(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <History className="w-8 h-8 text-primary" />
                            ประวัติการส่ง
                        </h1>
                        <p className="font-body text-gray-500 mt-1">ดูและจัดการการส่งผลการประเมินของคุณ</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={fetchSubmissions} className="p-2 text-gray-500 hover:text-primary transition-colors rounded-lg hover:bg-gray-100">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                        <Link href="/evaluate" className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-body text-sm px-4 py-2.5 rounded-lg hover:shadow-md transition-all">
                            <PenTool className="w-4 h-4" />
                            ส่งใหม่
                        </Link>
                    </div>
                </div>

                {/* Success banner for just-submitted evaluation */}
                {newSubmissionId && submissions.find(s => s.id === newSubmissionId) && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-body font-semibold text-green-800">ส่งผลการประเมินสำเร็จ!</p>
                            <p className="font-body text-sm text-green-700 mt-0.5">
                                หากต้องการแนบหลักฐานเพิ่มเติม สามารถทำได้ด้านล่างนี้
                            </p>
                        </div>
                    </div>
                )}

                {submissions.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="font-display text-xl font-semibold text-gray-700 mb-2">ยังไม่มีการส่ง</h2>
                        <p className="font-body text-gray-500 mb-6">เริ่มทำการประเมินและส่งผลของโรงเรียนคุณได้เลย</p>
                        <Link href="/evaluate" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-body px-6 py-3 rounded-xl hover:shadow-lg transition-all">
                            <PenTool className="w-4 h-4" />
                            เริ่มทำการประเมิน
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {submissions.map((s) => (
                            <div
                                key={s.id}
                                className={`bg-white rounded-2xl shadow-sm border transition-all ${newSubmissionId === s.id ? 'border-green-300 shadow-green-100' : 'border-gray-100'}`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start gap-3">
                                                <Building className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h2 className="font-display text-lg font-bold text-gray-900">{s.schoolName}</h2>
                                                    {s.coverage && <p className="font-body text-sm text-gray-500 mt-0.5">{s.coverage}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <StatusBadge status={s.status} />
                                    </div>

                                    {/* Stats row */}
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        <div className="flex items-center gap-1.5 text-sm font-body text-gray-600">
                                            <Award className="w-4 h-4 text-primary" />
                                            <span>คะแนน: <strong>{s.totalScore.toFixed(2)}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm font-body text-gray-600">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span>ส่งเมื่อ: {formatDate(s.submittedAt)}</span>
                                        </div>
                                        {s.verifiedAt && (
                                            <div className="flex items-center gap-1.5 text-sm font-body text-green-600">
                                                <CheckCircle className="w-4 h-4" />
                                                <span>ตรวจสอบ: {formatDate(s.verifiedAt)}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Evidence section */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="font-body text-sm font-semibold text-gray-700 mb-2">หลักฐาน</p>
                                        {s.evidence ? (
                                            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
                                                <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-body text-sm text-gray-800 truncate">{s.evidence.fileName}</p>
                                                    <p className="font-body text-xs text-gray-500">{formatFileSize(s.evidence.fileSize)} • อัปโหลดเมื่อ {formatDate(s.evidence.createdAt)}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <a
                                                        href={s.evidence.id ? `/api/evaluations/${s.id}` : '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 bg-white border border-green-300 text-green-700 hover:bg-green-50 text-xs font-body px-2.5 py-1.5 rounded-lg transition-colors"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                        ดูหลักฐาน
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 mb-2">
                                                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                                    <p className="font-body text-sm text-amber-700">ยังไม่มีหลักฐาน — แนบหลักฐานเพื่อให้แอดมินตรวจสอบ</p>
                                                </div>
                                                {openEvidence === s.id ? (
                                                    <div>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <p className="font-body text-sm font-semibold text-gray-700">แนบหลักฐาน</p>
                                                            <button onClick={() => setOpenEvidence(null)} className="text-gray-400 hover:text-gray-600">
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <EvidenceUpload submissionId={s.id} onSuccess={() => { setOpenEvidence(null); fetchSubmissions(); }} />
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setOpenEvidence(s.id)}
                                                        className="inline-flex items-center gap-1.5 bg-white border-2 border-dashed border-primary/40 text-primary hover:border-primary hover:bg-primary/5 text-sm font-body px-3 py-2 rounded-lg transition-all"
                                                    >
                                                        <Upload className="w-4 h-4" />
                                                        แนบหลักฐาน
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
