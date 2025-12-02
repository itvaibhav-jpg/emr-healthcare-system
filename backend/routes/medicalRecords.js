const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get all medical records
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medical_records')
      .select(`
        *,
        patients:patient_id (first_name, last_name),
        doctors:doctor_id (first_name, last_name, specialization)
      `)
      .order('visit_date', { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get medical records by patient ID
router.get('/patient/:patientId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medical_records')
      .select(`
        *,
        doctors:doctor_id (first_name, last_name, specialization)
      `)
      .eq('patient_id', req.params.patientId)
      .order('visit_date', { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get medical record by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medical_records')
      .select(`
        *,
        patients:patient_id (first_name, last_name, date_of_birth, blood_group),
        doctors:doctor_id (first_name, last_name, specialization)
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new medical record
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medical_records')
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json({ success: true, data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update medical record
router.put('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('medical_records')
      .update(req.body)
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    res.json({ success: true, data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete medical record
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('medical_records')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ success: true, message: 'Medical record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
