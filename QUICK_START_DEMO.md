# 🚀 QUICK START - LOCAL DEMO FOR MENTOR

**Get Elevate running locally in 5 minutes for your mentor demo!**

---

## ✅ STEP 1: Start Docker Services (2 minutes)

Make sure **Docker Desktop is running**, then:

```bash
docker compose -f docker-compose.local.yml up -d
```

This will:
- ✅ Pull required images (PostgreSQL, Minio, Browserless)
- ✅ Build your Elevate app
- ✅ Start all services
- ✅ Set up database
- ✅ Configure storage

**Wait 60-90 seconds** for everything to start.

---

## ✅ STEP 2: Check Status (30 seconds)

```bash
docker compose -f docker-compose.local.yml ps
```

All services should show "healthy" or "running".

---

## ✅ STEP 3: Access Your App (10 seconds)

**Open your browser:**
- **Elevate App**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

**That's it!** 🎉

---

## 🎯 WHAT'S INCLUDED

### **Services:**
- ✅ **PostgreSQL** - Database (ready to use)
- ✅ **Minio** - File storage (http://localhost:9001)
- ✅ **Browserless** - PDF generation (ready)
- ✅ **Elevate** - Your app (http://localhost:3000)

### **Pre-configured:**
- ✅ All secrets generated
- ✅ Database connected
- ✅ Storage configured
- ✅ PDF generation ready
- ✅ No email setup needed (optional)

---

## 🧪 TESTING FOR DEMO

### **1. Health Check**
Visit: http://localhost:3000/api/health

Should show all services "up".

### **2. Create Account**
1. Go to http://localhost:3000
2. Click "Get Started" or "Sign up"
3. Create a test account
4. Start building!

### **3. Demo Features**
- ✅ Create resume
- ✅ Edit all sections
- ✅ Switch templates (17 available)
- ✅ Export PDF
- ✅ Share public link

---

## 🛠️ TROUBLESHOOTING

### **Services won't start?**
```bash
# Check logs
docker compose -f docker-compose.local.yml logs

# Restart
docker compose -f docker-compose.local.yml restart
```

### **Port already in use?**
Edit `docker-compose.local.yml` and change ports:
- App: `3000` → `3003`
- PostgreSQL: `5432` → `5433`
- Minio: `9000` → `9002`, `9001` → `9003`

### **App not loading?**
1. Wait 60 seconds after starting
2. Check: http://localhost:3000/api/health
3. Check logs: `docker compose -f docker-compose.local.yml logs app`

---

## 🛑 STOP SERVICES

```bash
# Stop all
docker compose -f docker-compose.local.yml down

# Stop and clean (removes data)
docker compose -f docker-compose.local.yml down -v
```

---

## 📊 QUICK REFERENCE

| Service | URL | Login |
|---------|-----|-------|
| **Elevate** | http://localhost:3000 | Create account |
| **Minio Console** | http://localhost:9001 | minioadmin / minioadmin123 |
| **Health** | http://localhost:3000/api/health | - |

---

## 🎯 READY FOR DEMO!

**One command:**
```bash
docker compose -f docker-compose.local.yml up -d
```

**Then visit:** http://localhost:3000

**Perfect for mentor review!** ✅

