import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import PatientDetail from './components/PatientDetail';
import Doctors from './components/Doctors';
import Appointments from './components/Appointments';
import MedicalRecords from './components/MedicalRecords';
import Prescriptions from './components/Prescriptions';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/patients">Patients</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/medical-records">Medical Records</Link></li>
            <li><Link to="/prescriptions">Prescriptions</Link></li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
