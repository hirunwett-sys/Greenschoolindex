import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.USER_JWT_SECRET || 'gsi-user-secret-key-change-in-production'
);

export const USER_COOKIE_NAME = 'user_token';

export async function signUserToken(payload: { userId: string; email: string; name: string }): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);
}

export async function verifyUserToken(token: string): Promise<{ userId: string; email: string; name: string } | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { userId: string; email: string; name: string };
    } catch {
        return null;
    }
}
