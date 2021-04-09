const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const UserRouter = require('./routes/user')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('monggoDB connected');

})
app.get('/', (req, res) => {
    // res.send('<marquee width="60%" direction="left" height="100px"><h1 style= "color: red;font-size:50px"> Guian23... MongoDB Connection</h1></marquee>');
    res.sendFile(path.join(__dirname + '/index.html'));
})
app.use('./user', UserRouter);

app.listen(port, () => {
    console.log('server is running at port: ' + port);
})