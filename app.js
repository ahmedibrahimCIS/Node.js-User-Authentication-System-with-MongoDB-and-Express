const express = require('express');
const router  = require('./routes/router')
const mongoose = require('mongoose');
const app     = express();

// MongoDB Connection
const connect = mongoose.connect("mongodb://localhost:27017/loginApi");

connect.then(() => {
    console.log('MongoDB connected....');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Set the port
const PORT = process.env.PORT || 5000;

// Set view engine to EJS
app.set('view engine', 'ejs');

// Use the router in the app
app.use(router);

// Start the server
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
