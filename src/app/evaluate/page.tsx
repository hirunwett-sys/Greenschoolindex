'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import { useToast } from '@/components/ToastProvider';
import { 
  TreePine, 
  Droplet, 
  Zap, 
  Heart,
  Settings,
  Lightbulb,
  BookOpen,
  Info,
  Upload,
  X,
  FileText,
  CheckCircle
} from 'lucide-react';

const gsiCriteria = [
  {
    id: 'sti',
    name: 'Site, Transportation & Infrastructure',
    nameLocal: 'พื้นที่ การเดินทาง และโครงสร้างพื้นฐาน',
    icon: TreePine,
    color: 'from-green-500 to-emerald-600',
    subCriteria: [
      { id: 'sti1', name: 'มีการจัดการการใช้ที่ดินและพื้นที่สีเขียวอย่างยั่งยืนหรือไม่', maxScore: 7 },
      { id: 'sti2', name: 'ส่งเสริมการเดินทางที่ยั่งยืน (เดิน จักรยาน ขนส่งสาธารณะ)', maxScore: 7 },
      { id: 'sti3', name: 'มีโครงสร้างพื้นฐานรองรับการเดินทางคาร์บอนต่ำ/EV', maxScore: 7 },
      { id: 'sti4', name: 'พื้นที่และโครงสร้างพื้นฐานเข้าถึงได้สำหรับทุกคน', maxScore: 7 }
    ]
  },
  {
    id: 'wmr',
    name: 'Water & Material Resources',
    nameLocal: 'น้ำและทรัพยากรวัสดุ',
    icon: Droplet,
    color: 'from-blue-500 to-cyan-600',
    subCriteria: [
      { id: 'wmr1', name: 'มีการวัดและลดการใช้น้ำอย่างเป็นระบบ', maxScore: 7 },
      { id: 'wmr2', name: 'ใช้น้ำทางเลือกหรือนำน้ำกลับมาใช้ซ้ำ', maxScore: 7 },
      { id: 'wmr3', name: 'มีระบบลดของเสียและการรีไซเคิล', maxScore: 7 },
      { id: 'wmr4', name: 'การจัดซื้อวัสดุอย่างยั่งยืน', maxScore: 7 },
      { id: 'wmr5', name: 'สนับสนุนแนวคิดเศรษฐกิจหมุนเวียน', maxScore: 6 }
    ]
  },
  {
    id: 'ecc',
    name: 'Energy, Carbon & Climate',
    nameLocal: 'พลังงาน คาร์บอน และสภาพภูมิอากาศ',
    icon: Zap,
    color: 'from-yellow-500 to-orange-600',
    subCriteria: [
      { id: 'ecc1', name: 'มีข้อมูลและการติดตามการใช้พลังงาน', maxScore: 6 },
      { id: 'ecc2', name: 'มีมาตรการเพิ่มประสิทธิภาพพลังงาน', maxScore: 6 },
      { id: 'ecc3', name: 'ใช้พลังงานหมุนเวียนหรือคาร์บอนต่ำ', maxScore: 6 },
      { id: 'ecc4', name: 'คำนวณและรายงานการปล่อย GHG', maxScore: 6 },
      { id: 'ecc5', name: 'มีเป้าหมาย/แผนลดคาร์บอน', maxScore: 6 }
    ]
  },
  {
    id: 'hwq',
    name: 'Health, Wellbeing & Quality of Life',
    nameLocal: 'สุขภาพ ความเป็นอยู่ที่ดี และคุณภาพชีวิต',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    subCriteria: [
      { id: 'hwq1', name: 'คุณภาพอากาศ แสง และความสบายภายใน', maxScore: 4 },
      { id: 'hwq2', name: 'มาตรการด้านสุขภาพและความปลอดภัย', maxScore: 4 },
      { id: 'hwq3', name: 'การเข้าถึงและการออกแบบเพื่อทุกคน', maxScore: 4 }
    ]
  },
  {
    id: 'gpm',
    name: 'Governance, Planning & Management',
    nameLocal: 'การกำกับดูแล การวางแผน และการจัดการ',
    icon: Settings,
    color: 'from-purple-500 to-violet-600',
    subCriteria: [
      { id: 'gpm1', name: 'มีโครงสร้างบริหารด้านความยั่งยืน', maxScore: 2 },
      { id: 'gpm2', name: 'มีแผน เป้าหมาย และตัวชี้วัด', maxScore: 2 },
      { id: 'gpm3', name: 'มีการรายงานและปรับปรุงต่อเนื่อง', maxScore: 2 }
    ]
  },
  {
    id: 'ilp',
    name: 'Innovation & Local Priorities',
    nameLocal: 'นวัตกรรมและความสำคัญในพื้นที่',
    icon: Lightbulb,
    color: 'from-amber-500 to-yellow-600',
    subCriteria: [
      { id: 'ilp1', name: 'มีนวัตกรรมที่เกินเกณฑ์มาตรฐาน', maxScore: 5 },
      { id: 'ilp2', name: 'ตอบโจทย์บริบทพื้นที่/ชุมชน', maxScore: 5 }
    ]
  },
  {
    id: 'ere',
    name: 'Education, Research & Engagement',
    nameLocal: 'การศึกษา งานวิจัย และการมีส่วนร่วม',
    icon: BookOpen,
    color: 'from-indigo-500 to-blue-600',
    subCriteria: [
      { id: 'ere1', name: 'นโยบายโรงเรียนสีเขียว', maxScore: 5 },
      { id: 'ere2', name: 'แผนงานและงบประมาณที่ชัดเจน', maxScore: 5 },
      { id: 'ere3', name: 'ระบบติดตามและรายงานผล', maxScore: 5 },
      { id: 'ere4', name: 'การพัฒนาและปรับปรุงอย่างต่อเนื่อง', maxScore: 5 },
      { id: 'ere5', name: 'การถ่ายทอดสู่ชุมชน/สังคม', maxScore: 5 }
    ]
  }
];

const scoringGuide = [
  { score: 0, label: 'ไม่มีข้อมูล', desc: 'ไม่ได้ดำเนินการ' },
  { score: 1, label: 'ทำแบบชั่วคราว', desc: 'มีเฉพาะแนวคิด / ทำแบบชั่วคราว' },
  { score: 2, label: 'เริ่มดำเนินการ', desc: 'มีบ้าง แต่ไม่ต่อเนื่อง / บางพื้นที่' },
  { score: 3, label: 'ดำเนินการสม่ำเสมอ', desc: 'ครอบคลุมระดับหนึ่ง แต่ไม่ครบ' },
  { score: 4, label: 'เป็นระบบ', desc: 'ครบทุกด้าน มีหลักฐาน มีติดตาม' },
  { score: 5, label: 'ติดตามพัฒนา', desc: 'ประเมินและพัฒนาอย่างต่อเนื่อง' },
  { score: 6, label: 'คุณภาพสูง', desc: 'ใช้ข้อมูลเชิงประจักษ์ในการพัฒนา' },
  { score: 7, label: 'ยอดเยี่ยม', desc: 'มีนวัตกรรม เป็นต้นแบบได้' }
];

const coverageOptions = {
  whole: 'ทั้งโรงเรียน',
  building: 'เฉพาะอาคารเรียน',
  full: 'รวมโรงอาหาร / หอพัก / สนามกีฬา'
};

interface FormData {
  schoolName: string;
  coverage: string;
  area: string;
  staff: string;
  scores: Record<string, number>;
}

interface EvidenceFile {
  file: File;
  fileName: string;
  fileSize: number;
  base64Data?: string;
}

export default function EvaluatePage(): JSX.Element {
  const router = useRouter();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    coverage: '',
    area: '',
    staff: '',
    scores: {},
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [evidenceFile, setEvidenceFile] = useState<EvidenceFile | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);

  const handleInputChange = (field: string, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleScoreChange = (criteriaId: string, score: number): void => {
    setFormData((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        [criteriaId]: score,
      },
    }));
    if (errors[criteriaId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[criteriaId];
        return newErrors;
      });
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data:application/pdf;base64, prefix
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      showToast('กรุณาเลือกไฟล์ PDF เท่านั้น', 'error');
      e.target.value = '';
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      showToast('ขนาดไฟล์ต้องไม่เกิน 10MB', 'error');
      e.target.value = '';
      return;
    }

    setIsProcessingFile(true);
    try {
      const base64Data = await convertFileToBase64(file);
      
      setEvidenceFile({
        file,
        fileName: file.name,
        fileSize: file.size,
        base64Data,
      });

      if (errors.evidenceFile) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.evidenceFile;
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error converting file to base64:', error);
      showToast('เกิดข้อผิดพลาดในการประมวลผลไฟล์', 'error');
      e.target.value = '';
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleRemoveFile = (): void => {
    setEvidenceFile(null);
    const fileInput = document.getElementById('evidence-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'กรุณากรอกชื่อโรงเรียน';
    }

    if (!formData.coverage) {
      newErrors.coverage = 'กรุณาเลือกขอบเขตการประเมิน';
    }

    if (!formData.area.trim()) {
      newErrors.area = 'กรุณากรอกพื้นที่ใช้สอย';
    } else if (Number(formData.area) <= 0) {
      newErrors.area = 'พื้นที่ต้องมากกว่า 0';
    }

    if (!formData.staff.trim()) {
      newErrors.staff = 'กรุณากรอกจำนวนบุคลากร';
    } else if (Number(formData.staff) <= 0) {
      newErrors.staff = 'จำนวนบุคลากรต้องมากกว่า 0';
    }

    gsiCriteria.forEach((criterion) => {
      criterion.subCriteria.forEach((sub) => {
        if (formData.scores[sub.id] === undefined || formData.scores[sub.id] === null) {
          newErrors[sub.id] = 'กรุณาให้คะแนน';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // realScore = (selectedScore / 7) * maxScore  (score normalization)
  const normalizeScore = (rawScore: number, maxScore: number): number => {
    return (rawScore / 7) * maxScore;
  };

  const calculateTotalScore = (): number => {
    let total = 0;
    gsiCriteria.forEach((criterion) => {
      criterion.subCriteria.forEach((sub) => {
        total += normalizeScore(formData.scores[sub.id] || 0, sub.maxScore);
      });
    });
    return Math.round(total * 100) / 100;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const totalScore = calculateTotalScore();
      const coverageThai = formData.coverage ? coverageOptions[formData.coverage as keyof typeof coverageOptions] : '';

      // Normalize scores: realScore = (selectedScore / 7) * maxScore
      const normalizedScores: Record<string, number> = {};
      gsiCriteria.forEach((criterion) => {
        criterion.subCriteria.forEach((sub) => {
          normalizedScores[sub.id] = normalizeScore(formData.scores[sub.id] || 0, sub.maxScore);
        });
      });

      const response = await fetch('/api/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schoolName: formData.schoolName,
          coverage: coverageThai, 
          area: formData.area,
          staff: formData.staff,
          scores: normalizedScores,
          totalScore,
          evidence: evidenceFile?.base64Data ? {
            fileName: evidenceFile.fileName,
            fileData: evidenceFile.base64Data,
            fileSize: evidenceFile.fileSize,
          } : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit evaluation');
      }

      const result = await response.json();

      sessionStorage.setItem('newEvaluationId', result.id);
      router.push('/my-submissions');
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      showToast('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            แบบฟอร์มการประเมิน
          </h1>
          <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
            กรอกข้อมูลและให้คะแนนโรงเรียนของคุณในแต่ละเกณฑ์
          </p>
        </div>

        {/* Scoring Guide */}
        {showGuide && (
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 md:p-8 mb-8 border-2 border-primary/20 animate-slide-up">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Info className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl font-bold text-primary">
                  หมายเหตุการให้คะแนน (0-7)
                </h3>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {scoringGuide.map((guide) => (
                <div key={guide.score} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-bold text-primary">{guide.score}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-gray-900 text-sm">
                        {guide.label}
                      </p>
                      <p className="font-body text-xs text-gray-600 truncate">
                        {guide.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* School Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-primary/10 animate-slide-up">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">
              ข้อมูลโรงเรียน
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                  ชื่อโรงเรียน <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    errors.schoolName ? 'border-red-500' : 'border-gray-300 hover:border-primary/50'
                  }`}
                  placeholder="กรอกชื่อโรงเรียน"
                />
                {errors.schoolName && (
                  <p className="mt-2 text-sm text-red-500 font-body">{errors.schoolName}</p>
                )}
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                  โรงเรียนที่ประเมินครอบคลุม <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.coverage}
                  onChange={(e) => handleInputChange('coverage', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    errors.coverage ? 'border-red-500' : 'border-gray-300 hover:border-primary/50'
                  }`}
                >
                  <option value="">เลือกขอบเขตการประเมิน</option>
                  <option value="whole">ทั้งโรงเรียน</option>
                  <option value="building">เฉพาะอาคารเรียน</option>
                  <option value="full">รวมโรงอาหาร / หอพัก / สนามกีฬา</option>
                </select>
                {errors.coverage && (
                  <p className="mt-2 text-sm text-red-500 font-body">{errors.coverage}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    พื้นที่ใช้สอยรวม (ตร.ม.) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                      errors.area ? 'border-red-500' : 'border-gray-300 hover:border-primary/50'
                    }`}
                    placeholder="เช่น 5000"
                  />
                  {errors.area && (
                    <p className="mt-2 text-sm text-red-500 font-body">{errors.area}</p>
                  )}
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    บุคลากร (คน) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.staff}
                    onChange={(e) => handleInputChange('staff', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                      errors.staff ? 'border-red-500' : 'border-gray-300 hover:border-primary/50'
                    }`}
                    placeholder="เช่น 50"
                  />
                  {errors.staff && (
                    <p className="mt-2 text-sm text-red-500 font-body">{errors.staff}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Criteria Evaluation */}
          {gsiCriteria.map((criterion, criterionIndex) => {
            const Icon = criterion.icon;
            return (
              <div
                key={criterion.id}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-primary/10 animate-slide-up"
                style={{ animationDelay: `${(criterionIndex + 1) * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${criterion.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl md:text-2xl font-semibold text-gray-900">
                      {criterionIndex + 1}. {criterion.nameLocal}
                    </h2>
                    <p className="font-body text-sm text-gray-500">{criterion.name}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {criterion.subCriteria.map((sub, subIndex) => (
                    <div key={sub.id} className="border-t border-gray-200 pt-6 first:border-t-0 first:pt-0">
                      <h3 className="font-body text-base font-medium text-gray-900 mb-4">
                        {sub.id.toUpperCase()} - {sub.name}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 8 }, (_, i) => i).map((score) => (
                          <button
                            key={score}
                            type="button"
                            onClick={() => handleScoreChange(sub.id, score)}
                            className={`flex-1 min-w-[50px] px-4 py-3 rounded-lg font-display font-semibold transition-all duration-200 ${
                              formData.scores[sub.id] === score
                                ? `bg-gradient-to-r ${criterion.color} text-white shadow-lg scale-105`
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                            }`}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                      {errors[sub.id] && (
                        <p className="mt-2 text-sm text-red-500 font-body">{errors[sub.id]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Evidence Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-primary/10 animate-slide-up">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-xl md:text-2xl font-semibold text-gray-900">
                  8. หลักฐานประกอบ
                </h2>
                <p className="font-body text-sm text-gray-500">อัพโหลดเอกสารหลักฐาน (ไม่บังคับ)</p>
              </div>
            </div>

            <div className="space-y-4">
              {!evidenceFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-body text-gray-600 mb-2">
                    คลิกเพื่ออัพโหลดไฟล์ PDF
                  </p>
                  <p className="font-body text-sm text-gray-500 mb-4">
                    ขนาดไฟล์ไม่เกิน 10MB • ไฟล์จะถูกเก็บในฐานข้อมูล
                  </p>
                  <label className="inline-block">
                    <input
                      id="evidence-file"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={isProcessingFile}
                    />
                    <span className={`cursor-pointer inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                      isProcessingFile ? 'opacity-50 cursor-not-allowed' : ''
                    }`}>
                      <Upload className="w-5 h-5 mr-2" />
                      {isProcessingFile ? 'กำลังประมวลผล...' : 'เลือกไฟล์'}
                    </span>
                  </label>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-body font-semibold text-gray-900 truncate">
                            {evidenceFile.fileName}
                          </h4>
                          <p className="font-body text-sm text-gray-600">
                            {formatFileSize(evidenceFile.fileSize)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="flex-shrink-0 p-1 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                          title="ลบไฟล์"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-body text-sm font-medium">ไฟล์พร้อมบันทึกในฐานข้อมูล</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center animate-scale-in">
            <button
              type="submit"
              disabled={isSubmitting || isProcessingFile}
              className={`bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold px-12 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 ${
                (isSubmitting || isProcessingFile) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting 
                ? 'กำลังประมวลผล...' 
                : 'ส่งการประเมิน'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}