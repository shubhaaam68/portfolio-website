const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 Connect MongoDB
mongoose.connect("mongodb://admin:admin%40123@ac-dnccwve-shard-00-00.ofvms9j.mongodb.net:27017,ac-dnccwve-shard-00-01.ofvms9j.mongodb.net:27017,ac-dnccwve-shard-00-02.ofvms9j.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-ahnz2y-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String
});


const Contact = mongoose.model("Contact", contactSchema);

// API
app.post('/contact', async (req, res) => {
    const { name, email } = req.body;

    const newContact = new Contact({ name, email });
    await newContact.save();

    console.log("Saved to DB:", name, email);

    res.json({ message: "Saved to database ✅" });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
