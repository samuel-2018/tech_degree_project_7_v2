var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var compression = require("compression");
// Private key for Unsplash
const apiKey = require("./config.js");
const axios = require("axios");
const cors = require("cors");

var app = express();

// Enables all CORS requests
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Compresses all routes
app.use(compression());

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the React Gallery App API!"
  });
});

app.get("/api/:query", (req, res, next) => {
  try {
    // Gets search query.
    const query = req.params.query;

    // Unsplash limits developer API requests to 50 per hour.

    axios
      .get("https://api.unsplash.com/search/photos/", {
        params: {
          client_id: apiKey,
          query: query,
          per_page: 24
        }
      })
      .then(result => {
        res.send(result.data);
      });
  } catch (error) {
    next(error);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    message: err.message
    // error: {}
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
