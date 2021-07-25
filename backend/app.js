const express = require('express');
const notes = require('./data/data');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

app.get('/', (req,res) => {
    res.send('Hello World!');
})

app.get('/api/notes', (req,res) => {
    res.send(notes)
})

app.get('/api/notes/:id', (req,res) => {
    const note = notes.find((n) =>n._id === req.params.id);
    res.send(note);
    // console.log(req.params);
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})