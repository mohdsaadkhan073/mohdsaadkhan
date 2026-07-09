# Central Thrifts ⚡ Curated Streetwear & Thrift Catalog

**Central Thrifts** is a premium, Gen‑Z‑focused streetwear catalog and WhatsApp‑based inquiry store. It combines striking visual design, immersive 3‑D interactions, and a modern password‑less authentication flow.

---

## 🎯 What the App Does

- **Stunning Visuals** – Full‑screen background video, custom 3‑D jersey model (React‑Three‑Fiber), magnetic CTA buttons, and an animated custom cursor.
- **Catalog & Cart** – Client‑side filtering, sliding cart drawer, and instant WhatsApp checkout (catalog message is URL‑encoded and sent in <10 s).
- **Admin Dashboard** – Live analytics, CRUD modals for products, review approval, store‑wide settings, and a new **Customers** tab that lists every user profile with search, stats, and export tools.
- **Authentication** –
  - **Google OAuth** integration.
  - **Password‑less Email OTP** (sign‑in & sign‑up) with numeric 6‑digit codes. No password fields are shown to the user.
  - **Profile Completion Guard** – after the first successful OTP the user is prompted for name & phone number only once.
- **SEO & Performance** – `robots.txt`, `sitemap.xml`, meta tags, and a fully‑optimised production build.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | **Next.js 16.2.6** (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **3‑D / Animations** | Three.js, React‑Three‑Fiber, React‑Three‑Drei, GSAP, Framer Motion |
| **Database & Auth** | Supabase (PostgreSQL, Supabase Auth) – with a local `localStorage` fallback |
| **Icons** | Lucide‑React |
| **Notifications** | Canvas‑Confetti |
| **Build Tool** | Turbopack (Next.js) |

---

## 📦 Getting Started

### 1. Clone & Install

```bash
# Clone the repo
git clone https://github.com/your‑org/central‑thrifts.git
cd central‑thrifts

# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env.local` at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your‑supabase‑url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your‑supabase‑anon‑key
NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=your‑google‑client‑id   # optional – for Google login
```
> **Tip:** If these variables are missing the app automatically runs in **LOCAL FALLBACK MODE** using `localStorage`.

### 3. Supabase Configuration

1. **Enable Email OTP** – In the Supabase Dashboard → **Authentication → Settings** enable *Email OTP*.
2. **Set OTP Expiry & Rate Limits** – Recommended values are:
   - OTP expiry: `300` seconds (5 min)
   - Rate limit: e.g., `5` requests per hour per IP
3. **Replace Magic‑Link Templates** with numeric‑code templates (see below).
4. **Run the migration** – The consolidated migration file `supabase/migrations/Final.sql` contains the full schema (profiles, products, reviews, etc.). Apply it in Supabase SQL editor or via CLI:

```bash
supabase db push   # if using Supabase CLI
```

#### Email Template Changes (Magic‑Link → 6‑Digit Code)

**Confirm Sign‑up**
```html
<h2>Verify Your Account</h2>
<p>Your 6‑digit sign‑up verification code is:</p>
<p><strong>{{ .Token }}</strong></p>
<p>This code expires in 5 minutes. Do not share it.</p>
```

**Magic Link / OTP (Sign‑in)**
```html
<h2>Your Login Code</h2>
<p>Your 6‑digit login verification code is:</p>
<p><strong>{{ .Token }}</strong></p>
<p>This code expires in 5 minutes. Do not share it.</p>
```

### 4. Run Locally

```bash
npm run dev   # http://localhost:3000
```

### 5. Build for Production

```bash
npm run build   # Optimised production bundle
npm start       # Serve the built app
```

---

## 🔐 Authentication Flow (Password‑less)

1. **Enter Email + Password** (password is only used to verify the user exists; a short password is still required for sign‑up).
2. **OTP Sent** – Supabase sends a 6‑digit code to the email.
3. **Enter OTP** – The UI verifies the code via `verifyOtpCode`.
4. **First‑time Users** – After successful OTP verification a *Profile Completion Guard* prompts for **Full Name** and **Phone Number**. Subsequent logins skip this step.
5. **Google OAuth** – Users can also sign‑in with Google; the flow bypasses OTP.

All auth logic lives in `src/context/AuthContext.tsx` and the UI in `src/app/auth/page.tsx`.

---

## 👩‍💼 Admin Dashboard

- **Analytics Overview** – inventory count, potential revenue, active listings, and approved reviews.
- **Products Management** – create, edit, delete items; upload image URLs; manage stock.
- **Reviews Management** – approve or reject user testimonials.
- **Store Settings** – phone number for WhatsApp checkout, meta description, social handles.
- **Customers Tab** – new tab (added in this sprint) showing a searchable, paginated table of all user profiles with avatar, email, name, phone, role, and auth method.

The dashboard lives under the `/admin` route (`src/app/admin/page.tsx`).

---

## 📈 SEO & Performance

- `robots.txt` disallows crawling of `/api/*` and includes a sitemap reference.
- `sitemap.xml` is generated automatically on build.
- Meta tags (title, description, Open Graph) are set in `src/app/layout.tsx`.
- All pages use lazy‑loaded assets, compressed images, and pre‑rendered static generation where possible.

---

## 🧪 Testing & Mock Mode

If you do **not** have Supabase keys, the app runs in mock mode:
- `signUpWithPassword` & `signInWithPasswordAndOtp` simulate a user and store a mock session in `localStorage`.
- OTP codes are always `123456`.
- Profile data is persisted under the `ct_profiles` key.

This makes it easy to develop UI without a backend connection.

---

## 📂 Repository Structure (selected)

```
src/
  app/               – Next.js route handlers (home, auth, admin, etc.)
  components/        – Re‑usable UI components (Navbar, Footer, ProductCard, ...)
  context/           – AuthContext and other React contexts
  lib/               – Supabase client, dbService wrappers, types
public/
  videos/, images/   – Media assets used in the UI
.supabase/
  migrations/        – Consolidated `Final.sql` (full schema) & incremental scripts
.env.local.example   – Sample environment file
README.md            – This document
```

---

## 📜 License
MIT License – see `LICENSE` file.

---

*Built by **MOHD SAAD KHAN** of **NEXORESHA TECHNOLOGIES**.*
