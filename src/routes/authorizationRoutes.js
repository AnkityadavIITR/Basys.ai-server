// routes/authorizationRoutes.js
import express from 'express';
import {AuthorizationRequest} from "../models/AuthorizationRequest.js"
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {Patient} from "../models/Patient.js";
const router=express.Router();

router.use(bodyParser.urlencoded({extended:true}));
router.use(express.json())

router.post('/post', async (req, res) => {
  console.log("req.body",req.body)
  
  const authRequest = new AuthorizationRequest(req.body);
  try {
    const savedRequest = await authRequest.save();
    return res.status(201).json({success:true, message:'Authorization request submitted successfully', data:savedRequest});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const  patientId  = req.params.id;
  console.log("patientId", patientId);

  try {
    // Validate the patientId as a MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ success: false, message: 'Invalid patient ID format' });
    }

    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    console.log("patient", patient);
    
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Find all authorization requests associated with the given patientId
    const authRequests = await AuthorizationRequest.find({ patientId }).populate('patientId');

    // If no authorization requests are found, return a message
    if (authRequests.length === 0) {
      return res.status(200).json({ success: false, message: 'No Authorization Requests found for this patient' });
    }

    // Return the authorization requests with success status
    return res.status(200).json({ success: true, data: authRequests });
  } catch (error) {
    // Handle any errors that occur during the query
    console.error('Error fetching authorization requests:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;