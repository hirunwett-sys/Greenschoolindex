import Link from 'next/link';
import { JSX } from 'react';
import { Sprout, BarChart3, Trophy, Globe, Lightbulb, GraduationCap, Users, Leaf, Recycle, BookOpen } from 'lucide-react';

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center animate-fade-in">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-slide-up">
              Green School Index
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto animate-slide-up delay-100">
              ดัชนีประเมินและจัดอันดับโรงเรียนด้านความยั่งยืน
            </p>
            <p className="font-body text-lg text-gray-500 mb-12 max-w-2xl mx-auto animate-slide-up delay-200">
              เพราะการศึกษาที่ดีควรมาพร้อมกับความรับผิดชอบต่อโลก
            </p>
            <Link
              href="/evaluate"
              className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold px-10 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in delay-300"
            >
              เริ่มทำการประเมิน
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="font-display text-4xl font-bold text-primary mb-6">
                โรงเรียนสีเขียว คืออะไร?
              </h2>
              <p className="font-body text-gray-700 text-lg leading-relaxed mb-4">
                โรงเรียนสีเขียว (Green School) เป็นสถาบันการศึกษาที่มุ่งเน้นการพัฒนาผู้เรียน
                ให้มีความคิดสร้างสรรค์และความรับผิดชอบต่อสิ่งแวดล้อม 
                ผ่านการเรียนรู้จากการลงมือปฏิบัติจริงมากกว่าการท่องจำ
              </p>
              <p className="font-body text-gray-700 text-lg leading-relaxed">
                ตั้งแต่การใช้วัสดุหมุนเวียนในสิ่งก่อสร้าง การจัดการทรัพยากรอย่างยั่งยืน
                ไปจนถึงหลักสูตรที่ปลูกฝังความเข้าใจในธรรมชาติและการอนุรักษ์
                เพื่อสร้างความรู้สึกเป็นหนึ่งเดียวกับธรรมชาติอย่างแท้จริง
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-fade-in delay-200">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl border-2 border-primary/20 hover:shadow-lg transition-shadow duration-300">
                <Leaf className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-display text-xl font-semibold text-primary mb-2">
                  วัสดุหมุนเวียน
                </h3>
                <p className="font-body text-sm text-gray-600">
                  ใช้วัสดุจากธรรมชาติ เช่น ไม้ไผ่ หญ้า และดิน
                </p>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-6 rounded-2xl border-2 border-secondary/20 hover:shadow-lg transition-shadow duration-300">
                <BookOpen className="w-10 h-10 text-secondary mb-3" />
                <h3 className="font-display text-xl font-semibold text-secondary mb-2">
                  เรียนรู้จากปฏิบัติ
                </h3>
                <p className="font-body text-sm text-gray-600">
                  เน้นการลงมือทำจริงมากกว่าการท่องจำ
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl border-2 border-primary/20 hover:shadow-lg transition-shadow duration-300">
                <Sprout className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-display text-xl font-semibold text-primary mb-2">
                  เกษตรยั่งยืน
                </h3>
                <p className="font-body text-sm text-gray-600">
                  ปลูกผักผลไม้เพื่อบริโภคภายในโรงเรียน
                </p>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-6 rounded-2xl border-2 border-secondary/20 hover:shadow-lg transition-shadow duration-300">
                <Recycle className="w-10 h-10 text-secondary mb-3" />
                <h3 className="font-display text-xl font-semibold text-secondary mb-2">
                  จัดการทรัพยากร
                </h3>
                <p className="font-body text-sm text-gray-600">
                  ลดผลกระทบต่อธรรมชาติให้น้อยที่สุด
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-center text-primary mb-12 animate-fade-in">
            แรงบันดาลใจจากทั่วโลก
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-2">
                    Green School International
                  </h3>
                  <p className="font-body text-sm text-gray-500 mb-3">บาหลี, อินโดนีเซีย | ก่อตั้ง พ.ศ. 2551</p>
                </div>
              </div>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                โรงเรียนต้นแบบที่ก่อตั้งโดย John และ Cynthia Hardy ท่ามกลางธรรมชาติอันอุดมสมบูรณ์ 
                เน้นการพัฒนาความคิดสร้างสรรค์และการเรียนรู้จากการลงมือปฏิบัติ 
                พร้อมสิ่งก่อสร้างที่ใช้วัสดุหมุนเวียนและมีพื้นที่เกษตรกรรมภายในโรงเรียน
              </p>
              <p className="font-body text-sm text-secondary font-semibold">
                ขยายสาขาไปนิวซีแลนด์ แอฟริกาใต้ และเร็วๆ นี้ที่เม็กซิโก
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-2">
                    Sustainable Play Preschool
                  </h3>
                  <p className="font-body text-sm text-gray-500 mb-3">นิวคาสเซิล, ออสเตรเลีย</p>
                </div>
              </div>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                โรงเรียนวีแกนสำหรับเด็กก่อนอนุบาล (3-5 ปี) 
                ที่ปลูกฝังแนวคิดการอยู่ร่วมกับธรรมชาติอย่างมีความรับผิดชอบตั้งแต่เยาว์วัย 
                ผ่านกิจกรรมการปลูกผัก การประกอบอาหาร และการจัดการขยะอย่างยั่งยืน
              </p>
              <p className="font-body text-sm text-secondary font-semibold">
                ลดการเบียดเบียนสัตว์และการปล่อยก๊าซเรือนกระจก
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-center text-primary mb-12 animate-fade-in">
            ทำไมต้องเป็นโรงเรียนสีเขียว?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
                พัฒนาความคิดสร้างสรรค์
              </h3>
              <p className="font-body text-gray-600">
                ส่งเสริมการเรียนรู้ผ่านการลงมือปฏิบัติจริง
                และการแก้ปัญหาอย่างสร้างสรรค์
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-slide-up delay-100">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
                สร้างความรับผิดชอบ
              </h3>
              <p className="font-body text-gray-600">
                ปลูกฝังจิตสำนึกด้านสิ่งแวดล้อม
                และความรับผิดชอบต่อโลกตั้งแต่เยาว์วัย
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-slide-up delay-200">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
                เชื่อมโยงกับธรรมชาติ
              </h3>
              <p className="font-body text-gray-600">
                สร้างความรู้สึกเป็นหนึ่งเดียวกับธรรมชาติ
                ผ่านกิจกรรมและการมีปฏิสัมพันธ์กับสิ่งแวดล้อม
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            พร้อมที่จะเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="font-body text-lg text-white/90 mb-8">
            ประเมินโรงเรียนของคุณวันนี้และร่วมสร้างอนาคตที่ยั่งยืนไปด้วยกัน
          </p>
          <Link
            href="/evaluate"
            className="inline-block bg-white text-primary font-display font-semibold px-10 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            เริ่มประเมินเลย
          </Link>
        </div>
      </section>
    </div>
  );
}