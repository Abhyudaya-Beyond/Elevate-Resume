# 🚀 START DEMO - ELEVATE FOR MENTOR

**Quick 3-step guide to get Elevate running locally**

---

## ⚠️ STEP 0: Stop Old Containers (if any)

If you have old containers running, stop them first:

```bash
docker compose down
# or
docker stop $(docker ps -q)
```

---

## ✅ STEP 1: Start Services (2 minutes)

```bash
docker compose -f docker-compose.local.yml up -d --build
```

**What this does:**
- ✅ Builds your Elevate app
- ✅ Starts PostgreSQL database
- ✅ Starts Minio storage
- ✅ Starts Browserless (PDF generation)
- ✅ Starts Elevate app

**Wait 60-90 seconds** for everything to start.

---

## ✅ STEP 2: Check Status (30 seconds)

```bash
docker compose -f docker-compose.local.yml ps
```

All services should show "healthy" or "running".

---

## ✅ STEP 3: Open Your App

**Visit:** http://localhost:3000

**Health Check:** http://localhost:3000/api/health

**That's it!** 🎉

---

## 🎯 WHAT TO SHOW YOUR MENTOR

1. ✅ **Landing Page** - Clean Elevate branding
2. ✅ **Sign Up** - Create test account
3. ✅ **Dashboard** - Resume management
4. ✅ **Resume Builder** - All sections working
5. ✅ **Templates** - 17 templates available
6. ✅ **Export PDF** - Generate resume
7. ✅ **Share Link** - Public resume sharing

---

## 🛠️ TROUBLESHOOTING

### **Port 3000 already in use?**
```bash
# Stop old containers
docker stop compose-app-1

# Or change port in docker-compose.local.yml
# Change "3000:3000" to "3003:3000"
```

### **Services won't start?**
```bash
# Check logs
docker compose -f docker-compose.local.yml logs

# Restart
docker compose -f docker-compose.local.yml restart
```

### **App not loading?**
1. Wait 60 seconds after starting
2. Check: http://localhost:3000/api/health
3. Check logs: `docker compose -f docker-compose.local.yml logs app`

---

## 🛑 STOP DEMO

```bash
docker compose -f docker-compose.local.yml down
```

---

## ✅ READY!

**One command:**
```bash
docker compose -f docker-compose.local.yml up -d --build
```

**Then visit:** http://localhost:3000

**Perfect for mentor demo!** 🚀

