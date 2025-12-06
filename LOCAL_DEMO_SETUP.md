# 🚀 LOCAL DEMO SETUP - ELEVATE

**Quick setup for mentor demo and local development**

---

## ✅ PREREQUISITES

- **Docker Desktop** installed and running
- **Git** (optional, for cloning)

---

## 🎯 QUICK START (5 minutes)

### **Step 1: Start Docker Services**

```bash
docker compose -f docker-compose.local.yml up -d
```

This starts:
- ✅ PostgreSQL database (port 5432)
- ✅ Minio storage (ports 9000, 9001)
- ✅ Browserless Chrome (port 3001)
- ✅ Elevate app (port 3000)

**Wait 30-60 seconds** for all services to start.

---

### **Step 2: Check Services Status**

```bash
docker compose -f docker-compose.local.yml ps
```

All services should show "healthy" or "running".

---

### **Step 3: Access the Application**

- **Frontend**: http://localhost:3000
- **Minio Console**: http://localhost:9001 (login: minioadmin / minioadmin123)
- **Health Check**: http://localhost:3000/api/health

---

## 📋 WHAT'S INCLUDED

### **Services Running:**
- ✅ **PostgreSQL** - Database (elevate/elevate123)
- ✅ **Minio** - File storage (minioadmin/minioadmin123)
- ✅ **Browserless** - PDF generation
- ✅ **Elevate App** - Your application

### **Pre-configured:**
- ✅ All secrets generated and set
- ✅ Database connection configured
- ✅ Storage configured
- ✅ Chrome/PDF generation ready
- ✅ No email setup needed (optional)

---

## 🧪 TESTING THE DEMO

### **1. Health Check**
Visit: http://localhost:3000/api/health

Should show:
```json
{
  "status": "ok",
  "database": "up",
  "storage": "up",
  "chrome": "up"
}
```

### **2. Create Account**
1. Go to http://localhost:3000
2. Click "Sign up" or "Get Started"
3. Create a test account
4. Start building a resume!

### **3. Test Features**
- ✅ Create resume
- ✅ Edit sections
- ✅ Change templates
- ✅ Export PDF
- ✅ Share link

---

## 🛠️ TROUBLESHOOTING

### **Services won't start?**
```bash
# Check logs
docker compose -f docker-compose.local.yml logs

# Restart services
docker compose -f docker-compose.local.yml restart
```

### **Port conflicts?**
Edit `docker-compose.local.yml` and change ports:
- PostgreSQL: `5432` → `5433`
- Minio: `9000` → `9002`, `9001` → `9003`
- Chrome: `3001` → `3002`
- App: `3000` → `3003`

### **Database connection error?**
Wait 30 seconds after starting services - database needs time to initialize.

### **Can't access app?**
1. Check if app container is running: `docker ps`
2. Check app logs: `docker compose -f docker-compose.local.yml logs app`
3. Verify health: http://localhost:3000/api/health

---

## 🛑 STOPPING SERVICES

```bash
# Stop all services
docker compose -f docker-compose.local.yml down

# Stop and remove volumes (clean slate)
docker compose -f docker-compose.local.yml down -v
```

---

## 📊 SERVICE URLS

| Service | URL | Credentials |
|---------|-----|-------------|
| **Elevate App** | http://localhost:3000 | Create account |
| **Minio Console** | http://localhost:9001 | minioadmin / minioadmin123 |
| **Health Check** | http://localhost:3000/api/health | - |
| **PostgreSQL** | localhost:5432 | elevate / elevate123 |

---

## 🎯 FOR MENTOR DEMO

### **What to Show:**
1. ✅ **Landing Page** - Clean Elevate branding
2. ✅ **Registration/Login** - Create account
3. ✅ **Dashboard** - Resume management
4. ✅ **Resume Builder** - All sections working
5. ✅ **Templates** - 17 templates available
6. ✅ **Export** - PDF generation
7. ✅ **Sharing** - Public resume links

### **Talking Points:**
- ✅ 100% rebranded (no old owner traces)
- ✅ All features working
- ✅ Dockerized for easy deployment
- ✅ Production-ready architecture
- ✅ Clean codebase

---

## ✅ READY TO GO!

**Run this command:**
```bash
docker compose -f docker-compose.local.yml up -d
```

**Then visit:** http://localhost:3000

**That's it!** 🚀

