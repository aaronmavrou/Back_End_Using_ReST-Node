// server.js
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const product = require('./routes/product.route'); // Imports routes for the products
const app = express();


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://someuser:abcd1234@ds135519.mlab.com:35519/productstutorial';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

app.use(express.static('public'));

let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});