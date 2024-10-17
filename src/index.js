import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patientRoutes.js";
import authorizationRoutes from "./routes/authorizationRoutes.js"
import dotenv from 'dotenv';
import dbConnect from "./db/data.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
dbConnect();


app.use(cors());

app.use('/api/patients', patientRoutes);
app.use('/api/authorizations', authorizationRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});