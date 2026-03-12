import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import { signUserToken, USER_COOKIE_NAME } from '@/lib/userAuth';

/**
 * GET /api/auth/register-redirect?token=<signed_jwt>&redirect=/my-submissions
 *
 * สมัครสมาชิกอัตโนมัติผ่าน redirect จากเว็บภายนอก
 * เว็บภายนอกต้องสร้าง JWT token ที่ sign ด้วย REDIRECT_JWT_SECRET
 * แล้ว redirect ผู้ใช้มาที่ endpoint นี้
 */

export async function GET(request: NextRequest) {
    // ตรวจสอบว่าได้ตั้งค่า secret ไว้แล้ว
    if (!process.env.REDIRECT_JWT_SECRET) {
        return NextResponse.json(
            { error: 'ระบบ redirect ยังไม่ได้ตั้งค่า กรุณาติดต่อผู้ดูแลระบบ' },
            { status: 503 }
        );
    }

    const REDIRECT_SECRET = new TextEncoder().encode(process.env.REDIRECT_JWT_SECRET);

    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const redirectTo = searchParams.get('redirect') || '/my-submissions';

    // ป้องกัน open redirect — รับเฉพาะ relative path เท่านั้น
    if (!redirectTo.startsWith('/')) {
        return NextResponse.redirect(new URL('/login?error=invalid_redirect', request.url));
    }

    if (!token) {
        return NextResponse.redirect(new URL('/register?error=missing_token', request.url));
    }

    // ตรวจสอบและถอดรหัส token
    let name: string, email: string, password: string;
    try {
        const { payload } = await jwtVerify(token, REDIRECT_SECRET);
        name = payload.name as string;
        email = payload.email as string;
        password = payload.password as string;
    } catch {
        return NextResponse.redirect(new URL('/register?error=invalid_token', request.url));
    }

    if (!name || !email || !password) {
        return NextResponse.redirect(new URL('/register?error=incomplete_data', request.url));
    }

    try {
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // ยังไม่มีบัญชี → สมัครสมาชิกใหม่
            const hashed = await bcrypt.hash(password, 12);
            user = await prisma.user.create({
                data: { name, email, password: hashed },
            });
        } else {
            // มีบัญชีอยู่แล้ว → ตรวจสอบรหัสผ่านก่อน login
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return NextResponse.redirect(
                    new URL('/login?error=account_exists', request.url)
                );
            }
        }

        // ออก JWT และ set cookie
        const jwtToken = await signUserToken({
            userId: user.id,
            email: user.email,
            name: user.name,
        });

        const response = NextResponse.redirect(new URL(redirectTo, request.url));
        response.cookies.set(USER_COOKIE_NAME, jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 วัน
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Register-redirect error:', error);
        return NextResponse.redirect(new URL('/register?error=server_error', request.url));
    }
}
