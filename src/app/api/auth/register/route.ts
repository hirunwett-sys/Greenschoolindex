import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signUserToken, USER_COOKIE_NAME } from '@/lib/userAuth';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name?.trim() || !email?.trim() || !password) {
            return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบ' }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json({ error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: 'อีเมลนี้ถูกใช้งานแล้ว' }, { status: 409 });
        }

        const hashed = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({ data: { name, email, password: hashed } });

        const token = await signUserToken({ userId: user.id, email: user.email, name: user.name });
        const response = NextResponse.json(
            { success: true, user: { id: user.id, name: user.name, email: user.email } },
            { status: 201 }
        );
        response.cookies.set(USER_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        return response;
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }, { status: 500 });
    }
}
