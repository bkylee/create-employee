/**
 * loads the epxress module and uses it to get an express.Router object.
 * then we specify a route on that object
 * exports the router from the module (this allows the file to be imported to app.js)
 *
 * route defines a callback that will be invoked whenver an HTTP GET request with the correct pattern is detected.
 *  the matching patttern is the route specified when the module is imported ('/users') + whatever is defined in this file ('/').
 *  therefore, this route will be used when a URL of /users/ is received
 *
 * 'next' is the 3rd argument in the callback function and is hence a middlware function rather than a simple route callback.
 * used when you want to have multiple route handlers to the '/' route path
 */

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
