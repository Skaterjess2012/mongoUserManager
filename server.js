const mongoose = require('mongoose');
const path = require('path');
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
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

//GET Requests
app.get('/', (req, res) => {
    user.find({}, (err, docs) => {
        if (err) console.log(err);
        res.render('userListing', {users: docs});
    });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const newUser = new user();
    const body = req.body;

    newUser.age = body.age;
    newUser.name = body.name;
    newUser.gender = body.gender;
    newUser.phone = body.phone;
    newUser.address = body.address;

    newUser.save((err, data) => {
        if (err) console.error(err);
        res.redirect('/');
    });
});

app.get('/edit/:uid', (req, res) => {
    const uid = req.params.uid;
    user.findOne({_id:uid}, (err, docArray) => {
        if (err) console.log(err);
        res.render('edit', {user:docArray});
    });
});

app.post('/update/:uid', (req, res) => {
    const uid = req.params.uid;
    const body = req.body;
    const updatedUserData = {
        age: body.age,
        name: body.name,
        gender: body.gender,
        phone: body.phone,
        address: body.address
    };

    user.findOneAndUpdate({_id:uid}, updatedUserData, {new: true}, (err, data) => {
        if (err) console.log(err);
        res.redirect('/');
    });
});

app.get('/delete/:uid', (req, res) => {
    const uid = req.params.uid;
    user.findOneAndDelete({'_id': uid}, (err, data) => {
        if (err) return console.log(`Oops! ${err}`);
        res.redirect('/');
    });
});

app.post('/search', (req, res) => {
    const body = req.body;
    // user.find({$text:{$search:body.searchInput}}, (err, data) => {
    //     if (err) return console.log(`Oops! ${err}`);
    //     let result = JSON.parse(data);
    //     res.render('userListing', {users: result});
    // });
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`App Server listen on port: ${port}`);
});