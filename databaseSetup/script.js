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

class script {
    constructor(){
        this.addUsers();
    }
    addUsers() {

    }
}
