const express = require('express'),
     mongoose = require('mongoose'),
         cors = require('cors'),
          app = express(),
         port = 8000;

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost/ninjaDB");

const NinjaSchema = new mongoose.Schema({
    name: String
});
const Ninja = mongoose.model("Ninja", NinjaSchema);

app.get("/ninjas", (req, res) => {
    Ninja.find()
        .then(ninjas => res.json(ninjas))
        .catch(err => res.json(err));
});

app.post("/ninjas", (req, res) => {
    let ninja = new Ninja(req.body);
    ninja.save()
        .then( () => res.json({msg: "success"}))
        .catch( err => res.json(err));
});

app.listen(port, () => { console.log(`listening on port ${port}`) });