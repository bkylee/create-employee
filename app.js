/**
 * creates an "express" app object (named "app" by convention), sets up the app  with various settings and middleware, and then exports the app from the module.
 * in the www entry-point file, it's this module.exports object that is supplied to the caller when this file is imported.
 * first we import useful node libraries using require()
 * - http-errors, express, morgan, cookie-parser
 *
 * then we require() modules from our routes directory. these modules/files contain code for handling particular sets of related "routes" (URL paths).
 *
 * next, we create the "app" object using our imported express modul,e then use it to set up the view (template) engine.
 *  1. set the 'views' value to specivy th efolder where the templates will be stored ('/views')
 *  2. set the 'view engine' value to specify the template library
 *
 * next set of functions call app.use() to add the middleware libaries that we imported above into the request handling chain
 *  ex. express.json() and express.urlencoded() are needed to populate the req.body with the forms fields.
 * after these libraries we also use the express.static middleware, which makes Express serve all the static files in the /public directory in the project root.
 *
 * after setting up middleware, add the (previously imported) route-handling code to the request handling chain.
 * imported code will define particular routes for the different parts of the site.
 *
 * last middleware in teh fileadds handler methods for errors and HTTP404 responses
 *
 * last step is to add it to the module exports (to allow it to be imported to /bin/www)
 */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
