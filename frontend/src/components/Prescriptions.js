import React, { useState, useEffect } from 'react';
import api from '../config/api';

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    medication_name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prescriptionsRes, patientsRes, doctorsRes] = await Promise.all([
        api.get('/api/prescriptions'),
        api.get('/api/patients'),
        api.get('/api/doctors')
      ]);
      setPrescriptions(prescriptionsRes.data.data);
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
      await api.post('/api/prescriptions', formData);
      setShowForm(false);
      setFormData({
        patient_id: '',
        doctor_id: '',
        medication_name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error creating prescription:', error);
    }
  };

  if (loading) return <div className="loading">Loading prescriptions...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Prescriptions</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Prescription'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>Add New Prescription</h2>
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
                <label>Medication Name *</label>
                <input required value={formData.medication_name} onChange={(e) => setFormData({...formData, medication_name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Dosage</label>
                <input value={formData.dosage} onChange={(e) => setFormData({...formData, dosage: e.target.value})} placeholder="e.g., 500mg" />
              </div>
              <div className="form-group">
                <label>Frequency</label>
                <input value={formData.frequency} onChange={(e) => setFormData({...formData, frequency: e.target.value})} placeholder="e.g., Twice daily" />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g., 7 days" />
              </div>
            </div>
            <div className="form-group">
              <label>Instructions</label>
              <textarea value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})} placeholder="Special instructions for taking the medication" />
            </div>
            <button type="submit" className="btn btn-success">Create Prescription</button>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Date Prescribed</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map(rx => (
              <tr key={rx.id}>
                <td>{rx.patients?.first_name} {rx.patients?.last_name}</td>
                <td>Dr. {rx.doctors?.first_name} {rx.doctors?.last_name}</td>
                <td><strong>{rx.medication_name}</strong></td>
                <td>{rx.dosage}</td>
                <td>{rx.frequency}</td>
                <td>{rx.duration}</td>
                <td>{new Date(rx.prescribed_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Prescriptions;
