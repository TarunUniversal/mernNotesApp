const express = require('express');
const cors = require('cors')
const notes = require('./data/data');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');
const { notFound, errorHandler } = require('./middlewares/error');
const path = require('path');
connectDB();
app.use(express.json());

// app.get('/api/notes', (req,res) => {
//     res.send(notes)
// })
// app.get('/api/notes/:id', (req,res) => {
//     const note = notes.find((n) =>n._id === req.params.id);
//     res.send(note);
//     // console.log(req.params);
// })



app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// ---------- deployment -----------

__dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
} else{
    app.get('/', (req,res) => {
        res.send('Hello World!');
    })
}

// ---------- deployment -----------

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})