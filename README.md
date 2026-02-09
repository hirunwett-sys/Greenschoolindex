# Green School Index (GSI)

Green School Index (GSI) คือเว็บแอปสำหรับประเมินและจัดอันดับโรงเรียนด้านความยั่งยืน  
โดยอ้างอิงแนวคิดจากมาตรฐานสากลด้านสิ่งแวดล้อมและการพัฒนาที่ยั่งยืน  
เช่น LEED และ AASHE และปรับให้เหมาะสมกับบริบทการศึกษา

ระบบมุ่งเน้นการประเมินใน 4 มิติหลัก ได้แก่ สิ่งแวดล้อม สังคม การบริหารจัดการ และเศรษฐกิจ  
ผลลัพธ์จะแสดงในรูปแบบคะแนนรวม อันดับ และกราฟ Radar เพื่อสะท้อนจุดแข็งของแต่ละโรงเรียน

---

## Technology Stack

- Next.js 15 (App Router)
- TypeScript (Strict Mode)
- Tailwind CSS
- Responsive Design (Mobile / Tablet / Desktop)
- Mock Data (Client-side only)
- Recharts (Radar Chart)
- No Authentication System

---

## Pages

1. Home  
   แสดงบทนำ แนวคิดของ Green School Index และความสำคัญของโรงเรียนสีเขียว

2. Evaluation Criteria  
   แสดงเกณฑ์การประเมินทั้งหมด พร้อมโครงสร้างคะแนนและการอ้างอิงมาตรฐาน

3. Evaluation Form  
   ฟอร์มสำหรับกรอกข้อมูลโรงเรียนและให้คะแนนตามเกณฑ์  
   มีการตรวจสอบข้อมูลก่อนคำนวณผล

4. Summary & Ranking  
   สรุปผลคะแนนรวม  
   แสดง Radar Chart 4 มิติ  
   แสดงตารางจัดอันดับโรงเรียนทั้งหมด

---

## Core Features

- School Evaluation Form
- Weighted Score Calculation
- Radar Chart Visualization (4 Dimensions)
- School Ranking System
- Responsive UI พร้อม Hamburger Navigation
- Client-side Validation
- Mock Data (ไม่เชื่อมต่อ Backend)

---

## Evaluation Structure

### หมวดคะแนนหลัก (รวม 145 คะแนน)

- Site, Transportation & Infrastructure (STI) – 28
- Water & Material Resources (WMR) – 34
- Energy, Carbon & Climate (ECC) – 30
- Health, Wellbeing & Quality of Life (HWQ) – 12
- Governance, Planning & Management (GPM) – 6
- Innovation & Local Priorities (ILP) – 10
- Education, Research & Engagement (ERE) – 25

---

## Radar Chart Calculation

1. แปลงคะแนนแต่ละหมวดเป็นเปอร์เซ็นต์  
   (คะแนนที่ได้ ÷ คะแนนเต็ม) × 100

2. รวมเป็น 4 มิติ

- สิ่งแวดล้อม  
  (STI% + WMR% + ECC%) ÷ 3

- สังคม  
  (HWQ% + ERE%) ÷ 2

- การบริหารจัดการ  
  (GPM% + ILP%) ÷ 2

- เศรษฐกิจ  
  (ECC2% + ECC3% + WMR2% + WMR5% + ILP1%) ÷ 5

3. แสดงผลใน Radar Chart 4 แกน

---

## Evaluation Dimensions

### สิ่งแวดล้อม (35%)
- การใช้พื้นที่และโครงสร้างพื้นฐาน
- การจัดการน้ำและทรัพยากร
- พลังงาน คาร์บอน และการเปลี่ยนแปลงสภาพภูมิอากาศ

### สังคม (32%)
- สุขภาพ คุณภาพชีวิต และสภาพแวดล้อม
- การศึกษา งานวิจัย และการมีส่วนร่วม

### การบริหารจัดการ (24%)
- โครงสร้างการบริหารและการวางแผน
- นวัตกรรมและบริบทพื้นที่

### เศรษฐกิจ (9%)
- ประสิทธิภาพพลังงานและการลงทุนระยะยาว
- การใช้ทรัพยากรอย่างคุ้มค่าและสร้างมูลค่าเพิ่ม

---

## UI Theme

- Primary Color: #007a6d
- Secondary Color: #039a8a
- Design Style: Clean, Modern, Sustainability-focused

---

## Project Scope

- Frontend-focused implementation
- ใช้ Mock Data เพื่อแสดงแนวคิดระบบ
- ไม่มีระบบ Login หรือ Authentication
- ออกแบบเพื่อรองรับการพัฒนาต่อเป็นระบบ Backend ในอนาคต

---

## Todo

- เพิ่มตารางเปรียบเทียบเกณฑ์ในหน้า Evaluation Criteria
- แสดงความเชื่อมโยงระหว่าง LEED, AASHE และ GSI
- แสดงระดับการรับรองตามช่วงคะแนน

