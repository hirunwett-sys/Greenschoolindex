# คู่มือ API: Register via Redirect

**Endpoint:** `GET /api/auth/register-redirect`

---

## ทำอะไร?

ให้เว็บภายนอกสามารถส่งผู้ใช้มาสมัครสมาชิก GSI และ login โดยอัตโนมัติ  
เมื่อผู้ใช้กดปุ่มที่เว็บภายนอก → เว็บนั้นสร้าง token แล้ว redirect มาที่ endpoint นี้  
ระบบ GSI จะสมัครสมาชิก (ถ้ายังไม่มี) หรือ login (ถ้ามีแล้ว) แล้ว redirect ต่อไปยังหน้าที่กำหนด

---

## ขั้นตอนการตั้งค่า (GSI Admin)

### 1. เพิ่ม environment variable ใน `.env`

```env
REDIRECT_JWT_SECRET=ใส่_secret_ที่ยากเดา_อย่างน้อย_32_ตัวอักษร
```

> **สำคัญ:** secret นี้ต้องเหมือนกันทั้ง GSI และเว็บภายนอก  
> ตัวอย่าง: `REDIRECT_JWT_SECRET=gsi-ext-secret-k9x2mQ7pLvR3nYwZ8jA5bT6dU1sE4hN0`

---

## วิธีใช้งาน (สำหรับเว็บภายนอก)

### Flow

```
[เว็บภายนอก] → สร้าง JWT token → redirect ไป GSI → GSI สมัคร/login → redirect ไปหน้าที่ต้องการ
```

### Format ของ URL

```
https://your-gsi-domain.com/api/auth/register-redirect?token=<JWT_TOKEN>&redirect=/my-submissions
```

| Query Parameter | จำเป็น | คำอธิบาย |
|---|---|---|
| `token` | ใช่ | JWT ที่ sign ด้วย `REDIRECT_JWT_SECRET` |
| `redirect` | ไม่จำเป็น | หน้าที่จะ redirect หลัง login สำเร็จ (default: `/my-submissions`) |

---

## วิธีสร้าง Token (เว็บภายนอก)

Token ต้อง sign ด้วย algorithm `HS256` และมีข้อมูลดังนี้:

| Field | ประเภท | คำอธิบาย |
|---|---|---|
| `name` | string | ชื่อผู้ใช้ |
| `email` | string | อีเมล (ใช้เป็น unique key) |
| `password` | string | รหัสผ่าน (อย่างน้อย 6 ตัวอักษร) |
| `exp` | number | วันหมดอายุ (แนะนำ: 10 นาที) |

---

### ตัวอย่างโค้ด Node.js / JavaScript

```javascript
import { SignJWT } from 'jose';

const SECRET = new TextEncoder().encode('ใส่ REDIRECT_JWT_SECRET เดียวกับที่ตั้งใน GSI');

async function createRedirectToken(name, email, password) {
    const token = await new SignJWT({ name, email, password })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('10m')  // หมดอายุใน 10 นาที
        .sign(SECRET);

    return token;
}

// ตัวอย่างการใช้งาน
const token = await createRedirectToken('สมชาย ใจดี', 'somchai@example.com', 'password123');
const gsiUrl = `https://gsi.example.com/api/auth/register-redirect?token=${token}&redirect=/my-submissions`;

// redirect ผู้ใช้ไปที่ gsiUrl
window.location.href = gsiUrl;
```

---

### ตัวอย่างโค้ด Python

```python
import jwt  # pip install PyJWT
import time

SECRET = 'ใส่ REDIRECT_JWT_SECRET เดียวกับที่ตั้งใน GSI'

def create_redirect_token(name: str, email: str, password: str) -> str:
    payload = {
        'name': name,
        'email': email,
        'password': password,
        'iat': int(time.time()),
        'exp': int(time.time()) + 600,  # หมดอายุใน 10 นาที
    }
    return jwt.encode(payload, SECRET, algorithm='HS256')

token = create_redirect_token('สมชาย ใจดี', 'somchai@example.com', 'password123')
gsi_url = f'https://gsi.example.com/api/auth/register-redirect?token={token}&redirect=/my-submissions'

# redirect ผู้ใช้
```

---

### ตัวอย่างโค้ด PHP

```php
// ต้องติดตั้ง: composer require firebase/php-jwt
use Firebase\JWT\JWT;

$secret = 'ใส่ REDIRECT_JWT_SECRET เดียวกับที่ตั้งใน GSI';

$payload = [
    'name'     => 'สมชาย ใจดี',
    'email'    => 'somchai@example.com',
    'password' => 'password123',
    'iat'      => time(),
    'exp'      => time() + 600, // หมดอายุใน 10 นาที
];

$token = JWT::encode($payload, $secret, 'HS256');
$gsiUrl = 'https://gsi.example.com/api/auth/register-redirect?token=' . $token . '&redirect=/my-submissions';

// redirect ผู้ใช้
header('Location: ' . $gsiUrl);
```

---

## Logic ของ API

```
รับ token
    ↓
ตรวจสอบ REDIRECT_JWT_SECRET ตั้งค่าไว้หรือยัง?
    ↓ ใช่
ถอดรหัส JWT → ได้ name, email, password
    ↓
ค้นหา email ในฐานข้อมูล
    ↓
 ┌─ ไม่มี → สมัครสมาชิกใหม่ → login อัตโนมัติ
 └─ มีแล้ว → ตรวจสอบ password → login อัตโนมัติ
    ↓
Set cookie user_token (7 วัน)
    ↓
Redirect ไปที่ ?redirect=... (default: /my-submissions)
```

---

## Error Cases (กรณีที่เกิดข้อผิดพลาด)

| กรณี | ระบบจะทำอะไร |
|---|---|
| ไม่ได้ตั้งค่า `REDIRECT_JWT_SECRET` | ตอบ HTTP 503 |
| ไม่มี `token` ใน URL | redirect ไป `/register?error=missing_token` |
| token หมดอายุ หรือ signature ผิด | redirect ไป `/register?error=invalid_token` |
| ข้อมูลใน token ไม่ครบ | redirect ไป `/register?error=incomplete_data` |
| มีบัญชีอยู่แล้ว + password ไม่ตรง | redirect ไป `/login?error=account_exists` |
| `redirect` ไม่ได้ขึ้นต้นด้วย `/` (open redirect) | redirect ไป `/login?error=invalid_redirect` |
| ข้อผิดพลาดอื่นๆ | redirect ไป `/register?error=server_error` |

---

## ข้อควรระวัง

1. **REDIRECT_JWT_SECRET** ต้องเก็บเป็นความลับ ห้ามใส่ใน frontend หรือ source code ที่สาธารณะ
2. Token ควรตั้ง expiry ไม่นานเกิน **10–15 นาที** เพื่อความปลอดภัย
3. ระบบรองรับเฉพาะ `redirect` ที่เป็น **relative path** (ขึ้นต้นด้วย `/`) เท่านั้น ป้องกัน open redirect
4. ถ้าผู้ใช้มีบัญชีใน GSI อยู่แล้วและ password ไม่ตรง ระบบจะ **ไม่** login ให้ แต่จะส่งไปหน้า login แทน
