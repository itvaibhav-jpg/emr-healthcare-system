import React, { useState, useEffect } from 'react';
import api from '../config/api';

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    visit_date: new Date().toISOString().slice(0, 16),
    diagnosis: '',
    symptoms: '',
    treatment: '',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [recordsRes, patientsRes, doctorsRes] = await Promise.all([
        api.get('/api/medical-records'),
        api.get('/api/patients'),
        api.get('/api/doctors')
      ]);
      setRecords(recordsRes.data.data);
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
      await api.post('/api/medical-records', formData);
      setShowForm(false);
      setFormData({
        patient_id: '',
        doctor_id: '',
        visit_date: new Date().toISOString().slice(0, 16),
        diagnosis: '',
        symptoms: '',
        treatment: '',
        notes: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error creating medical record:', error);
    }
  };

  if (loading) return <div className="loading">Loading medical records...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Medical Records</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Medical Record'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>Add Medical Record</h2>
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
                    <option key={d.id} value={d.id}>Dr. {d.first_name} {d.last_name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Visit Date & Time</label>
                <input type="datetime-local" value={formData.visit_date} onChange={(e) => setFormData({...formData, visit_date: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>Symptoms</label>
              <textarea value={formData.symptoms} onChange={(e) => setFormData({...formData, symptoms: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Diagnosis</label>
              <textarea value={formData.diagnosis} onChange={(e) => setFormData({...formData, diagnosis: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Treatment</label>
              <textarea value={formData.treatment} onChange={(e) => setFormData({...formData, treatment: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Additional Notes</label>
              <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-success">Save Medical Record</button>
          </form>
        </div>
      )}

      <div className="card">
        {records.map(record => (
          <div key={record.id} style={{ borderBottom: '1px solid #eee', padding: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3>{record.patients?.first_name} {record.patients?.last_name}</h3>
              <span>{new Date(record.visit_date).toLocaleDateString()}</span>
            </div>
            <div><strong>Doctor:</strong> Dr. {record.doctors?.first_name} {record.doctors?.last_name} ({record.doctors?.specialization})</div>
            <div style={{ marginTop: '10px' }}><strong>Symptoms:</strong> {record.symptoms}</div>
            <div style={{ marginTop: '10px' }}><strong>Diagnosis:</strong> {record.diagnosis}</div>
            <div style={{ marginTop: '10px' }}><strong>Treatment:</strong> {record.treatment}</div>
            {record.notes && <div style={{ marginTop: '10px' }}><strong>Notes:</strong> {record.notes}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicalRecords;
