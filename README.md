# Government School Management Portal

Production-ready monorepo scaffold for a Government School Management Portal with role-based access for **Admin, Teacher, Student, and Parent**.

## 1) Complete Project Architecture

### Tech Stack
- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS
- **Backend:** Node.js + Express 5
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (role claims)
- **Deployment:** Vercel (frontend) + Render/Railway/Fly.io (backend + Postgres)

### High-Level System Design
- `apps/frontend` handles public landing page, role-focused UI pages, dashboard analytics surface, loading and empty states.
- `apps/backend` exposes REST APIs for auth, students, attendance, announcements, results, events, gallery, admissions, feedback, and dashboard analytics.
- Prisma data layer abstracts PostgreSQL and enforces relationships + constraints.
- JWT middleware secures API routes with role authorization.

## 2) Database Schema (Prisma)

Path: `apps/backend/prisma/schema.prisma`

Core entities:
- `User` (role: ADMIN/TEACHER/STUDENT/PARENT)
- `StudentProfile`, `TeacherProfile`, `ParentProfile`
- `StudentParent` (mapping)
- `Attendance`, `Result`
- `Announcement`
- `Event`, `GalleryItem`
- `AdmissionApplication`
- `Feedback`

Key constraints:
- Unique user email
- Unique student admission number
- One attendance record per student per date (`@@unique([studentId, date])`)
- Role-driven profile ownership (`userId @unique`)

## 3) Folder Structure

```text
.
├── apps
│   ├── backend
│   │   ├── prisma
│   │   │   └── schema.prisma
│   │   ├── src
│   │   │   ├── config/env.js
│   │   │   ├── lib/prisma.js
│   │   │   ├── middleware/{auth.js,error-handler.js}
│   │   │   ├── routes/{auth.routes.js,app.routes.js,resource-factory.js}
│   │   │   ├── utils/http-error.js
│   │   │   └── server.js
│   │   └── test/auth-role.test.js
│   └── frontend
│       ├── src/app
│       │   ├── page.tsx
│       │   ├── dashboard/page.tsx
│       │   └── roles/{admin,teacher,student,parent}/page.tsx
│       ├── src/components/{navbar,stat-card,loading-skeleton,empty-state}.tsx
│       └── src/lib/constants.ts
├── .gitignore
├── package.json
└── README.md
```

## 4) Frontend + Backend Code Overview

### Frontend highlights
- Responsive, professional landing page with school profile, facilities, achievements, modules, and contact information.
- Dashboard with analytics cards and loading skeleton state.
- Separate role pages for Admin/Teacher/Student/Parent.
- Reusable UI components and Tailwind-based design system.

### Backend highlights
- `POST /api/v1/auth/register` and `POST /api/v1/auth/login`
- JWT-based `authenticate` middleware
- `authorize(...roles)` middleware for role checks
- Resource modules for:
  - Students
  - Attendance
  - Announcements
  - Results
  - Events
  - Gallery
  - Admissions
  - Feedback
- `GET /api/v1/dashboard/analytics` for aggregate metrics
- Centralized error handling and zod validation

## 5) API Documentation

Base URL: `http://localhost:4000/api/v1`

### Health
- `GET /health`

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Protected Resources (JWT token required)
- `GET|POST /students`
- `GET|POST /attendance`
- `GET|POST /announcements`
- `GET|POST /results`
- `GET|POST /events`
- `GET|POST /gallery`
- `GET|POST /admissions`
- `GET|POST /feedback`
- `GET /dashboard/analytics`

### Example Login Response
```json
{
  "token": "<jwt>",
  "user": {
    "id": "uuid",
    "fullName": "Admin User",
    "email": "admin@govschool.example",
    "role": "ADMIN"
  }
}
```

## 6) Deployment Instructions

## Prerequisites
- Node.js 20+
- PostgreSQL 15+

### Local setup
```bash
cd .

# backend env
cp apps/backend/.env.example apps/backend/.env
# update DATABASE_URL + JWT_SECRET in apps/backend/.env

# install dependencies
npm install --workspace apps/frontend
npm install --workspace apps/backend

# prisma client + migrations
cd apps/backend
npx prisma generate
npx prisma migrate dev --name init

# run backend
npm run dev

# run frontend (separate terminal)
cd .
npm run dev
```

### Production
- Deploy frontend (`apps/frontend`) to **Vercel**.
- Deploy backend (`apps/backend`) to **Render/Railway/Fly.io**.
- Provision managed PostgreSQL.
- Set environment variables:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `PORT`

## Security and Production Notes
- Helmet enabled for secure HTTP headers
- Input validation with zod
- JWT role-based authorization
- Structured error handling
- `.env` and secrets excluded via `.gitignore`

---
This repository now contains a scalable baseline architecture ready for extending into a full production deployment for government schools.
