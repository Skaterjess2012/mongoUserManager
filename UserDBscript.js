const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
mongoose.connect('mongodb://localhost/userManagement', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('db connected'));
db.once('close', () => console.log('Good bye!'));

const userSchema = new mongoose.Schema({
    age: Number,
    name: String,
    gender: String,
    phone: String,
    address: String
});

const userModel = mongoose.model('userCollection', userSchema);

const JFile = path.join(__dirname, '/public/userDummyData.json');
fs.readFile(JFile, 'utf8', (err, data) => {
    let JData = JSON.parse(data);
    JData.forEach((user, index) => {
        const newUser = new userModel();
        newUser.age = user.age;
        newUser.name = user.name;
        newUser.gender = user.gender;
        newUser.phone = user.phone;
        newUser.address = user.address;
        // newUser.save((err, data) => {
        //     if (err) console.log(err);
        // });
    });
    console.log(`${JData.length} Objects where added to the database!`);
    mongoose.disconnect();
});