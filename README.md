# E-Commerce Platform - Authentication Guide

## 🔐 Authentication Architecture

Dự án này sử dụng **Hybrid Authentication Approach** kết hợp:
- **Server Actions** cho các thao tác nhạy cảm (login/logout)
- **Direct API calls** cho các thao tác thường (checkout, orders)
- **httpOnly Cookies** để lưu trữ tokens an toàn

---

## 📊 Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Login (Google OAuth)                                     │
│     Client → Server Action → Backend API                     │
│     ├─ Server Action gọi /api/auth/google                    │
│     ├─ Backend verify Google token                           │
│     ├─ Backend tạo accessToken (15m) + refreshToken (7d)     │
│     ├─ Backend trả về tokens + user                          │
│     └─ Server Action set httpOnly cookies                    │
│                                                               │
│  2. API Calls (Checkout, Orders)                             │
│     Client → Backend API (Direct)                            │
│     ├─ Cookie tự động gửi lên với mọi request                │
│     ├─ Backend middleware verify accessToken                 │
│     ├─ Nếu 401 → Client gọi refreshAccessToken()             │
│     └─ Retry request với token mới                           │
│                                                               │
│  3. Middleware Protection                                    │
│     Next.js Middleware                                       │
│     ├─ Check accessToken trong cookie                        │
│     ├─ Nếu hết hạn → auto refresh từ refreshToken            │
│     ├─ Nếu refresh thành công → tiếp tục request             │
│     └─ Nếu refresh thất bại → redirect /login                │
│                                                               │
│  4. Logout                                                   │
│     Client → Server Action                                   │
│     └─ Xóa accessToken + refreshToken cookies                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Tech Stack

### Frontend (Next.js 15)
- **Framework**: Next.js 15 (App Router)
- **Auth**: Server Actions + httpOnly Cookies
- **State Management**: Zustand (chỉ lưu user info, không lưu token)
- **OAuth**: `@react-oauth/google`

### Backend (Express)
- **Framework**: Express.js
- **JWT**: jsonwebtoken
- **OAuth**: google-auth-library
- **Database**: MongoDB + Mongoose

---

## 📁 Project Structure

```
apps/
├── web/                          # Next.js Frontend
│   ├── app/
│   │   ├── actions/
│   │   │   └── auth.ts          # ✅ Server Actions (login/logout)
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   └── order/
│   │       └── page.tsx         # Protected page
│   ├── components/
│   │   └── GoogleLoginButton.tsx
│   ├── lib/
│   │   └── api.ts               # ✅ Direct API calls
│   ├── store/
│   │   └── authStore.ts         # Zustand store (user only)
│   └── middleware.ts            # ✅ Route protection
│
└── api/                          # Express Backend
    ├── src/
    │   ├── controller/
    │   │   └── auth.controller.ts    # ✅ Auth logic
    │   ├── middleware/
    │   │   └── auth.ts              # ✅ JWT verification
    │   ├── routes/
    │   │   └── auth.routes.ts       # Auth endpoints
    │   └── index.ts                 # Server setup
    └── .env
```

---

## 🔧 Setup Guide

### 1. Backend Setup

#### Install dependencies
```bash
cd apps/api
npm install express mongoose jsonwebtoken google-auth-library cors cookie-parser
npm install -D @types/express @types/jsonwebtoken @types/cors @types/cookie-parser
```

#### Environment variables
```env
# apps/api/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

#### CORS Configuration
```typescript
// apps/api/src/index.ts
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // ✅ Quan trọng: cho phép cookie
}));

app.use(express.json());
app.use(cookieParser()); // ✅ Parse cookies
```

#### Auth Controller
```typescript
// apps/api/src/controller/auth.controller.ts
export const authController = async (req: Request, res: Response) => {
  // 1. Verify Google token
  // 2. Find or create user
  // 3. Generate accessToken (15m) + refreshToken (7d)
  // 4. Return tokens + user (KHÔNG set cookie ở đây)
  
  return res.json({ 
    accessToken, 
    refreshToken, 
    user 
  });
};

export const refreshTokenController = async (req: Request, res: Response) => {
  // 1. Verify refreshToken
  // 2. Generate new accessToken
  // 3. Return new accessToken
};
```

#### Auth Middleware
```typescript
// apps/api/src/middleware/auth.ts
export const authMiddleware = (req, res, next) => {
  // 1. Lấy token từ cookie (priority 1)
  // 2. Fallback sang Authorization header (priority 2)
  // 3. Verify JWT
  // 4. Attach user vào req.user
  // 5. Call next()
};
```

#### Routes
```typescript
// apps/api/src/routes/auth.routes.ts
router.post("/google", authController);
router.post("/refresh", refreshTokenController);

// apps/api/src/routes/order.routes.ts
router.get("/", authMiddleware, getOrdersController); // ✅ Protected
```

---

### 2. Frontend Setup

#### Install dependencies
```bash
cd apps/web
npm install @react-oauth/google zustand jose
```

#### Environment variables
```env
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

#### Server Actions
```typescript
// apps/web/app/actions/auth.ts
"use server";

import { cookies } from "next/headers";

export async function loginWithGoogle(token: string) {
  // 1. Call backend API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
    method: "POST",
    body: JSON.stringify({ token }),
  });

  const { accessToken, refreshToken, user } = await res.json();

  // 2. Set httpOnly cookies
  const cookieStore = await cookies();
  
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60, // 15 minutes
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  // 3. Return user info (KHÔNG trả token)
  return { user };
}

export async function refreshAccessToken() {
  // 1. Lấy refreshToken từ cookie
  // 2. Call backend /api/auth/refresh
  // 3. Set accessToken mới
  // 4. Return success
}

export async function logoutAction() {
  // Xóa cả 2 cookies
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
```

#### API Client
```typescript
// apps/web/lib/api.ts
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    credentials: "include", // ✅ Gửi cookie tự động
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  let res = await fetch(url, defaultOptions);

  // Auto-refresh on 401
  if (res.status === 401) {
    try {
      await refreshAccessToken();
      res = await fetch(url, defaultOptions); // Retry
    } catch (error) {
      window.location.href = "/login";
      throw error;
    }
  }

  return res;
}

export async function checkout(items: CartItem[]) {
  // Direct call - cookie tự động gửi
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
    method: "POST",
    body: JSON.stringify({ items }),
  });
}
```

#### Middleware
```typescript
// apps/web/middleware.ts
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const protectedPaths = ["/order", "/checkout"];
  const isProtected = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // No tokens → redirect login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verify accessToken
  if (accessToken) {
    try {
      await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET!));
      return NextResponse.next();
    } catch {}
  }

  // Auto-refresh
  if (refreshToken) {
    try {
      const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const { accessToken: newAccessToken } = await refreshRes.json();
        const response = NextResponse.next();
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 15 * 60,
        });
        return response;
      }
    } catch {}
  }

  // Refresh failed → clear cookies and redirect
  const response = NextResponse.redirect(new URL("/login", req.url));
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}

export const config = {
  matcher: ["/order/:path*", "/checkout/:path*"],
};
```

#### Components
```typescript
// apps/web/components/GoogleLoginButton.tsx
"use client";

import { loginWithGoogle } from "@/app/actions/auth";

export default function GoogleLoginButton() {
  const handleSuccess = async (credentialResponse: any) => {
    const { user } = await loginWithGoogle(credentialResponse.credential);
    // User đã được lưu vào cookie, chỉ cần update UI
    login(user);
    router.push("/");
  };

  return <GoogleLogin onSuccess={handleSuccess} />;
}
```

---

## 🔑 Token Management

### Access Token
- **Thời gian sống**: 15 phút
- **Lưu trữ**: httpOnly cookie
- **Mục đích**: Xác thực API requests
- **Refresh**: Tự động qua middleware hoặc client retry

### Refresh Token
- **Thời gian sống**: 7 ngày
- **Lưu trữ**: httpOnly cookie
- **Mục đích**: Lấy access token mới
- **Security**: Chỉ dùng cho endpoint /api/auth/refresh

---

## 🛡️ Security Features

### ✅ httpOnly Cookies
- Token không thể truy cập từ JavaScript
- Tránh XSS attacks

### ✅ SameSite=Lax
- Tránh CSRF attacks
- Cookie chỉ gửi với same-site requests

### ✅ Secure Flag (Production)
- Cookie chỉ gửi qua HTTPS
- Tránh man-in-the-middle

### ✅ Token Expiration
- Access token ngắn hạn (15m)
- Giảm thiểu rủi ro nếu bị đánh cắp

### ✅ Dual-layer Protection
- Next.js middleware: UI protection
- Backend middleware: Data protection

### ✅ Cookie vs Header Priority
```
Priority 1: Cookie (web browser)
Priority 2: Authorization header (mobile/API)
```

---

## 🧪 Testing

### Test Login Flow
```bash
# 1. Start backend
cd apps/api
npm run dev

# 2. Start frontend
cd apps/web
npm run dev

# 3. Open browser
http://localhost:3000/login

# 4. Click "Sign in with Google"

# 5. Check browser cookies (DevTools → Application → Cookies)
# Should see:
# - accessToken (httpOnly)
# - refreshToken (httpOnly)

# 6. Try accessing protected route
http://localhost:3000/order
```

### Test API with Postman
```bash
# Login
POST http://localhost:5000/api/auth/google
Body: { "token": "google_jwt_token" }

# Copy accessToken from response

# Call protected endpoint
GET http://localhost:5000/api/orders
Headers: Authorization: Bearer <accessToken>
```

### Test Token Refresh
```bash
# Wait 15 minutes or manually expire token

# Navigate to protected page
http://localhost:3000/order

# Check Network tab
# Should see:
# 1. GET /order → 401
# 2. POST /api/auth/refresh → 200
# 3. GET /order → 200 (retry with new token)
```

---

## 🐛 Common Issues

### Issue 1: CORS Error
```
Access-Control-Allow-Origin error
```

**Fix**: 
```typescript
// Backend
app.use(cors({
  origin: "http://localhost:3000", // ✅ NOT "*"
  credentials: true,
}));
```

### Issue 2: Cookie not sent
```
Backend không nhận được cookie
```

**Fix**:
```typescript
// Frontend
fetch(url, {
  credentials: "include", // ✅ Phải có dòng này
});
```

### Issue 3: JWT verification failed
```
Invalid token or Token expired
```

**Fix**: Kiểm tra JWT_SECRET phải giống nhau giữa BE và FE middleware

### Issue 4: Middleware không chạy
```
Protected route vẫn truy cập được khi chưa login
```

**Fix**: 
- File phải tên `middleware.ts` (không phải `proxy.ts`)
- Đặt ở root của `apps/web/` (cùng cấp với `app/`)
- Restart dev server

---

## 📚 References

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## 👥 Contributors

- Your Name - Initial implementation

## 📝 License

MIT