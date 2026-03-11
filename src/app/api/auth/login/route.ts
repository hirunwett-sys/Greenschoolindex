import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signUserToken, USER_COOKIE_NAME } from '@/lib/userAuth';
import { signAdminToken, COOKIE_NAME as ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { identifier, password } = await request.json();

        if (!identifier?.trim() || !password) {
            return NextResponse.json({ error: 'กรุณากรอกอีเมล/ชื่อผู้ใช้ และรหัสผ่าน' }, { status: 400 });
        }

        // Try User login (by email)
        const user = await prisma.user.findUnique({ where: { email: identifier } });
        if (user) {
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return NextResponse.json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
            const token = await signUserToken({ userId: user.id, email: user.email, name: user.name });
            const response = NextResponse.json({ success: true, type: 'user', name: user.name });
            response.cookies.set(USER_COOKIE_NAME, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            return response;
        }

        // Try Admin login (by username)
        const admin = await prisma.admin.findUnique({ where: { username: identifier } });
        if (admin) {
            const valid = await bcrypt.compare(password, admin.password);
            if (!valid) return NextResponse.json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
            const token = await signAdminToken({ adminId: admin.id, username: admin.username });
            const response = NextResponse.json({ success: true, type: 'admin', name: admin.username });
            response.cookies.set(ADMIN_COOKIE_NAME, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 8,
                path: '/',
            });
            return response;
        }

        return NextResponse.json({ error: 'อีเมล/ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }, { status: 500 });
    }
}
