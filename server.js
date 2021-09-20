const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');

// const items = require('./routes/api/items');

const app = express();

// Middleware
app.use(express.json());

// Db config

// const db = require('./config/keys').mongoURI;
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use routes

// app.use('/api/items', items);
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

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
