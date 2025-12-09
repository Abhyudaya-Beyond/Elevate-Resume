# Runtime Test Checklist

**Date**: 2025-12-09  
**Status**: Testing before commit

---

## ✅ Server Status Check

### Port 3000 (API Server)
- [x] Server is listening on port 3000
- [ ] Health endpoint responds correctly
- [ ] No startup errors

### Port 5173 (Client)
- [ ] Client is listening on port 5173
- [ ] No build errors
- [ ] React app loads correctly

### Port 6173 (Artboard)
- [ ] Artboard is listening on port 6173
- [ ] No build errors
- [ ] Artboard loads correctly

---

## 🔍 Runtime Error Checks

### Browser Console
- [ ] No JavaScript errors
- [ ] No React warnings
- [ ] No network errors
- [ ] No TypeScript errors

### Application Functionality
- [ ] Home page loads
- [ ] Login/Register pages work
- [ ] Dashboard loads
- [ ] Builder loads without errors
- [ ] Preview panel syncs correctly
- [ ] Form panels render correctly
- [ ] No null reference errors

---

## 🐛 Known Issues to Verify Fixed

### React Hooks
- [ ] PreviewPanel: useEffect dependencies work correctly
- [ ] PublicPage: useCallback dependencies work correctly
- [ ] No stale closures

### Null Safety
- [ ] Resume store: addSection works with empty resume
- [ ] Resume store: removeSection works safely
- [ ] Builder components: Optional chaining prevents crashes
- [ ] No "Cannot read property of undefined" errors

### Mobile Responsiveness
- [ ] Hero section responsive on mobile
- [ ] Dashboard responsive on mobile
- [ ] Builder layout responsive on mobile
- [ ] Auth pages responsive on mobile

---

## 📝 Test Results

**Status**: In Progress

---

**Generated**: 2025-12-09

