const express= require("express");
const app = express();
app.use(express.json());
const port = 3000;

const notes = []

app.post('/notes', (req, res)=>{
    res.send("Notes Created")
    console.log(req.body)
    notes.push(req.body)
})

app.get('/notes', (req, res)=>{
    res.send(notes)
})

app.listen(port)