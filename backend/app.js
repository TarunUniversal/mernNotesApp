const express = require('express');
const notes = require('./data/data');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');
const { notFound, errorHandler } = require('./middlewares/error');

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SEND_GRID)

// const msg = {
//     to: 'rathoretarun14@gmail.com',
//     from: 'tarunrathore170899@gmail.com',
//     subject: 'testing emailing',
//     text: 'This is testing phase',
//     html: '<h1>This is testing phase</h1>'
// }

connectDB();
app.use(express.json());

// app.get('/', (req,res) => {
//     res.send('Hello World!');
// })

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

// app.route('/api/email')
//    .get(function () {
//     sgMail
//     .send(msg)
//     .then(() => {
//         console.log('Email sent');
//     })
//     .catch((error) => {
//         console.log(error);
//     })
//    })

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})