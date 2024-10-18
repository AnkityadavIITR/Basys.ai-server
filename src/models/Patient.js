import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: String,
  medicalHistory: [String],
  treatmentPlan: String,
});

export const Patient = mongoose.model('Patient', PatientSchema);
