const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route GET api/auth
// @desc  Auth user
// access Public 

router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Simple Validation
    if( !email || !password ){
          return res.status(400).json({ msg: "Please enter all fields" });
    }
    
    // Check for existing user
    User.findOne({ email })
        .then(user => {
             if(!user){
                  return res.status(400).json({ msg: "User does not exist" });
             }
             
            // Validate password
            bcrypt.compare(password, user.password)
                  .then(isMatch => {
                      if(!isMatch){
                          res.status(400).json({ msg: "Invalid credentials" });
                      }

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
        });
});

// @route GET api/auth/user
// @desc  Get user data
// access Private

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password') // to disregard the password, so that the user gets sent without the password
        .then(user => res.json(user))
});

module.exports = router;