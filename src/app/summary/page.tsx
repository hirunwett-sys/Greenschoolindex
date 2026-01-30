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
  RotateCcw,
  TrendingUp,
  Calendar,
  Users,
  Building,
  Medal,
  Crown,
  ChevronRight,
  BarChart3,
  Target,
  Trash2,
  AlertCircle
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

// Define the GSI criteria structure
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
    maxScore: 35,
    subCriteria: [
      { id: 'wmr1', name: 'วัดและลดการใช้น้ำ', maxScore: 7 },
      { id: 'wmr2', name: 'น้ำทางเลือก/น้ำใช้ซ้ำ', maxScore: 7 },
      { id: 'wmr3', name: 'ลดของเสีย/รีไซเคิล', maxScore: 7 },
      { id: 'wmr4', name: 'จัดซื้อวัสดุอย่างยั่งยืน', maxScore: 7 },
      { id: 'wmr5', name: 'เศรษฐกิจหมุนเวียน', maxScore: 7 }
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
  coverage: string;
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

// Custom Tooltip Component
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

export default function SummaryPage(): JSX.Element {
  const router = useRouter();
  const [evaluations, setEvaluations] = useState<EvaluationData[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<EvaluationData | null>(null);
  const [newSubmission, setNewSubmission] = useState<string | null>(null);
  const [radarData, setRadarData] = useState<RadarData[]>([]);
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    // Check for new submission
    const newData = sessionStorage.getItem('evaluationResult');
    let newEvalId: string | null = null;

    if (newData) {
      try {
        const parsed = JSON.parse(newData);
        // Save to localStorage with unique ID
        newEvalId = `evaluation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(newEvalId, JSON.stringify(parsed));
        setNewSubmission(newEvalId);
        sessionStorage.removeItem('evaluationResult');
      } catch (error) {
        console.error('Error saving evaluation:', error);
      }
    }

    // Load all evaluations from localStorage
    loadEvaluations(newEvalId);
  }, []);

  const loadEvaluations = (highlightId: string | null = null) => {
    const allEvaluations: EvaluationData[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('evaluation_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '');
          allEvaluations.push({ ...data, id: key });
        } catch (error) {
          console.error('Error parsing evaluation:', error);
        }
      }
    }

    // Sort by total score (descending)
    allEvaluations.sort((a, b) => b.totalScore - a.totalScore);
    
    setEvaluations(allEvaluations);
    
    // Select the new submission or top school
    if (allEvaluations.length > 0) {
      if (highlightId) {
        const newEval = allEvaluations.find(e => e.id === highlightId);
        if (newEval) {
          selectSchool(newEval);
          return;
        }
      }
      selectSchool(allEvaluations[0]);
    } else {
      router.push('/evaluate');
    }
  };

  const selectSchool = (school: EvaluationData) => {
    setSelectedSchool(school);
    
    const scores = school.scores;
    
    // Calculate category scores
    const stiScore = (scores.sti1 || 0) + (scores.sti2 || 0) + (scores.sti3 || 0) + (scores.sti4 || 0);
    const stiPercent = (stiScore / 28) * 100;
    
    //! todo: calculate / 34 , ปรับหน้าคำถามให้ตัวเลือกที่ 5 เต็มที่ 6 คะแนน ส่วนข้อ 1-4 เต็มที่ 7 คะแนน
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
    
    // Store category scores
    setCategoryScores([
      { name: 'พื้นที่และการเดินทาง', score: stiScore, maxScore: 28, percentage: stiPercent },
      { name: 'น้ำและทรัพยากร', score: wmrScore, maxScore: 34, percentage: wmrPercent },
      { name: 'พลังงานและคาร์บอน', score: eccScore, maxScore: 30, percentage: eccPercent },
      { name: 'สุขภาพและความเป็นอยู่', score: hwqScore, maxScore: 12, percentage: hwqPercent },
      { name: 'การศึกษาและมีส่วนร่วม', score: ereScore, maxScore: 25, percentage: erePercent },
      { name: 'การบริหารจัดการ', score: gpmScore, maxScore: 6, percentage: gpmPercent },
      { name: 'นวัตกรรม', score: ilpScore, maxScore: 10, percentage: ilpPercent }
    ]);
    
    // Calculate 4 dimensions for radar
    const environmentScore = (stiPercent + wmrPercent + eccPercent) / 3;
    const socialScore = (hwqPercent + erePercent) / 2;
    const managementScore = (gpmPercent + ilpPercent) / 2;
    
    const ecc2Percent = ((scores.ecc2 || 0) / 6) * 100;
    const ecc3Percent = ((scores.ecc3 || 0) / 6) * 100;
    const wmr2Percent = ((scores.wmr2 || 0) / 7) * 100;
    const wmr5Percent = ((scores.wmr5 || 0) / 7) * 100;
    const ilp1Percent = ((scores.ilp1 || 0) / 5) * 100;
    const economyScore = (ecc2Percent + ecc3Percent + wmr2Percent + wmr5Percent + ilp1Percent) / 5;
    
    setRadarData([
      { dimension: 'สิ่งแวดล้อม', score: Math.round(environmentScore), fullMark: 100 },
      { dimension: 'สังคม', score: Math.round(socialScore), fullMark: 100 },
      { dimension: 'บริหารจัดการ', score: Math.round(managementScore), fullMark: 100 },
      { dimension: 'เศรษฐกิจ', score: Math.round(economyScore), fullMark: 100 }
    ]);

    // Identify strengths and areas for improvement
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

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      localStorage.removeItem(id);
      setDeleteConfirm(null);
      loadEvaluations();
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
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

คะแนนรวม: ${selectedSchool.totalScore} / 145 คะแนน
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
  };

  if (!selectedSchool || evaluations.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-body text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  const rating = getRating(selectedSchool.totalScore);
  const percentage = (selectedSchool.totalScore / 145) * 100;
  const currentRank = evaluations.findIndex(e => e.id === selectedSchool.id) + 1;
  const isNewSubmission = selectedSchool.id === newSubmission;

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
            สรุปผลการประเมิน
          </h1>
          <p className="font-body text-gray-600">
            เปรียบเทียบผลการประเมินทั้งหมด {evaluations.length} โรงเรียน
          </p>
          {isNewSubmission && (
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mt-2">
              <Award className="w-4 h-4" />
              <span className="font-body text-sm font-semibold">บันทึกผลการประเมินเรียบร้อยแล้ว</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Selected School Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* School Header Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/20 animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getRankIcon(currentRank)}
                    <h2 className="font-display text-2xl font-bold text-gray-900">
                      {selectedSchool.schoolName}
                    </h2>
                    {isNewSubmission && (
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                        ใหม่
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-body">
                        {new Date(selectedSchool.submittedAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span className="font-body">{selectedSchool.area} ตร.ม.</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span className="font-body">{selectedSchool.staff} คน</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-display font-bold text-primary mb-1">
                    {selectedSchool.totalScore}
                  </div>
                  <div className={`inline-block ${rating.bgColor} ${rating.textColor} px-3 py-1 rounded-full font-display text-sm font-semibold`}>
                    {rating.level}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm font-body text-gray-600 mb-2">
                  <span>ความคืบหน้า</span>
                  <span>{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`bg-gradient-to-r ${rating.color} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-primary/10 animate-slide-up">
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <span>Radar chart</span>
              </h3>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="h-80 bg-gray-50 rounded-xl p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <defs>
                          <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#039a8a" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#007a6d" stopOpacity={0.15} />
                          </linearGradient>
                        </defs>
                        <PolarGrid stroke="#d1d5db" strokeOpacity={0.5} strokeWidth={1} />
                        <PolarAngleAxis dataKey="dimension" tick={false} />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          tick={{ fill: '#9ca3af', fontSize: 10 }}
                          tickCount={6}
                        />
                        <Radar
                          name="คะแนน"
                          dataKey="score"
                          stroke="#007a6d"
                          strokeWidth={2}
                          fill="url(#radarGradient)"
                          fillOpacity={0.3}
                          dot={({ cx, cy, index }: any) => {
                            const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
                            return (
                              <circle
                                key={`dot-${index}`}
                                cx={cx}
                                cy={cy}
                                r={7}
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
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {radarData.map((item, index) => {
                      const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
                      return (
                        <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
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

                {/* Score Details - ขวา */}
                <div className="space-y-3">
                  {radarData.map((data, index) => {
                    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
                    const getScoreLevel = (score: number) => {
                      if (score >= 80) return 'ยอดเยี่ยม';
                      if (score >= 60) return 'ดี';
                      if (score >= 40) return 'พอใช้';
                      return 'ต้องพัฒนา';
                    };

                    return (
                      <div 
                        key={index} 
                        className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border-2 border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: colors[index % colors.length] }}
                            ></div>
                            <span className="font-body text-sm font-semibold text-gray-900">
                              {data.dimension}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-gray-500">
                            {getScoreLevel(data.score)}
                          </span>
                        </div>

                        <div className="flex items-baseline mb-2">
                          <span className="font-display text-3xl font-bold text-gray-900">
                            {data.score}
                          </span>
                          <span className="font-body text-sm text-gray-500 ml-1">%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
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

            {/* Analysis Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10 animate-slide-up delay-100">
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>การวิเคราะห์</span>
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-body text-sm font-semibold text-green-700 mb-3 flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>จุดแข็ง</span>
                  </h4>
                  <div className="space-y-2">
                    {strengths.map((strength, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-green-50 rounded-lg p-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="font-body text-sm text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-body text-sm font-semibold text-orange-700 mb-3 flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>ต้องพัฒนา</span>
                  </h4>
                  <div className="space-y-2">
                    {improvements.map((improvement, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-orange-50 rounded-lg p-2">
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
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10 animate-slide-up delay-200">
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>คะแนนแยกตามหมวด</span>
              </h3>

              <div className="space-y-4">
                {categoryScores.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-body text-sm text-gray-700">{category.name}</span>
                      <span className="font-display text-sm font-semibold text-gray-900">
                        {category.score}/{category.maxScore}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full transition-all duration-1000"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
              <button
                onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold px-6 py-3 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                ดาวน์โหลดรายงาน
              </button>
              <button
                onClick={() => router.push('/evaluate')}
                className="flex-1 inline-flex items-center justify-center bg-white text-primary border-2 border-primary font-display font-semibold px-6 py-3 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                เพิ่มการประเมินใหม่
              </button>
            </div>
          </div>

          {/* Right Column - Rankings List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10 sticky top-6 animate-fade-in">
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Medal className="w-5 h-5 text-primary" />
                <span>อันดับทั้งหมด</span>
              </h3>

              <div className="space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
                {evaluations.map((evaluation, index) => {
                  const isSelected = selectedSchool?.id === evaluation.id;
                  const evalRating = getRating(evaluation.totalScore);
                  
                  return (
                    <div key={evaluation.id} className="relative group">
                      <button
                        onClick={() => selectSchool(evaluation)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-primary bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg'
                            : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                            {getRankIcon(index + 1)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display font-semibold text-gray-900 truncate mb-1">
                              {evaluation.schoolName}
                            </h4>
                            <div className="flex items-center justify-between">
                              <span className="font-body text-sm text-gray-600">
                                {evaluation.totalScore} คะแนน
                              </span>
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${evalRating.bgColor} ${evalRating.textColor}`}>
                                {evalRating.level}
                              </span>
                            </div>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className={`bg-gradient-to-r ${evalRating.color} h-1.5 rounded-full`}
                                style={{ width: `${(evaluation.totalScore / 145) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          {isSelected && (
                            <ChevronRight className="w-5 h-5 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </button>

                      {/* Delete Button */}
                      {evaluations.length > 1 && (
                        <button
                          onClick={() => handleDelete(evaluation.id)}
                          className={`absolute top-2 right-2 p-2 rounded-lg transition-all duration-300 ${
                            deleteConfirm === evaluation.id
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100'
                          }`}
                          title={deleteConfirm === evaluation.id ? 'คลิกอีกครั้งเพื่อยืนยันการลบ' : 'ลบการประเมิน'}
                        >
                          {deleteConfirm === evaluation.id ? (
                            <AlertCircle className="w-4 h-4" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Summary Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-3 text-center">
                    <p className="font-body text-xs text-gray-600 mb-1">คะแนนเฉลี่ย</p>
                    <p className="font-display text-xl font-bold text-primary">
                      {Math.round(evaluations.reduce((sum, e) => sum + e.totalScore, 0) / evaluations.length)}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-3 text-center">
                    <p className="font-body text-xs text-gray-600 mb-1">คะแนนสูงสุด</p>
                    <p className="font-display text-xl font-bold text-primary">
                      {evaluations[0].totalScore}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}