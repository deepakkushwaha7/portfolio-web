# Deepak Kushwaha — Portfolio Web Application
## Full-Fledged Development Plan

**Domain:** deepakkushwaha.tech  
**Goal:** Rank #1 on Google for "Deepak Kushwaha", "AI Architect India", "mock interview AI engineer" and related terms. Showcase work, sell mock interviews, and attract hiring opportunities.

---

## 1. Vision & Design Language

### Theme
- **Pure Black & White** — no color, only contrast, depth, and texture
- Heavy typography — large, bold, editorial-style headings
- **Interactive 3D background** on hero (Three.js particle field or fluid WebGL, inspired by the references)
- Cursor-reactive elements — spotlight glow, magnetic buttons, custom cursor
- Smooth scroll with Lenis + GSAP ScrollTrigger for section reveals
- Grain/noise overlay for texture depth
- Glassmorphism cards in monochrome

### Inspiration References
- **Three.js 3D portfolio** (`threejs-3d-portfolio.vercel.app`) — particle/3D environment in hero
- **WebGL Fluid Background** (`tkabalin.github.io/WebGL-Fluid-Background`) — fluid simulation as section background for the "about" or "hire" section

---

## 2. Tech Stack

### Frontend
| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSG/ISR for SEO, RSC for performance |
| Language | **TypeScript** | Type safety |
| Styling | **Tailwind CSS v3** | Utility-first, fast |
| 3D/WebGL | **Three.js + React Three Fiber + Drei** | 3D hero, interactive scenes |
| Animations | **GSAP + ScrollTrigger** | Scroll-driven section reveals |
| Page transitions | **Framer Motion** | Smooth route transitions |
| Smooth scroll | **Lenis** | Native-feel scroll |
| CMS Client | **REST calls to Django API** | Blog posts, projects from backend |
| Forms | **React Hook Form + Zod** | Booking, contact forms |
| Payments | **PhonePe Payment Gateway** | Mock interview booking (UPI, wallets, cards) |
| SEO | **next-seo + next-sitemap** | Meta, OG, structured data |
| Analytics | **Google Analytics 4 + Vercel Analytics** | Traffic tracking |
| Icons | **Lucide React** | Clean minimal icons |
| Rich Text | **@tiptap/react** (read-only render) | Blog post renderer |
| Code Highlights | **Shiki** | Code blocks in posts |

### Backend
| Layer | Choice | Reason |
|---|---|---|
| Framework | **Django 5.x** | Robust, batteries-included |
| API | **Django REST Framework (DRF)** | Blog, bookings, projects API |
| Auth | **Django SimpleJWT** | Admin portal JWT auth |
| Admin | **Django Admin (customized with Unfold)** | Beautiful, production-ready admin UI |
| Database | **PostgreSQL** | Relational, full-text search |
| Cache | **Redis** | API response caching |
| Async Tasks | **Celery + Redis** | Email notifications, calendar invites |
| Email | **SendGrid / Amazon SES** | Booking confirmations, hire enquiries |
| Calendar | **Google Calendar API** | Auto-create mock interview slots |
| Payments | **Razorpay SDK** | Webhook verification, order management |
| Storage | **AWS S3 / Cloudflare R2** | Blog images, project thumbnails |
| Search | **PostgreSQL Full-Text Search** (→ Typesense later) | Blog search |

### DevOps & Infrastructure
| Layer | Choice |
|---|---|
| Frontend Hosting | **Vercel** (Next.js native, edge CDN) |
| Backend Hosting | **Railway / Render** (Django + Celery) |
| Database | **Supabase PostgreSQL** or **Railway Postgres** |
| Cache/Queue | **Upstash Redis** |
| CDN/Media | **Cloudflare R2 + CDN** |
| Domain | **Cloudflare DNS** for deepakkushwaha.tech |
| CI/CD | **GitHub Actions** |
| Monitoring | **Sentry** (errors) + **Uptime Robot** |

---

## 3. Information Architecture & Pages

```
deepakkushwaha.tech/
├── /                          → Home (SSG) ★ PRIMARY SEO PAGE
├── /about                     → About (SSG)
├── /work                      → Projects & Products (SSG)
├── /work/[slug]               → Single Project (SSG)
├── /blog                      → Blog listing (SSG + ISR)
├── /blog/[slug]               → Blog post (SSG + ISR)
├── /mock-interview            → Book Mock Interview (SSG + client booking)
├── /hire                      → Hire Me page (SSG)
├── /contact                   → Contact (SSG)
├── /sitemap.xml               → Auto-generated
├── /robots.txt                → Configured
│
└── /admin (Next.js admin UI)
    ├── /admin/login
    ├── /admin/dashboard
    ├── /admin/posts           → Create / Edit / Publish blog posts
    ├── /admin/projects        → Manage portfolio projects
    ├── /admin/bookings        → View mock interview bookings
    ├── /admin/availability    → Set interview availability slots
    └── /admin/hire-enquiries  → View hire enquiries
```

---

## 4. Page-by-Page Design & Features

### 4.1 Home (`/`) — THE MOST IMPORTANT PAGE
**Rendering:** Static (SSG)

**Sections:**
1. **Hero** — Full viewport. Three.js particle field (1000+ particles, purely typographic — no photo). Large bold name "DEEPAK KUSHWAHA" in display type, animated tagline typewriter. CTA buttons: "See My Work" / "Book Mock Interview". Custom animated cursor.
2. **Marquee strip** — Scrolling tech tags: RAG · LangChain · GPT-4 · Kubernetes · AWS · Python · Next.js ...
3. **Numbers** — Animated counter on scroll: 9+ Years · 20+ Products · 35+ Team Members · Millions of Users
4. **About teaser** — 2-column: editorial photo (B&W) + short bio pull quote. Link to /about.
5. **Selected Work** — 3-4 project cards with hover reveal (project name, tech tags, link). Noise texture cards.
6. **AI Skills Bento Grid** — Bento-style layout showing AI stack competencies visually.
7. **Latest Posts** — 3 latest blog posts. Clean typography cards.
8. **Mock Interview CTA** — Full-width dark section with pricing. "Book a 1:1 session with me."
9. **Testimonials** — Horizontal scroll, noise-textured cards.
10. **Hire CTA** — Minimal: "Open to the right opportunity" + contact button.
11. **Footer** — Links, social, copyright.

**SEO on this page:**
- `<h1>` Deepak Kushwaha — AI Architect & Engineering Leader
- JSON-LD: Person schema with all contact/social info
- JSON-LD: ProfessionalService schema
- OpenGraph image (custom generated OG card)
- Title: "Deepak Kushwaha | AI Architect & Engineering Leader | Bangalore"

---

### 4.2 About (`/about`)
**Rendering:** Static (SSG)

**Sections:**
1. **Full-page intro** — WebGL fluid background (reference 2), overlaid with name and bio
2. **Career Timeline** — Vertical interactive timeline, click each job to expand. Animated with GSAP.
3. **Skills Deep Dive** — Animated skill bars or radar chart (canvas). Categorized.
4. **Awards & Recognition** — Editorial-style cards.
5. **Philosophy** — Personal statement on AI, engineering, building.
6. **Education** — Clean minimal.

---

### 4.3 Work / Projects (`/work` + `/work/[slug]`)
**Rendering:** Static (SSG) — pre-generated from Django API at build time

**Features:**
- Filterable by category: AI Products · SaaS · Startups · Consulting
- Case study pages per project with: problem, solution, impact metrics, tech stack, screenshots/demo
- Parallax scrolling on project hero images
- "Live Demo" / "GitHub" / "Case Study" links

---

### 4.4 Blog (`/blog` + `/blog/[slug]`)
**Rendering:** ISR (revalidate: 3600) — updates without full rebuild

**Blog listing:**
- Search bar (client-side, hits Django full-text search)
- Tag/category filters
- Estimated read time
- Clean Medium-like typography

**Blog post:**
- Full Medium-style reading experience
- TOC (table of contents) sidebar
- Code syntax highlighting (Shiki)
- Inline images from S3
- Social share (Twitter/X, LinkedIn, copy link)
- Related posts
- Comment section (optional: Giscus via GitHub Discussions)
- Newsletter subscribe CTA at end

**SEO per post:**
- Dynamic `<title>`, `<meta description>`, OpenGraph
- Article JSON-LD schema
- Canonical URL
- Reading time in meta

---

### 4.5 Mock Interview (`/mock-interview`)
**Rendering:** Static shell, dynamic booking client-side

**Flow:**
1. **Landing** — What you get: 60-min 1:1 session, system design / DSA / AI/ML / behavioral, written feedback report
2. **Pricing** — Single flat tier: ₹499 per session (60-min 1:1 mock interview)
3. **Calendar picker** — Shows available slots (fetched from Django availability API)
4. **Booking form** — Name, email, role you're targeting, areas to focus
5. **Payment** — PhonePe payment page redirect (order created via Django API)
6. **Confirmation** — Email confirmation + Google Calendar invite auto-sent (Celery task, v1)

**Django booking model:**
- `MockInterviewBooking`: name, email, slot_datetime, session_type (always "standard_499"), payment_status, phonepe_transaction_id, merchant_order_id, notes
- `Availability`: date, time_slots (JSON), is_active

---

### 4.6 Hire Me (`/hire`)
**Rendering:** Static (SSG)

**Sections:**
1. **What I offer** — Contract/Full-time/Advisory, areas: AI Architecture, Engineering Leadership, SaaS Consulting
2. **Working with me** — Style, timezone (IST), availability status badge (available/not available, managed from admin)
3. **Enquiry form** — Company, role type, budget range, message → stored in Django + email to Deepak
4. **Download Resume** — PDF download link (hosted on S3)
5. **LinkedIn CTA**

---

### 4.7 Admin Portal (`/admin/*`)
**Rendering:** Client-side (no SSG — protected, no need to index)

**Features:**
- JWT auth (login page)
- Dashboard: stats — total posts, bookings this month, hire enquiries, page views
- **Post editor:** Rich WYSIWYG (TipTap) with image upload to S3, tags, slug, SEO fields (meta title, meta desc, OG image)
- **Project manager:** Add/edit/reorder projects, upload screenshots
- **Booking manager:** View upcoming sessions, mark as completed, add notes
- **Availability manager:** Calendar to block/open slots for mock interviews
- **Hire enquiries:** View messages, mark status (new/replied/archived)
- **Settings:** Update availability status, resume PDF, social links

---

## 5. SEO Strategy (Critical)

### Static Generation for All Public Pages
Every public page is pre-rendered at build time (`generateStaticParams` + `generateMetadata` in Next.js App Router). This means:
- HTML is fully rendered before Google crawls
- No JavaScript needed to see content
- Fastest possible LCP (Core Web Vitals)

### On-Page SEO Checklist
- [ ] Unique `<title>` on every page (format: `{Page Topic} | Deepak Kushwaha`)
- [ ] Unique `<meta name="description">` (150–160 chars, includes target keyword)
- [ ] `<h1>` appears exactly once per page
- [ ] Heading hierarchy (h1 → h2 → h3) maintained
- [ ] All images have descriptive `alt` text
- [ ] Internal linking between all major pages
- [ ] Canonical tags on all pages
- [ ] No duplicate content

### Technical SEO
- **sitemap.xml** — Auto-generated by `next-sitemap`, includes all static pages + all blog posts + all project pages. Submitted to Google Search Console.
- **robots.txt** — Allow all public pages, disallow `/admin/*`
- **Core Web Vitals:**
  - LCP < 2.5s — Hero image preloaded, fonts preloaded, SSG
  - CLS < 0.1 — All layout dimensions fixed, no layout shift
  - INP < 200ms — Minimal JS on initial load
- **Structured Data (JSON-LD):**
  - Home: `Person`, `ProfessionalService`
  - Blog posts: `Article`, `BreadcrumbList`
  - Mock Interview: `Service`, `Offer`
  - Work pages: `CreativeWork`
- **OpenGraph + Twitter Cards** on every page
- **Hreflang** — English only (en-IN)
- **Page speed** — Target 90+ PageSpeed on desktop, 80+ mobile
- **Fonts** — Self-hosted (next/font), no Google Fonts DNS lookup

### Content SEO
- Blog posts targeting long-tail keywords:
  - "how to build RAG pipeline with LangChain"
  - "system design mock interview tips for engineers India"
  - "AI architect skills 2025"
  - "Django Next.js SaaS architecture"
- Each project case study targets keywords around the product name + tech
- `/mock-interview` targets "mock interview AI engineer", "system design interview help India"
- `/hire` targets "hire AI architect India", "contract AI engineer Bangalore"

### Link Building
- LinkedIn articles linking back to blog posts
- GitHub README → portfolio link
- Guest posts / cross-posts on dev.to, Hashnode (canonical pointing to deepakkushwaha.tech)

---

## 6. Project Structure

```
portfolio-web/
├── frontend/                          # Next.js App
│   ├── app/
│   │   ├── (public)/                  # Public pages group
│   │   │   ├── page.tsx               # Home
│   │   │   ├── about/page.tsx
│   │   │   ├── work/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── mock-interview/page.tsx
│   │   │   ├── hire/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── (admin)/                   # Admin portal group
│   │   │   ├── admin/
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── posts/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── new/page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── projects/page.tsx
│   │   │   │   ├── bookings/page.tsx
│   │   │   │   ├── availability/page.tsx
│   │   │   │   └── enquiries/page.tsx
│   │   ├── api/                       # Next.js route handlers
│   │   │   ├── og/route.tsx           # Dynamic OG image generation
│   │   │   └── revalidate/route.ts    # Webhook to trigger ISR revalidation
│   │   ├── layout.tsx                 # Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── three/                     # Three.js / R3F components
│   │   │   ├── HeroScene.tsx          # Particle field hero
│   │   │   ├── FluidBackground.tsx    # WebGL fluid
│   │   │   └── FloatingGeometry.tsx   # Decorative 3D shapes
│   │   ├── ui/                        # Reusable UI components
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── MarqueeStrip.tsx
│   │   │   ├── BentoGrid.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   └── TimelineItem.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/                  # Page section components
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   └── mock-interview/
│   │   └── admin/                     # Admin-specific components
│   │       ├── PostEditor.tsx         # TipTap editor
│   │       ├── AvailabilityCalendar.tsx
│   │       └── StatsCard.tsx
│   ├── lib/
│   │   ├── api.ts                     # Django API client (typed fetch)
│   │   ├── seo.ts                     # Metadata helpers
│   │   ├── razorpay.ts                # Razorpay client utils
│   │   └── auth.ts                    # JWT token management
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   └── useBookingFlow.ts
│   ├── types/
│   │   ├── blog.ts
│   │   ├── project.ts
│   │   └── booking.ts
│   ├── public/
│   │   ├── fonts/                     # Self-hosted fonts
│   │   ├── resume.pdf
│   │   └── og-default.png
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── package.json
│
└── backend/                           # Django API
    ├── core/                          # Django project settings
    │   ├── settings/
    │   │   ├── base.py
    │   │   ├── development.py
    │   │   └── production.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── blog/                          # Blog app
    │   ├── models.py                  # Post, Tag, Category
    │   ├── views.py                   # DRF ViewSets
    │   ├── serializers.py
    │   └── admin.py
    ├── portfolio/                     # Projects app
    │   ├── models.py                  # Project, Skill
    │   ├── views.py
    │   └── serializers.py
    ├── bookings/                      # Mock interview app
    │   ├── models.py                  # Booking, Availability
    │   ├── views.py                   # create order, webhook
    │   ├── tasks.py                   # Celery: send email, calendar invite
    │   └── serializers.py
    ├── enquiries/                     # Hire/contact enquiries
    │   ├── models.py
    │   └── views.py
    ├── accounts/                      # Admin auth
    │   ├── models.py
    │   └── views.py                   # JWT login
    ├── requirements/
    │   ├── base.txt
    │   └── production.txt
    └── manage.py
```

---

## 7. Database Schema (Key Models)

### Blog
```python
# Post
- id, title, slug (unique), excerpt, body (rich text / HTML)
- cover_image (S3 URL), tags (M2M), category
- author, published_at, updated_at, is_published
- meta_title, meta_description, og_image
- read_time (auto-calculated)

# Tag
- id, name, slug

# Category  
- id, name, slug, description
```

### Portfolio
```python
# Project
- id, title, slug, tagline, description (rich text)
- cover_image, gallery (JSON array of S3 URLs)
- tech_tags (JSON), category, links (JSON: live/github/case_study)
- company, role, date_range, metrics (JSON: key impact numbers)
- is_featured, order
```

### Bookings
```python
# Availability
- id, date, time_slots (JSON: ["10:00", "11:00", "14:00"])
- is_active

# MockInterviewBooking
- id, name, email, phone
- slot_datetime, session_type (standard/deep_dive)
- focus_areas (JSON), current_role, target_role, notes
- razorpay_order_id, razorpay_payment_id
- payment_status (pending/paid/refunded)
- session_status (scheduled/completed/cancelled)
- meeting_link, created_at
```

### Enquiries
```python
# HireEnquiry
- id, name, email, company, role_type (contract/fulltime/advisory)
- budget_range, message, created_at
- status (new/replied/archived)
```

---

## 8. API Endpoints

```
# Blog
GET  /api/blog/posts/              → list (paginated, search, filter by tag)
GET  /api/blog/posts/{slug}/       → single post detail
GET  /api/blog/tags/               → all tags
POST /api/blog/posts/              → create (admin JWT required)
PATCH /api/blog/posts/{id}/        → update (admin JWT required)

# Portfolio
GET  /api/portfolio/projects/      → list all projects
GET  /api/portfolio/projects/{slug}/ → single project

# Mock Interview
GET  /api/bookings/availability/   → available slots (next 30 days)
POST /api/bookings/create-order/   → create Razorpay order
POST /api/bookings/confirm/        → confirm after payment
POST /api/bookings/razorpay-webhook/ → Razorpay webhook

# Enquiries
POST /api/enquiries/hire/          → submit hire enquiry
POST /api/enquiries/contact/       → submit contact message

# Admin
POST /api/auth/login/              → JWT token
POST /api/auth/refresh/            → refresh token
GET  /api/admin/dashboard/stats/   → booking counts, post counts
GET  /api/admin/bookings/          → all bookings (admin JWT)
PATCH /api/admin/availability/     → update availability slots
```

---

## 9. Development Phases

### Phase 1 — Foundation (Week 1–2)
- [ ] Initialize Next.js 14 project with TypeScript + Tailwind
- [ ] Initialize Django project, configure DRF, PostgreSQL, Redis
- [ ] Set up GitHub repo structure (monorepo: `/frontend` + `/backend`)
- [ ] Configure Vercel (frontend) + Railway (backend) deployments
- [ ] Set up CI/CD (GitHub Actions: lint + test on PR)
- [ ] Design system: Tailwind config (B&W palette, typography scale, spacing)
- [ ] Navbar + Footer components
- [ ] Custom cursor component

### Phase 2 — Core Interactive Pages (Week 3–4)
- [ ] **Home page** — Hero with Three.js particle scene, all sections
- [ ] **About page** — WebGL fluid background, career timeline, skills
- [ ] Framer Motion page transitions
- [ ] GSAP ScrollTrigger section reveals
- [ ] Lenis smooth scroll integration
- [ ] Animated counters, magnetic buttons, marquee strip

### Phase 3 — Portfolio & Blog (Week 5–6)
- [ ] Django: Blog models, DRF endpoints, Admin
- [ ] Django: Project models, DRF endpoints
- [ ] Next.js: Blog listing + post pages (ISR, TipTap renderer, Shiki code blocks)
- [ ] Next.js: Work/projects listing + case study pages (SSG)
- [ ] Blog search (client-side + Django full-text)
- [ ] Dynamic OG image generation (`/api/og`)

### Phase 4 — Mock Interview Booking (Week 7)
- [ ] Django: Availability + Booking models
- [ ] Django: Razorpay order creation + webhook handler
- [ ] Django: Celery tasks (confirmation email, Google Calendar invite)
- [ ] Next.js: Mock interview page, calendar slot picker, booking flow
- [ ] Razorpay frontend integration
- [ ] Booking confirmation page + email template

### Phase 5 — Hire Me + Contact (Week 8)
- [ ] Django: HireEnquiry model + endpoint
- [ ] Next.js: Hire Me page, enquiry form (React Hook Form + Zod)
- [ ] Next.js: Contact page
- [ ] Email notifications to Deepak on new enquiries (Celery + SendGrid)

### Phase 6 — Admin Portal (Week 9–10)
- [ ] JWT auth flow (login, token refresh, protected routes)
- [ ] Dashboard with live stats
- [ ] TipTap rich text editor for blog posts (with S3 image upload)
- [ ] Project manager (CRUD + reorder)
- [ ] Booking viewer + availability calendar manager
- [ ] Hire enquiry inbox
- [ ] Settings page (availability badge, resume upload)

### Phase 7 — SEO, Performance & Polish (Week 11)
- [ ] `next-sitemap` config → sitemap.xml for all pages + posts + projects
- [ ] robots.txt
- [ ] JSON-LD structured data on all pages
- [ ] `generateMetadata` on all static pages
- [ ] PageSpeed audit → hit 90+ desktop, 80+ mobile
- [ ] Self-host fonts (remove Google Fonts)
- [ ] Preload hero images + critical assets
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics 4

### Phase 8 — Launch & Post-launch (Week 12)
- [ ] Content: Write 3–5 seed blog posts targeting primary keywords
- [ ] Add all projects to admin
- [ ] Set up mock interview availability
- [ ] Domain DNS → Vercel (deepakkushwaha.tech)
- [ ] SSL certificate (automatic via Vercel/Cloudflare)
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Share on LinkedIn, Twitter/X, Hacker News (Show HN)

---

## 10. Key Technical Decisions

### Why Next.js App Router (not Pages Router)?
- `generateStaticParams` + `generateMetadata` co-located with page
- React Server Components reduce JS bundle (better LCP)
- Better streaming + suspense for progressive loading

### Why ISR for Blog (not full SSG)?
- New posts published from admin are live within 1 hour without a full redeploy
- Use `revalidatePath` webhook from Django admin on publish → immediate revalidation

### Why Django (not Node/Express)?
- Django Admin gives a production-ready admin UI out of the box
- Django ORM + migrations are robust for evolving schema
- DRF is battle-tested for REST APIs
- Celery + Django is the standard stack for async tasks (emails, calendar)

### Why Razorpay (not Stripe)?
- Indian payment methods: UPI, NetBanking, wallets
- Better success rates in India
- Also add Stripe for international clients

### Why monorepo?
- Single GitHub repo, shared types possible, easier CI/CD coordination

---

## 11. Performance Targets

| Metric | Target |
|---|---|
| PageSpeed Desktop | 90+ |
| PageSpeed Mobile | 80+ |
| LCP | < 2.5s |
| CLS | < 0.05 |
| INP | < 200ms |
| TTFB (SSG pages) | < 200ms (CDN edge) |

---

## 12. Environment Variables

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=https://api.deepakkushwaha.tech
NEXT_PUBLIC_PHONEPE_ENV=PRODUCTION
NEXT_PUBLIC_GA_ID=G-xxx
REVALIDATION_SECRET=xxx
```

### Backend (`backend/.env`)
```
SECRET_KEY=
DEBUG=False
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
PHONEPE_MERCHANT_ID=
PHONEPE_SALT_KEY=
PHONEPE_SALT_INDEX=1
PHONEPE_ENV=PRODUCTION  # or UAT for testing
SENDGRID_API_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
GOOGLE_CALENDAR_CREDENTIALS=
ALLOWED_HOSTS=api.deepakkushwaha.tech
CORS_ALLOWED_ORIGINS=https://deepakkushwaha.tech
```

---

## 13. Commands to Bootstrap

```bash
# Frontend
cd portfolio-web
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir=false --import-alias="@/*"

# Backend
cd portfolio-web
python -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers \
  djangorestframework-simplejwt django-unfold celery redis \
  razorpay boto3 sendgrid psycopg2-binary python-dotenv pillow
django-admin startproject core backend
cd backend
python manage.py startapp blog
python manage.py startapp portfolio
python manage.py startapp bookings
python manage.py startapp enquiries
python manage.py startapp accounts
```

---

## 14. Design Tokens (Tailwind Config)

```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      black: '#0a0a0a',
      white: '#f5f5f0',
      gray: {
        100: '#e8e8e3',
        200: '#d0d0ca',
        300: '#a8a8a0',
        400: '#808078',
        500: '#585850',
        600: '#383830',
        700: '#282820',
        800: '#181810',
        900: '#0f0f0a',
      }
    },
    fontFamily: {
      sans: ['var(--font-geist-sans)'],       // UI text
      serif: ['var(--font-playfair)'],          // Headings / editorial
      mono: ['var(--font-geist-mono)'],         // Code
    },
    fontSize: {
      'display': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      'headline': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
    }
  }
}
```

---

*Last updated: April 2026 | Plan by Deepak Kushwaha*
