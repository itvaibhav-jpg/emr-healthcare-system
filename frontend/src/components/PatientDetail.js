import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../config/api';

function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientData();
  }, [id]);

  const fetchPatientData = async () => {
    try {
      const [patientRes, appointmentsRes, recordsRes, prescriptionsRes] = await Promise.all([
        api.get(`/api/patients/${id}`),
        api.get(`/api/appointments/patient/${id}`),
        api.get(`/api/medical-records/patient/${id}`),
        api.get(`/api/prescriptions/patient/${id}`)
      ]);

      setPatient(patientRes.data.data);
      setAppointments(appointmentsRes.data.data);
      setMedicalRecords(recordsRes.data.data);
      setPrescriptions(prescriptionsRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading patient details...</div>;
  if (!patient) return <div>Patient not found</div>;

  return (
    <div>
      <h1>Patient Details</h1>

      <div className="card">
        <h2>{patient.first_name} {patient.last_name}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
          <div><strong>Date of Birth:</strong> {new Date(patient.date_of_birth).toLocaleDateString()}</div>
          <div><strong>Gender:</strong> {patient.gender}</div>
          <div><strong>Email:</strong> {patient.email}</div>
          <div><strong>Phone:</strong> {patient.phone}</div>
          <div><strong>Blood Group:</strong> {patient.blood_group}</div>
          <div><strong>Emergency Contact:</strong> {patient.emergency_contact_name} ({patient.emergency_contact_phone})</div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <strong>Address:</strong> {patient.address}
        </div>
      </div>

      <div className="card">
        <h2>Appointments ({appointments.length})</h2>
        {appointments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(apt => (
                <tr key={apt.id}>
                  <td>{new Date(apt.appointment_date).toLocaleString()}</td>
                  <td>{apt.doctors?.first_name} {apt.doctors?.last_name}</td>
                  <td>{apt.status}</td>
                  <td>{apt.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found</p>
        )}
      </div>

      <div className="card">
        <h2>Medical Records ({medicalRecords.length})</h2>
        {medicalRecords.length > 0 ? (
          <div>
            {medicalRecords.map(record => (
              <div key={record.id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                <div><strong>Visit Date:</strong> {new Date(record.visit_date).toLocaleDateString()}</div>
                <div><strong>Doctor:</strong> {record.doctors?.first_name} {record.doctors?.last_name}</div>
                <div><strong>Diagnosis:</strong> {record.diagnosis}</div>
                <div><strong>Symptoms:</strong> {record.symptoms}</div>
                <div><strong>Treatment:</strong> {record.treatment}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No medical records found</p>
        )}
      </div>

      <div className="card">
        <h2>Prescriptions ({prescriptions.length})</h2>
        {prescriptions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Duration</th>
                <th>Prescribed By</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map(rx => (
                <tr key={rx.id}>
                  <td>{rx.medication_name}</td>
                  <td>{rx.dosage}</td>
                  <td>{rx.frequency}</td>
                  <td>{rx.duration}</td>
                  <td>{rx.doctors?.first_name} {rx.doctors?.last_name}</td>
                  <td>{new Date(rx.prescribed_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No prescriptions found</p>
        )}
      </div>
    </div>
  );
}

export default PatientDetail;
