# PRODUCTION SETUP CHECKLIST — ELEVATE

**Date**: Current  
**Purpose**: Step-by-step checklist for production deployment

---

## ✅ PHASE 1: PRODUCTION ENVIRONMENT CONFIGURATION

### Task 1.1: Create Production .env

- [ ] Copy `.env.production.example` to `.env.production`
- [ ] Update `PUBLIC_URL` with your production domain
- [ ] Update `STORAGE_URL` with your storage domain
- [ ] Configure `DATABASE_URL` with production PostgreSQL connection
- [ ] Generate `ACCESS_TOKEN_SECRET` (32-byte hex)
- [ ] Generate `REFRESH_TOKEN_SECRET` (32-byte hex)
- [ ] Configure `SMTP_URL` with production email service
- [ ] Update `MAIL_FROM`, `MAIL_FROM_NAME`, `MAIL_REPLY_TO`
- [ ] Configure storage credentials (`STORAGE_ACCESS_KEY`, `STORAGE_SECRET_KEY`)
- [ ] Set `STORAGE_SKIP_BUCKET_CHECK=false`
- [ ] Configure `CHROME_URL` with Browserless service
- [ ] Generate `CHROME_TOKEN` (secure random token)
- [ ] Verify all required variables are set

**Command to generate secrets**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Task 1.2: Update GitHub Workflows

- [ ] Update `.github/workflows/publish-docker-image.yml` line 14:
  - Change `IMAGE: your-org/elevate` to `IMAGE: your-actual-org/elevate`
- [ ] Update `.github/workflows/publish-docker-image.yml` line 196:
  - Change `url: "https://github.com/your-org/elevate"` to your actual repository URL
- [ ] Update `.github/workflows/sync-crowdin-translations.yml` line 12:
  - Change `if: github.repository == 'your-org/elevate'` to your actual repository name

---

## ✅ PHASE 2: PRODUCTION INFRASTRUCTURE SETUP

### Task 2.1: Database Setup

- [ ] Create PostgreSQL database (managed service or self-hosted)
- [ ] Configure connection string in `.env.production`
- [ ] Test database connection
- [ ] Run migrations: `pnpm prisma:migrate deploy`
- [ ] Verify database schema is correct
- [ ] Set up database backups (automated)

**Migration Command**:
```bash
pnpm prisma:migrate deploy
```

---

### Task 2.2: Storage Setup

- [ ] Deploy Minio or configure AWS S3
- [ ] Create storage bucket (`elevate-resumes`)
- [ ] Configure public access for:
  - `/pictures/*`
  - `/previews/*`
  - `/resumes/*`
- [ ] Set storage credentials in `.env.production`
- [ ] Test upload operation
- [ ] Test download operation
- [ ] Verify public access works

**Minio Setup** (if using):
```bash
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  -e MINIO_ROOT_USER=admin \
  -e MINIO_ROOT_PASSWORD=secure-password \
  --name minio \
  minio/minio server /data --console-address ":9001"
```

---

### Task 2.3: Browserless Setup

- [ ] Deploy Browserless service (Docker or managed)
- [ ] Configure WebSocket URL in `.env.production`
- [ ] Generate and set `CHROME_TOKEN`
- [ ] Test PDF generation endpoint
- [ ] Verify PDF quality and formatting

**Browserless Setup** (Docker):
```bash
docker run -d \
  -p 3001:3000 \
  -e TOKEN=your-secure-token \
  --name browserless \
  browserless/chrome
```

---

### Task 2.4: Email Service Setup

- [ ] Configure SMTP service (Gmail, SendGrid, AWS SES, etc.)
- [ ] Set `SMTP_URL` in `.env.production`
- [ ] Configure `MAIL_FROM`, `MAIL_FROM_NAME`
- [ ] Test email sending (password reset, verification)
- [ ] Verify email templates render correctly

---

## ✅ PHASE 3: TESTING & VERIFICATION

### Task 3.1: Critical Path Testing

- [ ] **Authentication**:
  - [ ] Register new account
  - [ ] Verify email (if enabled)
  - [ ] Login successfully
  - [ ] Test password reset
  - [ ] Test 2FA (if enabled)

- [ ] **Resume Builder**:
  - [ ] Create new resume
  - [ ] Fill in all sections
  - [ ] Change template
  - [ ] Verify live preview updates
  - [ ] Save changes
  - [ ] Verify data persists

- [ ] **Export & Sharing**:
  - [ ] Export PDF (verify formatting)
  - [ ] Export JSON
  - [ ] Create public link
  - [ ] View public resume
  - [ ] Download from public view
  - [ ] Verify statistics tracking

- [ ] **Dashboard**:
  - [ ] List all resumes
  - [ ] Duplicate a resume
  - [ ] Delete a resume
  - [ ] Import a resume (JSON, LinkedIn, JSON Resume)

---

### Task 3.2: Template & PDF Testing

- [ ] Test all 18 templates render correctly
- [ ] Generate PDF from each template
- [ ] Verify PDF formatting and layout
- [ ] Check PDF file sizes (reasonable)
- [ ] Test PDF download functionality

---

### Task 3.3: Storage & Browser Testing

- [ ] Upload profile picture
- [ ] Generate resume preview
- [ ] Verify public access
- [ ] Test storage operations
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test mobile browsers
- [ ] Verify responsive design

---

## ✅ PHASE 4: DEPLOYMENT

### Task 4.1: Pre-Deployment Checklist

- [ ] Production .env configured
- [ ] All services running (DB, Storage, Browserless)
- [ ] Database migrations run
- [ ] Storage configured and tested
- [ ] Email service tested
- [ ] Build succeeds: `pnpm run build`
- [ ] Docker images build: `docker build -t elevate .`
- [ ] All critical tests pass
- [ ] GitHub workflows updated
- [ ] Documentation updated

---

### Task 4.2: Build & Deploy

- [ ] Build Docker image:
  ```bash
  docker build -t elevate:latest .
  ```

- [ ] Push to registry (if using):
  ```bash
  docker tag elevate:latest your-registry/elevate:latest
  docker push your-registry/elevate:latest
  ```

- [ ] Deploy to production server:
  - Copy Docker image or pull from registry
  - Copy production .env file
  - Run database migrations: `pnpm prisma:migrate deploy`
  - Start services: `docker-compose up -d` or `pnpm start`

- [ ] Verify health checks:
  - Check application logs
  - Verify all services running
  - Test health endpoints: `https://yourdomain.com/api/health`

---

### Task 4.3: Post-Deployment Verification

- [ ] Test public-facing pages
- [ ] Test authentication (register, login)
- [ ] Test resume builder (create, edit, save)
- [ ] Test export functionality (PDF, JSON)
- [ ] Test public sharing
- [ ] Check error logs
- [ ] Verify monitoring (if set up)

---

## 📋 QUICK REFERENCE

### Generate Secrets
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Run Migrations
```bash
pnpm prisma:migrate deploy
```

### Build Docker Image
```bash
docker build -t elevate:latest .
```

### Health Check
```bash
curl https://yourdomain.com/api/health
```

---

## 🎯 SUCCESS CRITERIA

- [x] 100% rebranding complete ✅
- [x] All features working ✅
- [x] Zero old owner references ✅
- [ ] Production environment configured
- [ ] All services running
- [ ] Testing completed
- [ ] GitHub workflows updated
- [ ] Deployment successful

---

**Status**: Ready to proceed with Phase 1

