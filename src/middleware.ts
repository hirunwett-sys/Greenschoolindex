import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, COOKIE_NAME } from '@/lib/auth';
import { verifyUserToken, USER_COOKIE_NAME } from '@/lib/userAuth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // --- Admin routes ---
    if (pathname === '/admin/login') {
        const token = request.cookies.get(COOKIE_NAME)?.value;
        if (token && await verifyAdminToken(token)) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get(COOKIE_NAME)?.value;
        if (!token) return NextResponse.redirect(new URL('/admin/login', request.url));
        const payload = await verifyAdminToken(token);
        if (!payload) {
            const res = NextResponse.redirect(new URL('/admin/login', request.url));
            res.cookies.delete(COOKIE_NAME);
            return res;
        }
        return NextResponse.next();
    }

    // --- User-protected routes: allow both user_token and admin_token ---
    if (pathname === '/evaluate' || pathname === '/my-submissions') {
        const userToken = request.cookies.get(USER_COOKIE_NAME)?.value;
        if (userToken && await verifyUserToken(userToken)) return NextResponse.next();

        const adminToken = request.cookies.get(COOKIE_NAME)?.value;
        if (adminToken && await verifyAdminToken(adminToken)) return NextResponse.next();

        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect /login and /register if already logged in (user OR admin)
    if (pathname === '/login' || pathname === '/register') {
        const userToken = request.cookies.get(USER_COOKIE_NAME)?.value;
        if (userToken && await verifyUserToken(userToken)) {
            return NextResponse.redirect(new URL('/my-submissions', request.url));
        }
        const adminToken = request.cookies.get(COOKIE_NAME)?.value;
        if (adminToken && await verifyAdminToken(adminToken)) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/evaluate', '/my-submissions', '/login', '/register'],
};
