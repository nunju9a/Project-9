const express = require("express");
//const Sequelize = require("sequelize");
//const Course = require("../models").Course;
const router = express.Router();
//const Op = Sequelize.Op;
//const app = express();


// setup json parsing and access to req.body
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

router.get('/courses', (req, res) => {
    res.json({
      message: 'Welcome to the courses route',
    });
  });

 
  module.exports = router;