const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Score values for a sample school (sum to ~80 out of 145)
const sampleScores = [
    // STI x4 (max 2,4,5,4)
    { sti1:1.14, sti2:2.29, sti3:2.86, sti4:2.29,
    // WMR x5 (max 7,6,5,5,4)
      wmr1:4.00, wmr2:3.43, wmr3:2.86, wmr4:2.86, wmr5:2.29,
    // ECC x5 (max 5,5,5,5,5)
      ecc1:2.86, ecc2:2.86, ecc3:2.86, ecc4:2.86, ecc5:2.86,
    // HWQ x3 (max 5,5,4)
      hwq1:2.86, hwq2:2.86, hwq3:2.29,
    // GPM x3 (max 5,5,5)
      gpm1:2.86, gpm2:2.86, gpm3:2.86,
    // ILP x2 (max 5,5)
      ilp1:2.86, ilp2:2.86,
    // ERE x5 (max 6,5,5,5,4)
      ere1:3.43, ere2:2.86, ere3:2.86, ere4:2.86, ere5:2.29 },

    // High-scoring school
    { sti1:2.00, sti2:4.00, sti3:5.00, sti4:4.00,
      wmr1:7.00, wmr2:6.00, wmr3:5.00, wmr4:5.00, wmr5:4.00,
      ecc1:5.00, ecc2:5.00, ecc3:5.00, ecc4:5.00, ecc5:5.00,
      hwq1:5.00, hwq2:5.00, hwq3:4.00,
      gpm1:5.00, gpm2:5.00, gpm3:5.00,
      ilp1:5.00, ilp2:5.00,
      ere1:6.00, ere2:5.00, ere3:5.00, ere4:5.00, ere5:4.00 },

    // Low-scoring school
    { sti1:0.57, sti2:1.14, sti3:1.43, sti4:1.14,
      wmr1:2.00, wmr2:1.71, wmr3:1.43, wmr4:1.43, wmr5:1.14,
      ecc1:1.43, ecc2:1.43, ecc3:1.43, ecc4:1.43, ecc5:1.43,
      hwq1:1.43, hwq2:1.43, hwq3:1.14,
      gpm1:1.43, gpm2:1.43, gpm3:1.43,
      ilp1:1.43, ilp2:1.43,
      ere1:1.71, ere2:1.43, ere3:1.43, ere4:1.43, ere5:1.14 },
];

function totalScore(s) {
    return Object.values(s).reduce((a, b) => a + b, 0);
}

const sampleSchools = [
    { schoolName: 'โรงเรียนสาธิตแห่งใหม่', coverage: 'สมุทรปราการ', area: 'ประถมศึกษา', staff: '45', scores: sampleScores[0] },
    { schoolName: 'โรงเรียนสิรินธรราชวิทยาลัย', coverage: 'นนทบุรี', area: 'มัธยมศึกษา', staff: '120', scores: sampleScores[1] },
    { schoolName: 'โรงเรียนบ้านหนองแวง', coverage: 'ขอนแก่น', area: 'ประถมศึกษา', staff: '18', scores: sampleScores[2] },
];

async function main() {
    // --- Admin ---
    const existingAdmin = await prisma.admin.findUnique({ where: { username: 'admin' } });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 12);
        const admin = await prisma.admin.create({ data: { username: 'admin', password: hashedPassword } });
        console.log(`✓ Created admin: username="${admin.username}", password="admin123"`);
    } else {
        console.log('Admin already exists, skipping.');
    }

    // --- Sample schools ---
    const schoolCount = await prisma.school.count();
    if (schoolCount > 0) {
        console.log(`Schools already exist (${schoolCount}), skipping sample data.`);
        return;
    }

    for (const s of sampleSchools) {
        const total = totalScore(s.scores);
        await prisma.school.create({
            data: {
                schoolName: s.schoolName,
                coverage: s.coverage,
                area: s.area,
                staff: s.staff,
                totalScore: Math.round(total * 100) / 100,
                scores: { create: s.scores },
            },
        });
        console.log(`✓ Created school: "${s.schoolName}" (score: ${total.toFixed(2)})`);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());

