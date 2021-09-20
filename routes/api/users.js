const express = require('express');
const User = require('../../models/User'); // User model
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Item Model
const Item = require('../../models/User');

// @route GET api/users
// @desc  Get all users
// access Public 

router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple Validation
    if( !name || !email || !password ){
          return res.status(400).json({ msg: "Please enter all fields " });
    }
    
    // Check for existing user
    User.findOne({ email })
        .then(user => {
             if(user){
                  return res.status(400).json({ msg: "User already exists" });
             }
             const newUser = new User({
                  name,
                  email,
                  password
             });
             // Create salt and hash
             bcrypt.genSalt(10, (err, salt) =>{
                  bcrypt.hash(newUser.password, salt, (err, hash)=>{
                       if(err){
                            throw err;
                       }
                       newUser.password = hash;
                       newUser.save()
                              .then(user =>{
                                   jwt.sign(
                                        { id: user.id }, // payload
                                        config.get("jwtSecret"), // secret/private key
                                        { expiresIn: 3600 }, // options
                                        (err, token) => { // callback
                                             if(err){
                                                  throw err;
                                             }
                                             res.json({
                                                  token,
                                                  user:{
                                                       id: user.id,
                                                       name: user.name,
                                                       email: user.email
                                                  }
                                             });
                                        }
                                   )
                                   
                              });
                  })
             })
        })
});

module.exports = router;