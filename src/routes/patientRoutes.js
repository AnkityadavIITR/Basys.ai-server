// routes/patientRoutes.js
import express from 'express';
import {Patient} from '../models/Patient.js'
import bodyParser from 'body-parser';
const router=express.Router();

router.use(bodyParser.urlencoded({extended:true}));
router.use(express.json())



router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/post', async (req, res) => {
  console.log(req.body);
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;