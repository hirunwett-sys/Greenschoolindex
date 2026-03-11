import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

// One-time setup: only works when no admins exist in DB
export async function POST(request: NextRequest) {
    try {
        const existingCount = await prisma.admin.count();
        if (existingCount > 0) {
            return NextResponse.json({ error: 'Admin already exists' }, { status: 403 });
        }

        const body = await request.json();
        const { username, password } = body;

        if (!username || !password || password.length < 6) {
            return NextResponse.json(
                { error: 'Username and password (min 6 chars) required' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const admin = await prisma.admin.create({
            data: { username, password: hashedPassword },
        });

        return NextResponse.json({ success: true, username: admin.username }, { status: 201 });
    } catch (error) {
        console.error('Setup error:', error);
        return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
    }
}
