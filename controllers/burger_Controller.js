var express = require("express");

var router = express.Router();

// // Import the model (burgerat.js) to use its database functions.
// var burger = require("../models/burger.js");
// Requiring our models
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  // findAll returns all entries for a table when used with no options
  db.burgers.findAll({}).then(function (dbburger) {
    // We have access to the todos as an argument inside of the callback function
    res.render("index", {burgers: dbburger});
  });
});

router.post("/api/burgers", function (req, res) {
  // create takes an argument of an object describing the item we want to insert
  // into our table. In this case we just we pass in an object with a text and
  // complete property
  db.burgers.create({
    burger_name: req.body.name,
    devoured: false
  }).then(function (dbburger) {
    // We have access to the new todo as an argument inside of the callback function
    //res.json(dbburger);
    console.log(dbburger.insertId);
    res.json({ id: dbburger.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  // Update takes in two arguments, an object describing the properties we want to update,
  // and another "where" object describing the todos we want to update
  db.burgers.update({
    burger_name: req.body.burger_name,
    devoured: true
  }, {
      where: {
        id: req.params.id
      }
    })
    .then(function (dbburger) {
      res.status(200).end();
    });
});

router.delete("/api/burgers/:id", function (req, res) {
  // Destroy takes in one argument: a "where object describing the todos we want to destroy
  db.burgers.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (dbburger) {
      res.status(200).end();
    });
});


// Export routes for server.js to use.
module.exports = router;