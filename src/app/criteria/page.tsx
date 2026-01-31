import { JSX } from 'react';
import { 
  TreePine, 
  Droplet, 
  Zap, 
  Users, 
  BookOpen, 
  Settings, 
  TrendingUp,
  Award
} from 'lucide-react';

const gsiCriteria = [
  {
    id: 'environment',
    name: 'สิ่งแวดล้อม',
    weight: 0.35,
    description: 'การจัดการพื้นที่ การเดินทาง ทรัพยากรน้ำ พลังงาน และการลดคาร์บอน',
    icon: TreePine,
    color: 'from-green-500 to-emerald-600',
    subCriteria: [
      {
        category: 'Site, Transportation & Infrastructure',
        items: [
          'STI1 การจัดการที่ดินและพื้นที่สีเขียว',
          'STI2 การเดินทางที่ยั่งยืน',
          'STI3 โครงสร้างพื้นฐานคาร์บอนต่ำ / EV',
          'STI4 การเข้าถึงพื้นที่สำหรับทุกคน'
        ]
      },
      {
        category: 'Water & Material Resources',
        items: [
          'WMR1 วัดและลดการใช้น้ำ',
          'WMR2 น้ำทางเลือก / น้ำใช้ซ้ำ',
          'WMR3 ลดของเสีย / รีไซเคิล',
          'WMR4 จัดซื้อวัสดุอย่างยั่งยืน',
          'WMR5 เศรษฐกิจหมุนเวียน'
        ]
      },
      {
        category: 'Energy, Carbon & Climate',
        items: [
          'ECC1 ข้อมูลและการติดตามพลังงาน',
          'ECC2 ประสิทธิภาพพลังงาน',
          'ECC3 พลังงานหมุนเวียน / คาร์บอนต่ำ',
          'ECC4 คำนวณและรายงาน GHG',
          'ECC5 เป้าหมายและแผนลดคาร์บอน'
        ]
      }
    ]
  },
  {
    id: 'social',
    name: 'สังคม',
    weight: 0.32,
    description: 'สุขภาพ ความเป็นอยู่ที่ดี การศึกษา งานวิจัย และการมีส่วนร่วมของชุมชน',
    icon: Users,
    color: 'from-blue-500 to-cyan-600',
    subCriteria: [
      {
        category: 'Health, Wellbeing & Quality of Life',
        items: [
          'HWQ1 คุณภาพอากาศ แสง ความสบาย',
          'HWQ2 สุขภาพและความปลอดภัย',
          'HWQ3 การเข้าถึงและ Universal Design'
        ]
      },
      {
        category: 'Education, Research & Engagement',
        items: [
          'ERE1 ความยั่งยืนในหลักสูตร',
          'ERE2 งานวิจัยด้านความยั่งยืน',
          'ERE3 Living Lab',
          'ERE4 การมีส่วนร่วมของนักศึกษา/บุคลากร',
          'ERE5 ถ่ายทอดสู่ชุมชน/สังคม'
        ]
      }
    ]
  },
  {
    id: 'management',
    name: 'บริหารจัดการ',
    weight: 0.24,
    description: 'โครงสร้างการบริหาร การวางแผน การติดตามผล และการปรับปรุงอย่างต่อเนื่อง',
    icon: Settings,
    color: 'from-purple-500 to-violet-600',
    subCriteria: [
      {
        category: 'Governance, Planning & Management',
        items: [
          'GPM1 โครงสร้างบริหารด้านความยั่งยืน',
          'GPM2 แผน เป้าหมาย ตัวชี้วัด',
          'GPM3 รายงานและปรับปรุงต่อเนื่อง'
        ]
      },
      {
        category: 'Innovation & Local Priorities',
        items: [
          'ILP1 นวัตกรรมเกินเกณฑ์',
          'ILP2 ตอบโจทย์บริบทพื้นที่/ชุมชน'
        ]
      }
    ]
  },
  {
    id: 'economy',
    name: 'เศรษฐกิจ',
    weight: 0.09,
    description: 'ประสิทธิภาพการใช้ทรัพยากร การลงทุนระยะยาว และการสร้างมูลค่าเพิ่ม',
    icon: TrendingUp,
    color: 'from-amber-500 to-orange-600',
    subCriteria: [
      {
        category: 'Energy & Cost Efficiency',
        items: [
          'ECC2 ประสิทธิภาพพลังงาน (ลดต้นทุน)',
          'ECC3 พลังงานหมุนเวียน (ลงทุนระยะยาว)'
        ]
      },
      {
        category: 'Resource & Value Creation',
        items: [
          'WMR2 น้ำใช้ซ้ำ / น้ำทางเลือก',
          'WMR5 เศรษฐกิจหมุนเวียน',
          'ILP1 นวัตกรรมที่สร้างมูลค่าเพิ่ม'
        ]
      }
    ]
  }
];

const ratingLevels = [
  { level: 'PLATINUM', range: '116-145 คะแนน', color: 'from-slate-400 to-slate-600', score: '80%+' },
  { level: 'GOLD', range: '102-115 คะแนน', color: 'from-yellow-400 to-amber-500', score: '70-79%' },
  { level: 'SILVER', range: '87-101 คะแนน', color: 'from-gray-300 to-gray-400', score: '60-69%' },
  { level: 'BRONZE', range: '58-86 คะแนน', color: 'from-orange-400 to-orange-600', score: '40-59%' },
  { level: 'ไม่ผ่าน', range: '0-57 คะแนน', color: 'from-red-400 to-red-600', score: '<40%' }
];

export default function CriteriaPage(): JSX.Element {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            เกณฑ์การประเมิน GSI
          </h1>
          <p className="font-body text-lg text-gray-600 max-w-3xl mx-auto">
            Green School Index ประเมินโรงเรียนใน 4 ด้านหลัก 
            โดยอ้างอิงมาตรฐานสากล LEED และ AASHE STARS
            พร้อมปรับให้เหมาะกับบริบทของโรงเรียนไทย
          </p>
        </div>

        {/* Main Criteria Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {gsiCriteria.map((criterion, index) => {
            const Icon = criterion.icon;
            return (
              <div
                key={criterion.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-primary/10 hover:border-primary/30 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-14 h-14 bg-gradient-to-br ${criterion.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-gray-900 mb-1">
                        {criterion.name}
                      </h3>
                      <div className="inline-flex items-center bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1 rounded-full">
                        <span className="font-body text-sm font-medium text-primary">
                          น้ำหนัก: {(criterion.weight * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="font-body text-gray-600 leading-relaxed mb-6">
                  {criterion.description}
                </p>

                {/* Visual Weight Indicator */}
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${criterion.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${criterion.weight * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Sub-criteria */}
                <div className="space-y-4">
                  {criterion.subCriteria.map((sub, subIndex) => (
                    <div key={subIndex} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-display text-sm font-semibold text-primary mb-2">
                        {sub.category}
                      </h4>
                      <ul className="space-y-1.5">
                        {sub.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="font-body text-sm text-gray-700 flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rating System */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 border-2 border-primary/20 animate-fade-in mb-16">
          <div className="flex items-center justify-center mb-8">
            <Award className="w-8 h-8 text-primary mr-3" />
            <h2 className="font-display text-3xl font-bold text-primary">
              ระดับการรับรอง
            </h2>
          </div>
          
          <p className="text-center font-body text-gray-600 mb-8 max-w-2xl mx-auto">
            คะแนนเต็ม 145 คะแนน จากการประเมิน 4 ด้านหลัก
            โดยแต่ละด้านมีน้ำหนักและเกณฑ์ย่อยที่แตกต่างกัน
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {ratingLevels.map((level) => (
              <div
                key={level.level}
                className="text-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${level.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-2">
                  {level.level}
                </h3>
                <p className="font-body text-sm text-gray-600 mb-1">
                  {level.range}
                </p>
                <p className="font-body text-xs text-primary font-semibold">
                  {level.score}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="font-body text-gray-700 leading-relaxed max-w-3xl mx-auto">
              การประเมินจะพิจารณาจากคะแนนรวมของทั้ง 4 ด้าน 
              โดยคะแนนในแต่ละเกณฑ์ย่อยจะถูกคำนวณตามน้ำหนักที่กำหนด
              เพื่อสะท้อนความสำคัญของแต่ละด้านต่อความยั่งยืนโดยรวม
            </p>
          </div>
        </div>

        {/* Comparison Note */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary/10 mb-16">
          <h3 className="font-display text-2xl font-bold text-primary mb-4 text-center">
            ความแตกต่างจากมาตรฐานสากล
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="font-display font-bold text-blue-600">LEED</span>
              </div>
              <p className="font-body text-sm text-gray-600">
                เน้นอาคารและโครงสร้างพื้นฐาน
                <br />
                110 คะแนนเต็ม
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="font-display font-bold text-green-600">AASHE</span>
              </div>
              <p className="font-body text-sm text-gray-600">
                เน้นสถาบันการศึกษาโดยรวม
                <br />
                250 คะแนนเต็ม
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="font-display font-bold text-primary">GSI</span>
              </div>
              <p className="font-body text-sm text-gray-600">
                ผสมผสานทั้งสองมาตรฐาน
                <br />
                145 คะแนนเต็ม
              </p>
            </div>
          </div>
          <p className="font-body text-sm text-gray-600 text-center mt-6 max-w-2xl mx-auto">
            GSI นำเอาจุดเด่นของทั้ง LEED และ AASHE STARS มาปรับใช้
            พร้อมเพิ่มเกณฑ์ที่เหมาะสมกับบริบทของโรงเรียนไทย
            โดยเน้นความสมดุลระหว่างสิ่งแวดล้อม สังคม และการบริหารจัดการ
          </p>
        </div>

        {/* Detailed Comparison Tables */}
        <div className="space-y-8 mb-16">
          {/* Table 1: Criteria Category Comparison */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary/10">
            <h3 className="font-display text-2xl font-bold text-primary mb-6 text-center">
              ตารางเปรียบเทียบเกณฑ์ในแต่ละด้าน
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full font-body">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">LEED</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">AASHE</th>
                    <th className="text-left py-4 px-4 font-semibold text-primary">GSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">Location and Transportation (LT)</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Transportation</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">Site, Transportation & Infrastructure</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">Sustainable Sites (SS)</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Buildings & Grounds</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">Site, Transportation & Infrastructure</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">Water Efficiency (WE)</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Buildings & Grounds</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">Water & Material Resources</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">Energy and Atmosphere (EA)</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Energy & Climate</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">Energy, Carbon & Climate</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">Materials and Resources (MR)</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Procurement & Waste</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">Water & Resource Efficiency</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">Indoor Environmental Quality (EQ)</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Wellbeing & Work</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">Health, Wellbeing & Quality of Life</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">Integrative Process, Planning and Assessments (IP)</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Coordination & Planning</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">Governance, Planning & Management</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">Project Priorities (PR)</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Innovation & Leadership</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">Innovation & Local Priorities</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">-</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Curriculum</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">Education, Research & Engagement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Score Distribution Comparison */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary/10">
            <h3 className="font-display text-2xl font-bold text-primary mb-6 text-center">
              ตารางเปรียบเทียบคะแนนในแต่ละด้าน
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full font-body">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-left py-4 px-4 font-semibold text-primary">หัวข้อ (GSI)</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">คะแนน (LEED)</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">คะแนน (AASHE)</th>
                    <th className="text-center py-4 px-4 font-semibold text-primary">คะแนนที่ใช้จริง</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Site, Transportation & Infrastructure</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">15+11</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">10+20</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">28</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Water & Material Resources</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">9+18</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">20+20</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">34</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Energy, Carbon & Climate</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">33</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">26</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">30</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Health, Wellbeing & Quality of Life</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">13</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">11</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">12</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Governance, Planning & Management</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">1</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">11</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">6</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Innovation & Local Priorities</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">10</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">10</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">10</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Education, Research & Engagement</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">-</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">45</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">25</td>
                  </tr>
                  <tr className="bg-primary/5 font-semibold">
                    <td className="py-4 px-4 text-sm text-gray-900">รวมคะแนน</td>
                    <td className="py-4 px-4 text-sm text-center text-gray-900">110</td>
                    <td className="py-4 px-4 text-sm text-center text-gray-900">175</td>
                    <td className="py-4 px-4 text-sm text-center text-primary">145</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 3: Rating Levels Comparison */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary/10">
            <h3 className="font-display text-2xl font-bold text-primary mb-6 text-center">
              ตารางเปรียบเทียบระดับการรับรองในแต่ละมาตรฐาน
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full font-body">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">เกณฑ์</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">LEED (110)</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">AASHE (250)</th>
                    <th className="text-center py-4 px-4 font-semibold text-primary">GSI (145)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-slate-400 to-slate-600 text-white">
                        PLATINUM
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">80–110 คะแนน</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">≥ 85 คะแนน</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">116–145 คะแนน</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 text-white">
                        GOLD
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">60-79 คะแนน</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">65-84 คะแนน</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">102-115 คะแนน</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-gray-300 to-gray-400 text-white">
                        SILVER
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">50-59 คะแนน</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">45-64 คะแนน</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">87-101 คะแนน</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-400 to-orange-600 text-white">
                        ผ่าน / BRONZE
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">40-49 คะแนน</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">25-44 คะแนน</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">58-86 คะแนน</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-red-400 to-red-600 text-white">
                        ไม่ผ่าน
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">0-39 คะแนน</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-700">0-24 คะแนน</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-primary">0-57 คะแนน</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}