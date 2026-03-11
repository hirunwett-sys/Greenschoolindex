import { NextRequest, NextResponse } from 'next/server';
import { verifyUserToken, USER_COOKIE_NAME } from '@/lib/userAuth';

export async function GET(request: NextRequest) {
    const token = request.cookies.get(USER_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyUserToken(token);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    return NextResponse.json({ userId: payload.userId, email: payload.email, name: payload.name });
}
