const express = require("express");
//const Sequelize = require("sequelize");
//const User = require("../models").User;
const router = express.Router();
//const Op = Sequelize.Op;
//const app = express();


// setup json parsing and access to req.body
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

router.get('/users', (req, res) => {
    res.json({
      message: 'Welcome to the users route',
    });
  });

 
  module.exports = router;