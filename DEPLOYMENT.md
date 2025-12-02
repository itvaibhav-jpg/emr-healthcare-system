# 🚀 EMR System - Online Deployment Guide

Deploy your EMR Healthcare System online for FREE using Railway (backend) and Vercel (frontend).

## Prerequisites

✅ Supabase account with database schema already set up
✅ GitHub account (you already have the repo!)

---

## Step 1: Deploy Backend to Railway (5 minutes)

### 1.1 Sign Up for Railway

1. Go to [https://railway.app](https://railway.app)
2. Click **"Login"** → **"Login with GitHub"**
3. Authorize Railway to access your GitHub

### 1.2 Deploy Backend

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **`emr-healthcare-system`** repository
4. Railway will automatically detect and deploy

### 1.3 Add Environment Variables

1. Click on your deployed service
2. Go to **"Variables"** tab
3. Click **"+ New Variable"** and add these:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=5000
```

4. Click **"Deploy"** to restart with new variables

### 1.4 Get Your Backend URL

1. Go to **"Settings"** tab
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. Copy the URL (looks like: `https://your-app.railway.app`)

**✅ Backend is now live!**

---

## Step 2: Deploy Frontend to Vercel (5 minutes)

### 2.1 Sign Up for Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel

### 2.2 Deploy Frontend

1. Click **"Add New..."** → **"Project"**
2. Import **`emr-healthcare-system`** repository
3. Configure project:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

### 2.3 Add Environment Variables

Before clicking "Deploy", add these environment variables:

```
REACT_APP_API_URL=your_railway_backend_url
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

**Important:** Replace `your_railway_backend_url` with the Railway URL from Step 1.4

4. Click **"Deploy"**

### 2.4 Get Your Live URL

After deployment completes (2-3 minutes):
- Vercel will show your live URL (looks like: `https://emr-healthcare-system.vercel.app`)
- Click it to view your live EMR system!

**✅ Frontend is now live!**

---

## Step 3: Test Your Live Application

1. Open your Vercel URL in browser
2. You should see the EMR Dashboard
3. Try adding a doctor, patient, or appointment
4. All data is stored in your Supabase database

---

## 🎉 Your EMR System is Live!

**Frontend URL:** `https://your-app.vercel.app`
**Backend API:** `https://your-app.railway.app`
**Database:** Supabase (already configured)

---

## Troubleshooting

### Backend Issues
- Check Railway logs: Dashboard → Your Service → "Deployments" → Click latest deployment
- Verify environment variables are set correctly
- Make sure Supabase credentials are correct

### Frontend Issues
- Check Vercel logs: Dashboard → Your Project → "Deployments" → Click latest
- Verify `REACT_APP_API_URL` points to your Railway backend URL
- Check browser console for errors (F12)

### Database Issues
- Verify schema was run in Supabase SQL Editor
- Check Supabase project is active
- Test connection from Railway backend logs

---

## Alternative: Deploy Both to Vercel

If you prefer to deploy everything to Vercel:

1. Deploy backend as Vercel Serverless Function
2. Deploy frontend as static site
3. Both will be on same domain

Let me know if you want instructions for this approach!

---

## Free Tier Limits

**Railway:**
- $5 free credit per month
- Enough for development/testing
- Sleeps after inactivity (wakes on request)

**Vercel:**
- 100GB bandwidth/month
- Unlimited deployments
- Custom domains supported

**Supabase:**
- 500MB database
- 1GB file storage
- 2GB bandwidth
- Perfect for small-medium projects

---

## Need Help?

If you encounter any issues during deployment:
1. Check the logs in Railway/Vercel dashboards
2. Verify all environment variables are correct
3. Make sure Supabase database schema is set up
4. Test backend API directly using the Railway URL

Your EMR system is production-ready! 🚀
