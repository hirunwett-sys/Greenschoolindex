'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import { 
  TreePine, 
  Droplet, 
  Zap, 
  Heart,
  Settings,
  Lightbulb,
  BookOpen,
  Award,
  Download,
  Plus,
  TrendingUp,
  Calendar,
  Users,
  Building,
  Medal,
  Crown,
  BarChart3,
  Target,
  Trash2,
  X,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  TrendingDown,
  Activity,
  CardSim,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const gsiCriteria = [
  {
    id: 'sti',
    name: 'Site, Transportation & Infrastructure',
    nameLocal: 'พื้นที่ การเดินทาง และโครงสร้างพื้นฐาน',
    icon: TreePine,
    color: 'from-green-500 to-emerald-600',
    maxScore: 28,
    subCriteria: [
      { id: 'sti1', name: 'การจัดการที่ดินและพื้นที่สีเขียว', maxScore: 7 },
      { id: 'sti2', name: 'การเดินทางที่ยั่งยืน', maxScore: 7 },
      { id: 'sti3', name: 'โครงสร้างพื้นฐานคาร์บอนต่ำ/EV', maxScore: 7 },
      { id: 'sti4', name: 'การเข้าถึงพื้นที่สำหรับทุกคน', maxScore: 7 }
    ]
  },
  {
    id: 'wmr',
    name: 'Water & Material Resources',
    nameLocal: 'น้ำและทรัพยากรวัสดุ',
    icon: Droplet,
    color: 'from-blue-500 to-cyan-600',
    maxScore: 34,
    subCriteria: [
      { id: 'wmr1', name: 'วัดและลดการใช้น้ำ', maxScore: 7 },
      { id: 'wmr2', name: 'น้ำทางเลือก/น้ำใช้ซ้ำ', maxScore: 7 },
      { id: 'wmr3', name: 'ลดของเสีย/รีไซเคิล', maxScore: 7 },
      { id: 'wmr4', name: 'จัดซื้อวัสดุอย่างยั่งยืน', maxScore: 7 },
      { id: 'wmr5', name: 'เศรษฐกิจหมุนเวียน', maxScore: 6 }
    ]
  },
  {
    id: 'ecc',
    name: 'Energy, Carbon & Climate',
    nameLocal: 'พลังงาน คาร์บอน และสภาพภูมิอากาศ',
    icon: Zap,
    color: 'from-yellow-500 to-orange-600',
    maxScore: 30,
    subCriteria: [
      { id: 'ecc1', name: 'ข้อมูลและติดตามพลังงาน', maxScore: 6 },
      { id: 'ecc2', name: 'ประสิทธิภาพพลังงาน', maxScore: 6 },
      { id: 'ecc3', name: 'พลังงานหมุนเวียน', maxScore: 6 },
      { id: 'ecc4', name: 'คำนวณและรายงาน GHG', maxScore: 6 },
      { id: 'ecc5', name: 'เป้าหมาย/แผนลดคาร์บอน', maxScore: 6 }
    ]
  },
  {
    id: 'hwq',
    name: 'Health, Wellbeing & Quality of Life',
    nameLocal: 'สุขภาพ ความเป็นอยู่ที่ดี และคุณภาพชีวิต',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    maxScore: 12,
    subCriteria: [
      { id: 'hwq1', name: 'คุณภาพอากาศ แสง ความสบาย', maxScore: 4 },
      { id: 'hwq2', name: 'สุขภาพและความปลอดภัย', maxScore: 4 },
      { id: 'hwq3', name: 'Universal Design', maxScore: 4 }
    ]
  },
  {
    id: 'gpm',
    name: 'Governance, Planning & Management',
    nameLocal: 'การกำกับดูแล การวางแผน และการจัดการ',
    icon: Settings,
    color: 'from-purple-500 to-violet-600',
    maxScore: 6,
    subCriteria: [
      { id: 'gpm1', name: 'โครงสร้างบริหารความยั่งยืน', maxScore: 2 },
      { id: 'gpm2', name: 'แผน เป้าหมาย ตัวชี้วัด', maxScore: 2 },
      { id: 'gpm3', name: 'รายงานและปรับปรุงต่อเนื่อง', maxScore: 2 }
    ]
  },
  {
    id: 'ilp',
    name: 'Innovation & Local Priorities',
    nameLocal: 'นวัตกรรมและความสำคัญในพื้นที่',
    icon: Lightbulb,
    color: 'from-amber-500 to-yellow-600',
    maxScore: 10,
    subCriteria: [
      { id: 'ilp1', name: 'นวัตกรรมเกินเกณฑ์', maxScore: 5 },
      { id: 'ilp2', name: 'ตอบโจทย์บริบทพื้นที่', maxScore: 5 }
    ]
  },
  {
    id: 'ere',
    name: 'Education, Research & Engagement',
    nameLocal: 'การศึกษา งานวิจัย และการมีส่วนร่วม',
    icon: BookOpen,
    color: 'from-indigo-500 to-blue-600',
    maxScore: 25,
    subCriteria: [
      { id: 'ere1', name: 'นโยบายโรงเรียนสีเขียว', maxScore: 5 },
      { id: 'ere2', name: 'แผนงานและงบประมาณ', maxScore: 5 },
      { id: 'ere3', name: 'ระบบติดตามและรายงานผล', maxScore: 5 },
      { id: 'ere4', name: 'พัฒนาและปรับปรุงต่อเนื่อง', maxScore: 5 },
      { id: 'ere5', name: 'ถ่ายทอดสู่ชุมชน/สังคม', maxScore: 5 }
    ]
  }
];

const getRating = (score: number) => {
  if (score >= 116) return { level: 'PLATINUM', color: 'from-slate-400 to-slate-600', bgColor: 'bg-slate-100', textColor: 'text-slate-700' };
  if (score >= 102) return { level: 'GOLD', color: 'from-yellow-400 to-amber-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' };
  if (score >= 87) return { level: 'SILVER', color: 'from-gray-300 to-gray-400', bgColor: 'bg-gray-100', textColor: 'text-gray-700' };
  if (score >= 58) return { level: 'BRONZE', color: 'from-orange-400 to-orange-600', bgColor: 'bg-orange-50', textColor: 'text-orange-700' };
  return { level: 'ไม่ผ่าน', color: 'from-red-400 to-red-600', bgColor: 'bg-red-50', textColor: 'text-red-700' };
};

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
  return <span className="text-sm font-semibold text-gray-600">#{rank}</span>;
};

interface EvaluationData {
  id: string;
  schoolName: string;
  coverage: string | null;
  area: string;
  staff: string;
  scores: Record<string, number>;
  totalScore: number;
  submittedAt: string;
}

interface RadarData {
  dimension: string;
  score: number;
  fullMark: number;
}

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
}

interface Toast {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-primary/20">
        <p className="font-display font-semibold text-gray-900 mb-1">
          {payload[0].payload.dimension}
        </p>
        <p className="font-body text-primary text-lg font-bold">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

interface DeleteModalProps {
  isOpen: boolean;
  schoolName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

const DeleteModal = ({ isOpen, schoolName, onConfirm, onCancel, isDeleting }: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-bold text-gray-900">ยืนยันการลบ</h3>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="font-body text-gray-600 mb-6">
          คุณต้องการลบการประเมินของ <span className="font-semibold text-gray-900">{schoolName}</span> ใช่หรือไม่?
          <br />
          <span className="text-red-500 text-sm">การกระทำนี้ไม่สามารถย้อนกลับได้</span>
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg font-display font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-display font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                กำลังลบ...
              </>
            ) : (
              'ลบ'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
interface ToastComponentProps {
  toast: Toast;
  onClose: (id: number) => void;
}

const ToastComponent = ({ toast, onClose }: ToastComponentProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <AlertCircle className="w-5 h-5 text-blue-500" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div className={`${bgColors[toast.type]} border-2 rounded-xl p-4 shadow-lg animate-slide-in-right flex items-start gap-3 min-w-[320px] max-w-md`}>
      <div className="flex-shrink-0 mt-0.5">
        {icons[toast.type]}
      </div>
      <div className="flex-1">
        <p className="font-body text-sm text-gray-900">{toast.message}</p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: number) => void;
}

const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

const ITEMS_PER_PAGE = 10;

export default function SummaryPage(): JSX.Element | null {
  const router = useRouter();
  const [evaluations, setEvaluations] = useState<EvaluationData[]>([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState<EvaluationData[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<EvaluationData | null>(null);
  const [newSubmissionId, setNewSubmissionId] = useState<string | null>(null);
  const [radarData, setRadarData] = useState<RadarData[]>([]);
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [schoolToDelete, setSchoolToDelete] = useState<EvaluationData | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterRating, setFilterRating] = useState<string>('all');

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const newToast: Toast = {
      id: Date.now(),
      type,
      message
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    const newId = sessionStorage.getItem('newEvaluationId');
    if (newId) {
      setNewSubmissionId(newId);
      sessionStorage.removeItem('newEvaluationId');
    }
    loadEvaluations();
  }, []);

  useEffect(() => {
    let filtered = [...evaluations];

    if (searchQuery.trim()) {
      filtered = filtered.filter(e => 
        e.schoolName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterRating !== 'all') {
      filtered = filtered.filter(e => {
        const rating = getRating(e.totalScore).level;
        return rating === filterRating;
      });
    }

    filtered.sort((a, b) => {
      return sortOrder === 'desc' 
        ? b.totalScore - a.totalScore 
        : a.totalScore - b.totalScore;
    });

    setFilteredEvaluations(filtered);
    setCurrentPage(1);
  }, [evaluations, searchQuery, filterRating, sortOrder]);

  const loadEvaluations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/evaluations');
      if (!response.ok) {
        throw new Error('Failed to fetch evaluations');
      }
      
      const data: EvaluationData[] = await response.json();
      setEvaluations(data);

      if (data.length > 0) {
        if (newSubmissionId) {
          const newSchool = data.find(e => e.id === newSubmissionId);
          if (newSchool) {
            selectSchool(newSchool);
            return;
          }
        }
        selectSchool(data[0]);
      }
    } catch (error) {
      console.error('Error loading evaluations:', error);
      addToast('error', 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  const selectSchool = (school: EvaluationData) => {
    setSelectedSchool(school);
    
    const scores = school.scores;
    
    const stiScore = (scores.sti1 || 0) + (scores.sti2 || 0) + (scores.sti3 || 0) + (scores.sti4 || 0);
    const stiPercent = (stiScore / 28) * 100;
    
    const wmrScore = (scores.wmr1 || 0) + (scores.wmr2 || 0) + (scores.wmr3 || 0) + (scores.wmr4 || 0) + (scores.wmr5 || 0);
    const wmrPercent = (wmrScore / 34) * 100;
    
    const eccScore = (scores.ecc1 || 0) + (scores.ecc2 || 0) + (scores.ecc3 || 0) + (scores.ecc4 || 0) + (scores.ecc5 || 0);
    const eccPercent = (eccScore / 30) * 100;
    
    const hwqScore = (scores.hwq1 || 0) + (scores.hwq2 || 0) + (scores.hwq3 || 0);
    const hwqPercent = (hwqScore / 12) * 100;
    
    const ereScore = (scores.ere1 || 0) + (scores.ere2 || 0) + (scores.ere3 || 0) + (scores.ere4 || 0) + (scores.ere5 || 0);
    const erePercent = (ereScore / 25) * 100;
    
    const gpmScore = (scores.gpm1 || 0) + (scores.gpm2 || 0) + (scores.gpm3 || 0);
    const gpmPercent = (gpmScore / 6) * 100;
    
    const ilpScore = (scores.ilp1 || 0) + (scores.ilp2 || 0);
    const ilpPercent = (ilpScore / 10) * 100;
    
    setCategoryScores([
      { name: 'พื้นที่และการเดินทาง', score: stiScore, maxScore: 28, percentage: stiPercent },
      { name: 'น้ำและทรัพยากร', score: wmrScore, maxScore: 34, percentage: wmrPercent },
      { name: 'พลังงานและคาร์บอน', score: eccScore, maxScore: 30, percentage: eccPercent },
      { name: 'สุขภาพและความเป็นอยู่', score: hwqScore, maxScore: 12, percentage: hwqPercent },
      { name: 'การศึกษาและมีส่วนร่วม', score: ereScore, maxScore: 25, percentage: erePercent },
      { name: 'การบริหารจัดการ', score: gpmScore, maxScore: 6, percentage: gpmPercent },
      { name: 'นวัตกรรม', score: ilpScore, maxScore: 10, percentage: ilpPercent }
    ]);
    
    const environmentScore = (stiPercent + wmrPercent + eccPercent) / 3;
    const socialScore = (hwqPercent + erePercent) / 2;
    const managementScore = (gpmPercent + ilpPercent) / 2;
    
    const ecc2Percent = ((scores.ecc2 || 0) / 6) * 100;
    const ecc3Percent = ((scores.ecc3 || 0) / 6) * 100;
    const wmr2Percent = ((scores.wmr2 || 0) / 7) * 100;
    const wmr5Percent = ((scores.wmr5 || 0) / 6) * 100;
    const ilp1Percent = ((scores.ilp1 || 0) / 5) * 100;
    const economyScore = (ecc2Percent + ecc3Percent + wmr2Percent + wmr5Percent + ilp1Percent) / 5;
    
    setRadarData([
      { dimension: 'สิ่งแวดล้อม', score: Math.round(environmentScore), fullMark: 100 },
      { dimension: 'สังคม', score: Math.round(socialScore), fullMark: 100 },
      { dimension: 'บริหารจัดการ', score: Math.round(managementScore), fullMark: 100 },
      { dimension: 'เศรษฐกิจ', score: Math.round(economyScore), fullMark: 100 }
    ]);

    const allCategories = [
      { name: 'พื้นที่และการเดินทาง', percent: stiPercent },
      { name: 'น้ำและทรัพยากร', percent: wmrPercent },
      { name: 'พลังงานและคาร์บอน', percent: eccPercent },
      { name: 'สุขภาพและความเป็นอยู่', percent: hwqPercent },
      { name: 'การศึกษาและมีส่วนร่วม', percent: erePercent },
      { name: 'การบริหารจัดการ', percent: gpmPercent },
      { name: 'นวัตกรรม', percent: ilpPercent }
    ];

    allCategories.sort((a, b) => b.percent - a.percent);
    setStrengths(allCategories.slice(0, 3).map(c => c.name));
    setImprovements(allCategories.slice(-3).reverse().map(c => c.name));
  };

  const handleDeleteClick = (school: EvaluationData) => {
    setSchoolToDelete(school);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!schoolToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/evaluations/${schoolToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete evaluation');
      }

      addToast('success', `ลบการประเมินของ "${schoolToDelete.schoolName}" เรียบร้อยแล้ว`);
      
      await loadEvaluations();
      
      setDeleteModalOpen(false);
      setSchoolToDelete(null);
    } catch (error) {
      console.error('Error deleting evaluation:', error);
      addToast('error', 'เกิดข้อผิดพลาดในการลบข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSchoolToDelete(null);
  };

  const handleDownload = () => {
    if (!selectedSchool) return;
    
    const content = `
รายงานผลการประเมิน Green School Index (GSI)
=============================================

ข้อมูลโรงเรียน:
- ชื่อโรงเรียน: ${selectedSchool.schoolName}
- ขอบเขตการประเมิน: ${selectedSchool.coverage || '-'}
- พื้นที่ใช้สอย: ${selectedSchool.area} ตร.ม.
- จำนวนบุคลากร: ${selectedSchool.staff} คน
- วันที่ประเมิน: ${new Date(selectedSchool.submittedAt).toLocaleDateString('th-TH')}

คะแนนรวม: ${selectedSchool.totalScore} / 146 คะแนน
ระดับ: ${getRating(selectedSchool.totalScore).level}

คะแนนตาม 4 มิติ:
${radarData.map(d => `- ${d.dimension}: ${d.score}%`).join('\n')}

จุดแข็ง:
${strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

ต้องพัฒนา:
${improvements.map((s, i) => `${i + 1}. ${s}`).join('\n')}

รายละเอียดคะแนนแต่ละหมวด:
${gsiCriteria.map(criterion => {
  const categoryScore = criterion.subCriteria.reduce((sum, sub) => 
    sum + (selectedSchool.scores[sub.id] || 0), 0
  );
  return `
${criterion.nameLocal} (${categoryScore}/${criterion.maxScore})
${criterion.subCriteria.map(sub => 
  `  - ${sub.name}: ${selectedSchool.scores[sub.id] || 0}/${sub.maxScore}`
).join('\n')}`;
}).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GSI-Report-${selectedSchool.schoolName}-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast('success', 'ดาวน์โหลดรายงานสำเร็จ');
  };

  const totalPages = Math.ceil(filteredEvaluations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvaluations = filteredEvaluations.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="font-body text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (evaluations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
            ยังไม่มีข้อมูลการประเมิน
          </h3>
          <p className="font-body text-gray-600 mb-6">
            เริ่มต้นสร้างการประเมินโรงเรียนของคุณ
          </p>
          <button
            onClick={() => router.push('/evaluate')}
            className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            เริ่มการประเมิน
          </button>
        </div>
      </div>
    );
  }

  if (!selectedSchool) return null;

  const rating = getRating(selectedSchool.totalScore);
  const percentage = (selectedSchool.totalScore / 146) * 100;
  const currentRank = evaluations.findIndex(e => e.id === selectedSchool.id) + 1;
  const isNewSubmission = selectedSchool.id === newSubmissionId;

  const avgScore = Math.round(evaluations.reduce((sum, e) => sum + e.totalScore, 0) / evaluations.length);
  const maxScore = evaluations[0]?.totalScore || 0;
  const minScore = evaluations[evaluations.length - 1]?.totalScore || 0;
  const platinumCount = evaluations.filter(e => getRating(e.totalScore).level === 'PLATINUM').length;
  const goldCount = evaluations.filter(e => getRating(e.totalScore).level === 'GOLD').length;
  const silverCount = evaluations.filter(e => getRating(e.totalScore).level === 'SILVER').length;
  const bronzeCount = evaluations.filter(e => getRating(e.totalScore).level === 'BRONZE').length;

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1800px] mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold text-primary mb-1">
                  ผลการประเมิน GSI
                </h1>
                <p className="font-body text-gray-600">
                  ภาพรวมและการจัดอันดับโรงเรียนทั้งหมด {evaluations.length} แห่ง
                </p>
              </div>
              <button
                onClick={() => router.push('/evaluate')}
                className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold px-3 py-3 md:px-6 md:py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">เพิ่มการประเมินใหม่</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 py-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-body mb-1">คะแนนเฉลี่ย</p>
                  <p className="text-3xl font-bold text-primary font-display">{avgScore}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-body mb-1">คะแนนสูงสุด</p>
                  <p className="text-3xl font-bold text-green-600 font-display">{maxScore}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-body mb-1">คะแนนต่ำสุด</p>
                  <p className="text-3xl font-bold text-orange-600 font-display">{minScore}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-body mb-1">โรงเรียนทั้งหมด</p>
                  <p className="text-3xl font-bold text-blue-600 font-display">{evaluations.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - School Rankings */}
            <div className="xl:col-span-1 space-y-4">
              {/* Search and Filters */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาโรงเรียน..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="all">ทุกระดับ</option>
                    <option value="PLATINUM">Platinum</option>
                    <option value="GOLD">Gold</option>
                    <option value="SILVER">Silver</option>
                    <option value="BRONZE">Bronze</option>
                    <option value="ไม่ผ่าน">ไม่ผ่าน</option>
                  </select>

                  <button
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    title={sortOrder === 'desc' ? 'เรียงจากมากไปน้อย' : 'เรียงจากน้อยไปมาก'}
                  >
                    {sortOrder === 'desc' ? (
                      <SortDesc className="w-5 h-5 text-gray-600" />
                    ) : (
                      <SortAsc className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Rating Distribution */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600 font-body mb-2">การกระจายระดับ</p>
                  <div className="space-y-1">
                    {platinumCount > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Platinum</span>
                        <span className="font-semibold">{platinumCount}</span>
                      </div>
                    )}
                    {goldCount > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-yellow-600">Gold</span>
                        <span className="font-semibold">{goldCount}</span>
                      </div>
                    )}
                    {silverCount > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Silver</span>
                        <span className="font-semibold">{silverCount}</span>
                      </div>
                    )}
                    {bronzeCount > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-orange-600">Bronze</span>
                        <span className="font-semibold">{bronzeCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Rankings List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-display text-lg font-semibold text-gray-900 flex items-center">
                    <Medal className="w-5 h-5 text-primary mr-2" />
                    อันดับโรงเรียน
                    <span className="ml-auto text-sm text-gray-500 font-body">
                      {filteredEvaluations.length} โรงเรียน
                    </span>
                  </h3>
                </div>

                <div className="max-h-[calc(100vh-28rem)] overflow-y-auto custom-scrollbar">
                  {currentEvaluations.length === 0 ? (
                    <div className="p-8 text-center">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 font-body text-sm">ไม่พบโรงเรียนที่ค้นหา</p>
                    </div>
                  ) : (
                    <div className="p-2 space-y-2">
                      {currentEvaluations.map((evaluation) => {
                        const isSelected = selectedSchool?.id === evaluation.id;
                        const evalRating = getRating(evaluation.totalScore);
                        const rank = filteredEvaluations.findIndex(e => e.id === evaluation.id) + 1;
                        
                        return (
                          <div key={evaluation.id} className="relative group">
                            <button
                              onClick={() => selectSchool(evaluation)}
                              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                                isSelected
                                  ? 'border-primary bg-gradient-to-r from-primary/10 to-secondary/10 shadow-sm'
                                  : 'border-gray-100 hover:border-primary/30 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                                  {getRankIcon(rank)}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-display font-semibold text-gray-900 text-sm truncate mb-1">
                                    {evaluation.schoolName}
                                  </h4>
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-body text-xs text-gray-600">
                                      {evaluation.totalScore} คะแนน
                                    </span>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${evalRating.bgColor} ${evalRating.textColor}`}>
                                      {evalRating.level}
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div
                                      className={`bg-gradient-to-r ${evalRating.color} h-1.5 rounded-full transition-all duration-300`}
                                      style={{ width: `${(evaluation.totalScore / 146) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(evaluation);
                              }}
                              className="absolute top-2 right-2 p-1.5 rounded-lg transition-all duration-200 bg-white/80 text-gray-400 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 border border-transparent hover:border-red-200 shadow-sm"
                              title="ลบการประเมิน"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-body disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-body transition-colors ${
                              currentPage === page
                                ? 'bg-primary text-white'
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-body disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Selected School Details */}
            <div className="xl:col-span-2 space-y-4">
              {/* School Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getRankIcon(currentRank)}
                      <h2 className="font-display text-2xl font-bold text-gray-900">
                        {selectedSchool.schoolName}
                      </h2>
                      {isNewSubmission && (
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                          ใหม่
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-body">
                          {new Date(selectedSchool.submittedAt).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CardSim className="w-4 h-4" />
                        <span className="font-body">{selectedSchool.coverage}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span className="font-body">{selectedSchool.area} ตร.ม.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="font-body">{selectedSchool.staff} คน</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-display font-bold text-primary mb-2">
                      {selectedSchool.totalScore}
                    </div>
                    <div className={`inline-block ${rating.bgColor} ${rating.textColor} px-4 py-1.5 rounded-full font-display text-sm font-semibold mb-2`}>
                      {rating.level}
                    </div>
                    <div className="text-sm text-gray-600 font-body">
                      {percentage.toFixed(1)}% จากคะแนนเต็ม
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${rating.color} h-3 rounded-full transition-all duration-1000`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Radar Chart and Dimension Scores */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 text-primary mr-2" />
                  Radar Chart
                </h3>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Radar Chart */}
                  <div>
                    <div className="h-80 bg-gradient-to-br from-gray-50/50 to-white rounded-xl p-4 border border-gray-100">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <defs>
                            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#039a8a" stopOpacity={0.5} />
                              <stop offset="100%" stopColor="#007a6d" stopOpacity={0.2} />
                            </linearGradient>
                          </defs>
                          <PolarGrid stroke="#d1d5db" strokeOpacity={0.5} strokeWidth={1} />
                          <PolarAngleAxis dataKey="dimension" tick={false} />
                          <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                            tickCount={6}
                          />
                          <Radar
                            name="คะแนน"
                            dataKey="score"
                            stroke="#007a6d"
                            strokeWidth={3}
                            fill="url(#radarGradient)"
                            fillOpacity={0.4}
                            dot={({ cx, cy, index }: any) => {
                              const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
                              return (
                                <circle
                                  key={`dot-${index}`}
                                  cx={cx}
                                  cy={cy}
                                  r={6}
                                  fill={colors[index % colors.length]}
                                  stroke="#fff"
                                  strokeWidth={2}
                                />
                              );
                            }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {radarData.map((item, index) => {
                        const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
                        return (
                          <div key={index} className="flex items-center gap-2 bg-gray-50/50 rounded-lg px-3 py-2">
                            <div 
                              className="w-3 h-3 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: colors[index % colors.length] }}
                            ></div>
                            <span className="font-body text-sm text-gray-700">{item.dimension}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dimension Scores */}
                  <div className="space-y-3">
                    {radarData.map((data, index) => {
                      const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
                      const bgColors = ['from-green-50 to-green-100', 'from-blue-50 to-blue-100', 'from-orange-50 to-orange-100', 'from-red-50 to-red-100'];
                      const getScoreLevel = (score: number) => {
                        if (score >= 80) return { text: 'ยอดเยี่ยม', color: 'text-green-600' };
                        if (score >= 60) return { text: 'ดี', color: 'text-blue-600' };
                        if (score >= 40) return { text: 'พอใช้', color: 'text-orange-600' };
                        return { text: 'ต้องพัฒนา', color: 'text-red-600' };
                      };

                      const level = getScoreLevel(data.score);

                      return (
                        <div 
                          key={index} 
                          className={`bg-gradient-to-r ${bgColors[index % bgColors.length]} rounded-xl p-4 border border-gray-100/50 hover:shadow-md transition-all duration-300`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full flex-shrink-0" 
                                style={{ backgroundColor: colors[index % colors.length] }}
                              ></div>
                              <span className="font-body text-sm font-semibold text-gray-900">
                                {data.dimension}
                              </span>
                            </div>
                            <span className={`text-xs font-semibold ${level.color}`}>
                              {level.text}
                            </span>
                          </div>

                          <div className="flex items-baseline mb-2">
                            <span className="font-display text-3xl font-bold text-gray-900">
                              {data.score}
                            </span>
                            <span className="font-body text-sm text-gray-500 ml-1">%</span>
                          </div>

                          <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-2 rounded-full transition-all duration-1000"
                              style={{ 
                                width: `${data.score}%`,
                                backgroundColor: colors[index % colors.length]
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Analysis */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 text-primary mr-2" />
                  การวิเคราะห์
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-body text-sm font-semibold text-green-700 mb-3 flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      จุดแข็ง
                    </h4>
                    <div className="space-y-2">
                      {strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2 bg-green-50/70 rounded-lg p-3 border border-green-100">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="font-body text-sm text-gray-700">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-body text-sm font-semibold text-orange-700 mb-3 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      ต้องพัฒนา
                    </h4>
                    <div className="space-y-2">
                      {improvements.map((improvement, index) => (
                        <div key={index} className="flex items-center gap-2 bg-orange-50/70 rounded-lg p-3 border border-orange-100">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="font-body text-sm text-gray-700">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 text-primary mr-2" />
                  คะแนนแยกตามหมวด
                </h3>

                <div className="space-y-4">
                  {categoryScores.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-body text-sm text-gray-700 font-medium">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-sm font-semibold text-gray-900">
                            {category.score}/{category.maxScore}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({category.percentage.toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full transition-all duration-1000"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={handleDownload}
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold px-6 py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  ดาวน์โหลดรายงาน (.txt)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        schoolName={schoolToDelete?.schoolName || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #039a8a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #007a6d;
        }
      `}</style>
    </>
  );
}