# Green School Index (GSI) 

- Next.js 15 (App Router)
- TypeScript strict mode
- Tailwind CSS
- Responsive Design (Mobile, Tablet, Desktop)
- Mock Data (ไม่ต้องเชื่อม backend)
- Client-side Validation
- Radar Chart (recharts)
- Score Ranking

## หน้าที่มี

1. **Home (/)** - แนะนำเกี่ยวกับ GSI
2. **Criteria (/criteria)** - เกณฑ์การประเมิน 6 ด้าน
3. **Evaluate (/evaluate)** - ฟอร์มประเมินโรงเรียน
4. **Summary (/summary)** - สรุปผลและจัดอันดับ

## การติดตั้ง

```bash
# ติดตั้ง dependencies
npm install

# รันโหมด development
npm run dev

# เปิดเว็บบราวเซอร์ที่
http://localhost:3000
```

## โครงสร้างโปรเจค

```
gsi-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── page.tsx            # Home page
│   │   ├── criteria/
│   │   │   └── page.tsx        # Criteria page
│   │   ├── evaluate/
│   │   │   └── page.tsx        # Evaluation form
│   │   └── summary/
│   │       └── page.tsx        # Summary page
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── RadarChart.tsx      # Radar chart component
│   │   └── ScoreTable.tsx      # Score ranking table
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── mocks/
│       └── data.ts             # Mock data & functions
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

## เกณฑ์การประเมิน

1. **Energy Efficiency** (20%) - การใช้พลังงานอย่างมีประสิทธิภาพ
2. **Waste Management** (18%) - การจัดการขยะและรีไซเคิล
3. **Water Conservation** (15%) - การอนุรักษ์น้ำ
4. **Green Curriculum** (17%) - หลักสูตรสิ่งแวดล้อม
5. **Green Building** (15%) - อาคารเป็นมิตรต่อสิ่งแวดล้อม
6. **Community Engagement** (15%) - การมีส่วนร่วมของชุมชน

## 🎨 สี Theme

- Primary: `#007a6d` (เขียวเข้ม)
- Secondary: `#039a8a` (เขียวอมฟ้า)

## 📝 TypeScript Features

- ใช้ strict mode
- ไม่มี `any` type
- Type safety ทุก component
- Interface สำหรับทุก data structure

## 🔧 Scripts

```bash
npm run dev      # Development mode
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

## 📦 Dependencies

- **next**: ^15.1.6
- **react**: ^19.0.0
- **react-dom**: ^19.0.0
- **recharts**: ^2.15.0
- **tailwindcss**: ^3.4.17
- **typescript**: ^5

## ⚡ Performance

- Server-side rendering (SSR)
- Static optimization
- Code splitting
- Image optimization

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu บนมือถือ
- Optimized สำหรับ iPad และ Desktop

## 🎯 Features

### Form Validation
- Real-time validation
- Error messages
- Required field indicators

### Score Calculation
- Weighted scoring system
- Real-time calculation
- Visual feedback

### Data Visualization
- Radar chart
- Score ranking table
- Color-coded performance levels

## 🌟 Design Highlights

- Custom fonts (Poppins + Merriweather)
- Gradient effects
- Smooth animations
- Modern UI/UX
- Sustainability theme

## 📄 License

Private Project - Green School Index