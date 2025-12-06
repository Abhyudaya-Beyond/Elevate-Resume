# 📧 FOR MENTOR - ELEVATE RESUME BUILDER

**Hi! Here's how to run Elevate on your desktop:**

---

## 🎯 QUICK SETUP (5 Minutes)

### **Step 1: Install Docker Desktop**
- Download: https://www.docker.com/products/docker-desktop
- Install and start Docker Desktop

### **Step 2: Clone the Repository**
```bash
git clone https://github.com/Abhyudaya-Beyond/Elevate-Resume.git
cd Elevate-Resume
```

### **Step 3: Start the Application**
```bash
docker compose -f docker-compose.local.yml up -d --build
```

**Wait 60-90 seconds** for everything to start.

### **Step 4: Open in Browser**
Visit: **http://localhost:3000**

**That's it!** The app is running! 🎉

---

## 📋 WHAT TO REVIEW

- ✅ **Landing Page** - Clean Elevate branding
- ✅ **Authentication** - Sign up / Sign in
- ✅ **Dashboard** - Resume management
- ✅ **Resume Builder** - All sections working
- ✅ **Templates** - 17 professional templates
- ✅ **Export** - PDF generation
- ✅ **Sharing** - Public resume links

---

## 🛠️ TROUBLESHOOTING

**Port 3000 in use?** Edit `docker-compose.local.yml` and change `3000:3000` to `3003:3000`

**Services won't start?** Check logs: `docker compose -f docker-compose.local.yml logs`

**App not loading?** Wait 60 seconds, then check: http://localhost:3000/api/health

---

## 🛑 STOP THE APP

```bash
docker compose -f docker-compose.local.yml down
```

---

## 📞 NEED HELP?

See [MENTOR_SETUP.md](./MENTOR_SETUP.md) for detailed instructions.

---

**Repository:** https://github.com/Abhyudaya-Beyond/Elevate-Resume

**Ready to review!** 🚀

