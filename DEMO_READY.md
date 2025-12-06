# 🎯 DEMO READY - ELEVATE LOCAL SETUP

**Perfect for mentor showcase! Everything is configured and ready to run.**

---

## ✅ WHAT'S DONE

- ✅ **Docker Compose file created** (`docker-compose.local.yml`)
- ✅ **All secrets generated** and configured
- ✅ **All services configured** (PostgreSQL, Minio, Browserless, App)
- ✅ **No email setup needed** (optional for demo)
- ✅ **Ready to run with one command**

---

## 🚀 START YOUR DEMO (2 COMMANDS)

### **1. Start All Services**

```bash
docker compose -f docker-compose.local.yml up -d
```

**Wait 60-90 seconds** for everything to build and start.

---

### **2. Open Your Browser**

Visit: **http://localhost:3000**

**That's it!** Your app is running! 🎉

---

## 📋 WHAT'S RUNNING

| Service | Status | URL |
|---------|--------|-----|
| **Elevate App** | ✅ Running | http://localhost:3000 |
| **PostgreSQL** | ✅ Running | localhost:5432 |
| **Minio Storage** | ✅ Running | http://localhost:9001 |
| **Browserless** | ✅ Running | localhost:3001 |

---

## 🧪 QUICK TEST

### **1. Health Check**
Visit: http://localhost:3000/api/health

Should show all services "up".

### **2. Create Account**
1. Go to http://localhost:3000
2. Click "Get Started"
3. Register a test account
4. Start building resumes!

---

## 🎯 DEMO CHECKLIST

For your mentor, show:

- [ ] **Landing Page** - Clean Elevate branding
- [ ] **Registration** - Create account
- [ ] **Dashboard** - Resume management
- [ ] **Resume Builder** - All sections (Basics, Experience, Education, etc.)
- [ ] **Templates** - Switch between templates
- [ ] **Live Preview** - Real-time updates
- [ ] **Export PDF** - Generate resume PDF
- [ ] **Share Link** - Public resume sharing

---

## 🛠️ TROUBLESHOOTING

### **Services won't start?**
```bash
# Check what's wrong
docker compose -f docker-compose.local.yml logs

# Restart
docker compose -f docker-compose.local.yml restart
```

### **Port conflicts?**
If port 3000, 5432, or 9000 are in use, edit `docker-compose.local.yml` and change the ports.

### **App not loading?**
1. Wait 60 seconds after starting
2. Check health: http://localhost:3000/api/health
3. Check logs: `docker compose -f docker-compose.local.yml logs app`

---

## 🛑 STOP DEMO

```bash
# Stop all services
docker compose -f docker-compose.local.yml down

# Stop and remove all data (fresh start)
docker compose -f docker-compose.local.yml down -v
```

---

## 📊 SERVICE CREDENTIALS

| Service | Username | Password |
|---------|----------|----------|
| **PostgreSQL** | elevate | elevate123 |
| **Minio Console** | minioadmin | minioadmin123 |

---

## ✅ YOU'RE READY!

**One command to start:**
```bash
docker compose -f docker-compose.local.yml up -d
```

**Then visit:** http://localhost:3000

**Perfect for mentor demo!** 🚀

