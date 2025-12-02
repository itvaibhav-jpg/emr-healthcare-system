import React, { useState, useEffect } from 'react';
import api from '../config/api';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    status: 'scheduled',
    reason: '',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appointmentsRes, patientsRes, doctorsRes] = await Promise.all([
        api.get('/api/appointments'),
        api.get('/api/patients'),
        api.get('/api/doctors')
      ]);
      setAppointments(appointmentsRes.data.data);
      setPatients(patientsRes.data.data);
      setDoctors(doctorsRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/appointments', formData);
      setShowForm(false);
      setFormData({
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        status: 'scheduled',
        reason: '',
        notes: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await api.delete(`/api/appointments/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  if (loading) return <div className="loading">Loading appointments...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Appointments</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Schedule Appointment'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>Schedule New Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label>Patient *</label>
                <select required value={formData.patient_id} onChange={(e) => setFormData({...formData, patient_id: e.target.value})}>
                  <option value="">Select Patient</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Doctor *</label>
                <select required value={formData.doctor_id} onChange={(e) => setFormData({...formData, doctor_id: e.target.value})}>
                  <option value="">Select Doctor</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>Dr. {d.first_name} {d.last_name} - {d.specialization}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Appointment Date & Time *</label>
                <input type="datetime-local" required value={formData.appointment_date} onChange={(e) => setFormData({...formData, appointment_date: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Reason</label>
              <input value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-success">Schedule Appointment</button>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(apt => (
              <tr key={apt.id}>
                <td>{new Date(apt.appointment_date).toLocaleString()}</td>
                <td>{apt.patients?.first_name} {apt.patients?.last_name}</td>
                <td>Dr. {apt.doctors?.first_name} {apt.doctors?.last_name}</td>
                <td><span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  background: apt.status === 'scheduled' ? '#d4edda' : apt.status === 'completed' ? '#cce5ff' : '#f8d7da',
                  color: apt.status === 'scheduled' ? '#155724' : apt.status === 'completed' ? '#004085' : '#721c24'
                }}>{apt.status}</span></td>
                <td>{apt.reason}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(apt.id)} style={{ fontSize: '12px', padding: '5px 10px' }}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
