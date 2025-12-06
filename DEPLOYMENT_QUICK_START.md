# DEPLOYMENT QUICK START — ELEVATE

**Goal**: Get Elevate running in production in the fastest way possible.

---

## 🚀 QUICK START (30 minutes)

### Step 1: Generate Secrets (2 minutes)

```bash
node scripts/generate-secrets.js
```

Copy the generated secrets to your `.env.production` file.

---

### Step 2: Update GitHub Workflows (5 minutes)

**File**: `.github/workflows/publish-docker-image.yml`
- Line 14: Update `IMAGE: your-org/elevate` → `IMAGE: your-actual-org/elevate`
- Line 196: Update `url: "https://github.com/your-org/elevate"` → Your actual repo URL

**File**: `.github/workflows/sync-crowdin-translations.yml`
- Line 12: Update `if: github.repository == 'your-org/elevate'` → Your actual repo name

---

### Step 3: Create Production .env (10 minutes)

1. Copy the example:
   ```bash
   cp .env.production.example .env.production
   ```

2. Edit `.env.production` and fill in:
   - `PUBLIC_URL` - Your production domain
   - `DATABASE_URL` - PostgreSQL connection string
   - `SMTP_URL` - Email service URL
   - `STORAGE_*` - Storage credentials
   - `CHROME_URL` - Browserless service URL
   - All secrets (from Step 1)

---

### Step 4: Set Up Infrastructure (10 minutes)

**Option A: Docker Compose (Easiest)**

```bash
# Start all services
docker compose -f tools/compose/simple.yml --env-file .env.production up -d

# Run migrations
docker compose exec app pnpm prisma:migrate deploy
```

**Option B: Manual Setup**

1. **PostgreSQL**: Create database and update `DATABASE_URL`
2. **Minio**: Deploy and configure storage
3. **Browserless**: Deploy for PDF generation

---

### Step 5: Deploy (5 minutes)

```bash
# Build Docker image
docker build -t elevate:latest .

# Or use docker-compose
docker compose -f tools/compose/simple.yml --env-file .env.production up -d
```

---

## ✅ VERIFICATION

1. **Health Check**:
   ```bash
   curl https://yourdomain.com/api/health
   ```

2. **Test Authentication**:
   - Visit `https://yourdomain.com`
   - Register a new account
   - Login

3. **Test Resume Builder**:
   - Create a new resume
   - Fill in some data
   - Export PDF

---

## 📋 FULL CHECKLIST

See `PRODUCTION_SETUP_CHECKLIST.md` for the complete detailed checklist.

---

## 🆘 TROUBLESHOOTING

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database is accessible from server
- Ensure migrations are run: `pnpm prisma:migrate deploy`

### Storage Issues
- Verify storage credentials
- Check bucket exists and is accessible
- Test with: `curl https://storage.yourdomain.com/pictures/test.jpg`

### PDF Generation Issues
- Verify Browserless is running
- Check `CHROME_URL` and `CHROME_TOKEN`
- Test Browserless directly: `curl http://browserless:3000/version`

### Email Issues
- Verify SMTP credentials
- Test SMTP connection
- Check spam folder for test emails

---

## 📚 NEXT STEPS

After deployment:
1. Set up monitoring (optional)
2. Configure backups (database, storage)
3. Set up SSL certificates (HTTPS)
4. Configure CDN (optional, for performance)

---

**Status**: Ready to deploy! 🚀

