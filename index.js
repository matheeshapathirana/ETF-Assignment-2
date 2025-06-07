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

let students = [{"id":1, "name": "Nimal", "Address": "Malabe"}];
let student = {"id":53, "name": "Saman", "Address": "Colombo 3"};
students.push(student);

// MongoDB connection
mongoose.connect('mongodb+srv://user:user2006@etf-assignment.cp8rdvk.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Student schema
const studentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    Address: { type: String, required: true }
});
const StudentModel = mongoose.model('Student', studentSchema);

app.get("/students", (req, res)=> {
    if (req.query.id) {
        let sid = parseInt(req.query.id);
        // Filter out invalid student objects
        let tempStu = students.find((x) => x && typeof x.id !== 'undefined' && x.id === sid);
        if (tempStu) {
            // Return only name and Address
            return res.json({ name: tempStu.name, Address: tempStu.Address });
        } else {
            return res.sendStatus(404);
        }
    }
    // Filter out invalid student objects before returning
    res.json(students.filter(x => x && typeof x.id !== 'undefined'));
});
app.get("/student/:id", (req, res)=> {
    let sid=parseInt(req.params.id);
//assigned the first student object from the students array that matches the given sid
    let tempStu=students.filter((x) => x.id == sid)[0];
    if(tempStu){
//If a matching student is foundm responds with the tempStu object as a JSON response using res.json(tempStu). Otherwise, it sends a 404 status code using res.sendStatus(404).
      res.json(tempStu);
    }
    else{
      res.sendStatus(404);     
    }    
});

app.post("/student", async (req, res)=> {
    const newstudent = req.body;
    // Validate new student object
    if (!newstudent || typeof newstudent.id === 'undefined' || !newstudent.name || !newstudent.Address) {
        return res.status(400).send('Invalid student object');
    }
    students.push(newstudent);
    // Save to MongoDB
    try {
        const studentDoc = new StudentModel(newstudent);
        await studentDoc.save();
        res.send('Student is added to the list and saved to MongoDB');
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).send('Student with this id already exists in MongoDB');
        } else {
            res.status(500).send('Error saving to MongoDB: ' + err.message);
        }
    }
});
