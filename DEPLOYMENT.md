# Deployment Guide

Deploy your Mini CRM to the cloud for free with Render (Backend) and Vercel (Frontend).

---

## 🚀 Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Verify email

### Step 2: Connect GitHub
1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Click **"Connect a repository"**
4. Select your `mini-crm` repository

### Step 3: Configure Backend Service
- **Name**: `mini-crm-backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Region**: Choose closest to you

### Step 4: Add Environment Variables
In Render dashboard, go to **Environment** tab and add:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mini_crm
JWT_SECRET=your_super_secret_key_2024_change_this
PORT=5001
```

**Get MongoDB URI:**
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Replace `<password>` with your password
5. Add `/mini_crm` at end

### Step 5: Deploy
Click **"Deploy"** button. Wait 2-3 minutes.

Your backend URL will be: `https://mini-crm-backend.onrender.com`

---

## 🚀 Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Authorize Vercel

### Step 2: Import Project
1. Click **"New Project"**
2. Select your `mini-crm` repository
3. Click **"Import"**

### Step 3: Configure Frontend
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### Step 4: Add Environment Variables
Add to Vercel:
```
REACT_APP_API_URL=https://mini-crm-backend.onrender.com/api
```

### Step 5: Deploy
Click **"Deploy"** button. Wait 1-2 minutes.

Your frontend URL will be: `https://mini-crm.vercel.app`

---

## ✅ Verify Deployment

1. Open your frontend URL
2. Login with: `admin@gmail.com` / `123456`
3. Create a test lead
4. Change status
5. Add a note
6. Check analytics

If all works → **Deployed successfully!** 🎉

---

## 🔗 Update Your Links

Add to your README:
```
Live Demo: https://mini-crm.vercel.app
Backend API: https://mini-crm-backend.onrender.com
```

---

## 📌 Common Issues

### Backend won't start on Render
- Check `PORT=5001` in .env
- Verify MongoDB URI is correct
- Check logs in Render dashboard

### Frontend can't connect
- Ensure backend URL is in `REACT_APP_API_URL`
- Check browser console for CORS errors
- Verify backend is running

### MongoDB connection fails
- Check username/password in URI
- Ensure IP whitelist includes "0.0.0.0"
- Verify database name is correct

---

## 💰 Pricing

✅ **Render**: Free tier (1 free web service)
✅ **Vercel**: Free tier (unlimited deployments)
✅ **MongoDB Atlas**: Free tier (512MB storage)

**Total Cost: $0** 🎉

---

## 📈 Next Steps

1. Update README with live demo links
2. Share on LinkedIn with demo URL
3. Add to your portfolio
4. Keep advancing features!

