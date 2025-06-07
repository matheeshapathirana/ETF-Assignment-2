var express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Starting the server
app.listen(3000, () => {
console.log("Server running on port 3000");
});

// MongoDB connection
mongoose.connect('mongodb+srv://user:user2006@etf-assignment.cp8rdvk.mongodb.net/Patients?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas (Patients database)'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Patient schema
const patientSchema = new mongoose.Schema({
  PID: { type: String, required: true, unique: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
  NearCity: { type: String, required: true },
  Doctor: { type: String, required: true },
  Guardian: { type: String, required: true },
  MedicalConditions: [String],
  Medications: [String],
  Allergies: [String],
  Status: { type: String, required: true },
  LastVisitDate: { type: String, required: true }
});
const PatientModel = mongoose.model('Patient', patientSchema);

app.post("/addpatient", async (req, res) => {
  const newPatient = req.body;
  // Validate new patient object
  if (!newPatient || !newPatient.PID || !newPatient.FirstName || !newPatient.LastName || !newPatient.Email || !newPatient.NearCity || !newPatient.Doctor || !newPatient.Guardian || !newPatient.Status || !newPatient.LastVisitDate) {
    return res.status(400).send('Invalid patient object');
  }
  try {
    const patientDoc = new PatientModel(newPatient);
    await patientDoc.save();
    res.send('Patient is saved to MongoDB');
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).send('Patient with this PID already exists in MongoDB');
    } else {
      res.status(500).send('Error saving to MongoDB: ' + err.message);
    }
  }
});

app.get("/getpatient/:PID", async (req, res) => {
  let pid = req.params.PID;
  try {
    const patient = await PatientModel.findOne({ PID: pid }).lean();
    if (patient) {
      return res.json(patient);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).send('Error fetching patient: ' + err.message);
  }
});

// Update patient by PID
app.put("/updatepatient/pid/:PID", async (req, res) => {
  const pid = req.params.PID;
  const updateData = req.body;
  try {
    const updated = await PatientModel.findOneAndUpdate(
      { PID: pid },
      updateData,
      { new: true }
    ).lean();
    if (updated) {
      res.json({ message: "Patient updated", patient: updated });
    } else {
      res.status(404).send("Patient not found");
    }
  } catch (err) {
    res.status(500).send("Error updating patient: " + err.message);
  }
});

// Update patient by First Name
app.put("/updatepatient/firstname/:FirstName", async (req, res) => {
  const firstName = req.params.FirstName;
  const updateData = req.body;
  try {
    const updated = await PatientModel.findOneAndUpdate(
      { FirstName: firstName },
      updateData,
      { new: true }
    ).lean();
    if (updated) {
      res.json({ message: "Patient updated", patient: updated });
    } else {
      res.status(404).send("Patient not found");
    }
  } catch (err) {
    res.status(500).send("Error updating patient: " + err.message);
  }
});

// Delete patient by PID
app.delete("/deletepatient/:PID", async (req, res) => {
  const pid = req.params.PID;
  try {
    const deleted = await PatientModel.findOneAndDelete({ PID: pid }).lean();
    if (deleted) {
      res.json({ message: "Patient deleted", patient: deleted });
    } else {
      res.status(404).send("Patient not found");
    }
  } catch (err) {
    res.status(500).send("Error deleting patient: " + err.message);
  }
});
