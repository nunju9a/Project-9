const express = require('express');

const router = express.Router();


// const Sequelize = require("sequelize");
// const Course = require("../models").Course;

//const Op = Sequelize.Op;


router.get('/courses', (req, res) => {
  res.json({
    message: 'Welcome to the courses path!',
  });
});

 
  module.exports = router;