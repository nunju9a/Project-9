const express = require('express');
// Construct a router instance.
const router = express.Router();
const User = require("../models").User;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

//Handler to repeate try/catches
const asyncHandler = cb => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(err) {
      console.log('Oops - There was an error with the App!');
      next(err);
    }
  }
}

//User authentication middleware
const authenticateUser = async (req, res, next) => {
  let message;
  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);
  if(credentials) {
    //Find user with matching email address
    const user = await User.findOne({
        raw: true,
        where: {
          emailAddress: credentials.name,
        },
    });
    //If user matches email
    if(user) {
      // Use the bcryptjs npm package to compare the user's password
      // (from the Authorization header) to the user's password
      // that was retrieved from the data store.
      const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
      //If password matches
      if(authenticated) {
        console.log(`Authentication successful for user: ${user.firstName} ${user.lastName}`);
        if(req.originalUrl.includes('courses')) {
          //If route has a courses endpoint, set request userId to matched user id
          req.body.userId = user.id;
        } else if(req.originalUrl.includes('users')) {
          //If route has a users endpoint, set request id to matched user id
          req.body.id = user.id;
        }
      } else {
        //Otherwise the Authentication failed
        message = `Authentication failed for user: ${user.firstName} ${user.lastName}`;
      }
    } else {
      // No email matching the Authorization header
      message = `User not found for email address: ${credentials.name}`;
    }
  } else {
    //No user credentials/authorization header available
    message = 'Authorization header not found';
  }
  // Deny Access if there is anything stored in message
  if(message) {
    console.warn(message);
    const err = new Error('Access Denied');
    err.status = 401;
    next(err);
  } else {
    //User authenticated
    next();
  }
}

//'GET/api/users 200' - // Route that returns the current authenticated user.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = await User.findByPk(
      req.body.id,
      {
        // Exclude private or unecessary info
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      }
    );
    res.json(user);
  })
);

//'POST/api/users 201' - Creates user
router.post('/users', asyncHandler(async (req, res) => {
    //If there is a password
    if(req.body.password) {
      //Hash the password and then attempt to create a new user
      req.body.password = await bcryptjs.hashSync(req.body.password);
      // Model validations for User model
      await User.create(req.body);
    } else {
      // Model validations for User model
      await User.create(req.body);
    }
    // Set response location and status to 201 if successful
    res.location('/');
    res.status(201).end();
  })
);
  module.exports = router;