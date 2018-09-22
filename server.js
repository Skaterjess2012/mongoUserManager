const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userManagement', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('db connected'));

const userSchema = new mongoose.Schema({
    age: Number,
    name: String,
    gender: String,
    phone: String,
    address: String
});

const user = mongoose.model('userCollection', userSchema);

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'pug');

//this is where you add the rest of the code

app.get('/userListing', (req, res) => {
    const newUser = new user();
});

app.get('/addUser/', (req, res) => {});

app.get('/edit/:uid', (req, res) => {});

app.post('/add/:uid', (req, res) => {});

app.post('/update/:uid', (req, res) => {});

app.post('/delete/:uid', (req, res) => {});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`App Server listen on port: ${port}`);
});