// routes/authorizationRoutes.js
import express from 'express';
import {AuthorizationRequest} from "../models/AuthorizationRequest.js"
import bodyParser from 'body-parser';
const router=express.Router();

router.use(bodyParser.urlencoded({extended:true}));
router.use(express.json())

router.post('/', async (req, res) => {
  const authRequest = new AuthorizationRequest(req.body);
  try {
    const savedRequest = await authRequest.save();
    return res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const authRequests = await AuthorizationRequest.find().populate('patientId');
    return res.json(authRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;