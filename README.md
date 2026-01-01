# E-Commerce Platform - Guide

## 🔐 Authentication Flow

```
1. LOGIN
   Client → Server Action (loginWithGoogle) 
   → Backend API (/api/auth/google)
   → Set httpOnly cookies (accessToken 15m, refreshToken 7d)
   → Redirect to home

2. API CALLS  
   Client → Backend API (cookies auto sent)
   → authMiddleware verify token
   → If 401 → auto refresh → retry request

3. MIDDLEWARE PROTECTION
   User navigate to /order or /checkout
   → Next.js middleware check accessToken
   → If expired → auto refresh from refreshToken
   → If refresh failed → redirect /login

4. LOGOUT
   Client → Server Action (logoutAction)
   → Delete cookies → Redirect /login
```

---

## 🚀 Deployment

### Backend (Render - api.shophub.studio)

**1. Chuẩn bị code:**

```typescript
// apps/api/src/middleware/auth.ts
export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") return next(); // ✅ Bỏ qua preflight
  // ...verify token
};

// apps/api/src/app.ts
const corsOptions = {
  origin: ["http://localhost:3000", "https://app.shophub.studio"],
  credentials: true,
};
app.use(cors(corsOptions));
```

**2. Di chuyển @types sang dependencies:**

```json
// apps/api/package.json
{
  "dependencies": {
    "@types/express": "^5.0.6",
    "@types/cors": "^2.8.19",
    "typescript": "^5.9.3"
  }
}
```

**3. Deploy Render:**
- Root Directory: `apps/api`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Add Environment Variables
- Custom Domain: `api.shophub.studio` (CNAME)

---

### Frontend (Vercel - app.shophub.studio)

**1. Cookie settings:**

```typescript
// apps/web/app/actions/auth.ts
const isProduction = process.env.NODE_ENV === "production";

cookieStore.set("accessToken", token, {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  domain: isProduction ? ".shophub.studio" : undefined,
});
```

**2. Deploy Vercel:**
- Root Directory: `apps/web`
- Environment Variables:
  ```
  NEXT_PUBLIC_API_URL=https://api.shophub.studio
  JWT_ACCESS_SECRET=your_secret
  NODE_ENV=production
  ```
- Custom Domain: `app.shophub.studio`

---

## 🔑 Security Checklist

- ✅ CORS: Chỉ cho phép `app.shophub.studio`
- ✅ Cookie: `sameSite=none`, `secure=true`, `httpOnly=true`
- ✅ Domain: `.shophub.studio` (share giữa subdomains)
- ✅ authMiddleware: Skip OPTIONS request
- ✅ All fetch: `credentials: "include"`

---

## 🐛 Common Issues

**CORS Error:**
```typescript
// Fix: Bỏ qua OPTIONS trong authMiddleware
if (req.method === "OPTIONS") return next();
```

**Cookie không gửi:**
```typescript
// Fix: Thêm credentials vào fetch
fetch(url, { credentials: "include" });
```

**TypeScript build error:**
```bash
# Fix: Di chuyển @types sang dependencies
```

---

## 📚 Tech Stack

- **Frontend**: Next.js 15 + Server Actions
- **Backend**: Express.js + TypeScript
- **Auth**: JWT + httpOnly Cookies + Google OAuth
- **Database**: MongoDB
- **Deploy**: Vercel + Render