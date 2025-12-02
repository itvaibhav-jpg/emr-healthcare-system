# EMR Healthcare System

A comprehensive Electronic Medical Records (EMR) system for managing patient data, appointments, medical history, and prescriptions.

## Features

- **Patient Management**: Register, update, and manage patient records
- **Appointments**: Schedule and track patient appointments
- **Medical History**: Record diagnoses, treatments, and medical notes
- **Prescriptions**: Manage medications and prescriptions
- **Doctor Management**: Manage healthcare providers
- **Real-time Updates**: Live data synchronization with Supabase

## Tech Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- Supabase account
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=5000
```

3. Run the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

3. Run the app:
```bash
npm start
```

## Database Schema

The system uses the following tables:

- `patients`: Patient demographic information
- `doctors`: Healthcare provider information
- `appointments`: Appointment scheduling
- `medical_records`: Patient medical history
- `prescriptions`: Medication prescriptions

See `database/schema.sql` for complete schema.

## API Endpoints

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Medical Records
- `GET /api/medical-records/:patientId` - Get patient medical history
- `POST /api/medical-records` - Add medical record

### Prescriptions
- `GET /api/prescriptions/:patientId` - Get patient prescriptions
- `POST /api/prescriptions` - Create prescription

## License

MIT
