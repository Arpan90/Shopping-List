const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const items = require('./routes/api/items');

const app = express();

// Middleware
app.use(express.json());

// Db config

const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use routes

app.use('/api/items', items);

// Serve our static assets if in production
if(process.env.NODE_ENV === 'production' ){
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dir, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));  
