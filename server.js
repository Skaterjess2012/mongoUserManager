const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userManagement', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('db connected'));

const userSchema = new mongoose.Schema({
    name: String,
    role: String,
    age: { type: Number, min: 18, max: 70 },
    createDate: { type: Date, default: Date.now}
});

const user = mongoose.model('userCollection', userSchema);

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true}));

//this is where you add the rest of the code


app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`App Server listen on port: ${port}`);
});