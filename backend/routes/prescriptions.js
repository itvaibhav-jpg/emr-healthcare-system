const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get all prescriptions
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prescriptions')
      .select(`
        *,
        patients:patient_id (first_name, last_name),
        doctors:doctor_id (first_name, last_name, specialization)
      `)
      .order('prescribed_date', { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get prescriptions by patient ID
router.get('/patient/:patientId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prescriptions')
      .select(`
        *,
        doctors:doctor_id (first_name, last_name, specialization)
      `)
      .eq('patient_id', req.params.patientId)
      .order('prescribed_date', { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get prescription by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prescriptions')
      .select(`
        *,
        patients:patient_id (first_name, last_name, date_of_birth),
        doctors:doctor_id (first_name, last_name, specialization, license_number)
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new prescription
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prescriptions')
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json({ success: true, data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update prescription
router.put('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prescriptions')
      .update(req.body)
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    res.json({ success: true, data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete prescription
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('prescriptions')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ success: true, message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
