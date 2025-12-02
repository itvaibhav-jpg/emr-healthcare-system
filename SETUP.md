# EMR Healthcare System - Complete Setup Guide

## Prerequisites

- Node.js v16 or higher
- npm or yarn
- Supabase account (free tier available at https://supabase.com)

## Step 1: Database Setup

1. **Create a Supabase Project**
   - Go to https://supabase.com
   - Click "New Project"
   - Fill in project details and wait for setup to complete

2. **Run Database Schema**
   - In Supabase dashboard, go to SQL Editor
   - Copy the entire content from `database/schema.sql`
   - Paste and execute the SQL script
   - This creates all tables, indexes, and triggers

3. **Get Supabase Credentials**
   - Go to Project Settings > API
   - Copy your `Project URL` (SUPABASE_URL)
   - Copy your `anon/public` key (SUPABASE_KEY)

## Step 2: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   
   Server will run on http://localhost:5000

## Step 3: Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_KEY=your_supabase_anon_key
   ```

4. **Start the frontend**
   ```bash
   npm start
   ```
   
   App will open at http://localhost:3000

## Step 4: Test the Application

1. **Add a Doctor**
   - Go to Doctors page
   - Click "Add New Doctor"
   - Fill in doctor details
   - Submit

2. **Add a Patient**
   - Go to Patients page
   - Click "Add New Patient"
   - Fill in patient details
   - Submit

3. **Schedule an Appointment**
   - Go to Appointments page
   - Click "Schedule Appointment"
   - Select patient and doctor
   - Choose date/time
   - Submit

4. **Add Medical Record**
   - Go to Medical Records page
   - Click "Add Medical Record"
   - Fill in diagnosis, symptoms, treatment
   - Submit

5. **Create Prescription**
   - Go to Prescriptions page
   - Click "Add Prescription"
   - Fill in medication details
   - Submit

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify Supabase credentials in `.env`
- Check Node.js version (should be v16+)

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in frontend `.env`
- Check browser console for CORS errors

### Database errors
- Verify schema was executed successfully in Supabase
- Check Supabase project is active
- Verify API keys are correct

## Production Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in hosting platform
2. Deploy backend code
3. Update frontend REACT_APP_API_URL to production URL

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder
3. Set environment variables in hosting platform

## Security Notes

- Never commit `.env` files
- Use environment variables for all sensitive data
- Enable Row Level Security (RLS) in Supabase for production
- Implement authentication before production use

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Review React documentation: https://react.dev
- Check Express.js documentation: https://expressjs.com
