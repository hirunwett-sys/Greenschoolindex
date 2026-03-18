import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const admins = await prisma.admin.findMany({
        select: { id: true, username: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(admins.map((a) => ({ ...a, createdAt: a.createdAt.toISOString() })));
}

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        if (!username?.trim() || !password || password.length < 6) {
            return NextResponse.json(
                { error: 'กรุณากรอกชื่อผู้ใช้ และรหัสผ่านอย่างน้อย 6 ตัวอักษร' },
                { status: 400 }
            );
        }
        const existing = await prisma.admin.findUnique({ where: { username } });
        if (existing) return NextResponse.json({ error: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' }, { status: 409 });

        const hashed = await bcrypt.hash(password, 12);
        const admin = await prisma.admin.create({
            data: { username, password: hashed },
            select: { id: true, username: true, createdAt: true },
        });
        return NextResponse.json({ ...admin, createdAt: admin.createdAt.toISOString() }, { status: 201 });
    } catch (error) {
        console.error('Create admin error:', error);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        const count = await prisma.admin.count();
        if (count <= 1) return NextResponse.json({ error: 'ไม่สามารถลบแอดมินคนสุดท้ายได้' }, { status: 400 });
        await prisma.admin.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete admin error:', error);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
    }
}
