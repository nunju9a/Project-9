const express = require('express');

const router = express.Router();

// const Sequelize = require("sequelize");
// const User = require("../models").User;
//const Op = Sequelize.Op;


router.get('/users', (req, res) => {
  res.json({
    message: 'Welcome to the users path!',
  });
});

 
  module.exports = router;