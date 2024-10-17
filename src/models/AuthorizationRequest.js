import mongoose from 'mongoose';

const AuthorizationRequestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  treatmentType: { type: String, required: true },
  insurancePlan: { type: String, required: true },
  dateOfService: { type: Date, required: true },
  diagnosisCode: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
  doctorNotes: String,
}, { timestamps: true });

export const AuthorizationRequest = mongoose.model('AuthorizationRequest', AuthorizationRequestSchema);