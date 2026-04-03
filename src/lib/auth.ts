import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || 'gsi-admin-secret-key-change-in-production'
);
const COOKIE_NAME = 'admin_token';
const TOKEN_EXPIRY = '8h';

export { COOKIE_NAME };

export async function signAdminToken(payload: { adminId: string; username: string }): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(TOKEN_EXPIRY)
        .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<{ adminId: string; username: string } | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { adminId: string; username: string };
    } catch {
        return null;
    }
}
