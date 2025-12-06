# 🚀 ELEVATE - MENTOR SETUP GUIDE

**Quick setup for mentors and reviewers**

---

## ✅ PREREQUISITES

- **Docker Desktop** installed and running
- **Git** installed
- **5 minutes** of time

---

## 📥 STEP 1: Clone the Repository

```bash
git clone https://github.com/Abhyudaya-Beyond/Elevate-Resume.git
cd Elevate-Resume
```

---

## 🐳 STEP 2: Start with Docker (One Command)

```bash
docker compose -f docker-compose.local.yml up -d --build
```

**Wait 60-90 seconds** for all services to start.

---

## 🌐 STEP 3: Open the Application

**Visit:** http://localhost:3000

**Health Check:** http://localhost:3000/api/health

**That's it!** The app is running! 🎉

---

## 🧪 QUICK TEST

1. **Go to:** http://localhost:3000
2. **Click:** "Get Started" or "Sign up"
3. **Create:** A test account
4. **Start:** Building resumes!

---

## 📊 WHAT'S INCLUDED

- ✅ **PostgreSQL** - Database (ready)
- ✅ **Minio** - File storage (ready)
- ✅ **Browserless** - PDF generation (ready)
- ✅ **Elevate App** - Your application (ready)

**Everything is pre-configured!** No setup needed.

---

## 🛠️ TROUBLESHOOTING

### **Port 3000 already in use?**
Edit `docker-compose.local.yml` and change:
```yaml
ports:
  - "3000:3000"  # Change to "3003:3000"
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

## 🛑 STOP THE APP

```bash
docker compose -f docker-compose.local.yml down
```

---

## 📋 FEATURES TO REVIEW

- ✅ **Landing Page** - Clean Elevate branding
- ✅ **Authentication** - Sign up / Sign in
- ✅ **Dashboard** - Resume management
- ✅ **Resume Builder** - All sections (Basics, Experience, Education, Skills, etc.)
- ✅ **Templates** - 17 professional templates
- ✅ **Live Preview** - Real-time updates
- ✅ **Export** - PDF generation
- ✅ **Sharing** - Public resume links

---

## ✅ READY!

**Clone → Run → Open → Done!**

Perfect for review! 🚀

