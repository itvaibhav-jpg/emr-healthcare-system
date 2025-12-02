import React, { useState, useEffect } from 'react';
import api from '../config/api';

function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    records: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [patientsRes, doctorsRes, appointmentsRes, recordsRes] = await Promise.all([
        api.get('/api/patients'),
        api.get('/api/doctors'),
        api.get('/api/appointments'),
        api.get('/api/medical-records')
      ]);

      setStats({
        patients: patientsRes.data.data.length,
        doctors: doctorsRes.data.data.length,
        appointments: appointmentsRes.data.data.length,
        records: recordsRes.data.data.length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div>
      <h1>EMR Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <h2>{stats.patients}</h2>
          <p>Total Patients</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <h2>{stats.doctors}</h2>
          <p>Total Doctors</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <h2>{stats.appointments}</h2>
          <p>Total Appointments</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
          <h2>{stats.records}</h2>
          <p>Medical Records</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '30px' }}>
        <h2>Welcome to EMR Healthcare System</h2>
        <p>Manage your healthcare facility efficiently with our comprehensive Electronic Medical Records system.</p>
        <ul style={{ marginTop: '20px', lineHeight: '2' }}>
          <li>✓ Patient Management</li>
          <li>✓ Appointment Scheduling</li>
          <li>✓ Medical History Tracking</li>
          <li>✓ Prescription Management</li>
          <li>✓ Doctor Directory</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
