// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
// var db = require("./models");
// var scrape = require("./scrape.js");




// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory to be served
app.use(express.static("views"));

// Here are all my scraping scripts. 
require("./scrape.js")(app);
require("./coinDeskArticleScrape.js")(app);
require("./cointelegraphScrape.js")(app);
require("./cryptonewScrape.js")(app);


// Routes
// =============================================================
require("./routes/api-routes.js")(app);



// Starts the server to begin listening
// =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });



