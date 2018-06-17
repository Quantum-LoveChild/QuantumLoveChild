// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
// var password = require("./pw/pw.js");




// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// app.use(function (error, req, res, next) {
//   if (!error) {
//     next();
//   } else {
//     console.error(error.stack);
//     res.send(500);
//   }
// });

// Static directory to be served
// app.use(express.static("views")); /// clearing out front end notes. 

// Here are all my scraping scripts. 
require("./scrapers/scrape.js")(app);
require("./scrapers/coinDeskArticleScrape.js")(app);
require("./scrapers/cointelegraphScrape.js")(app);
require("./scrapers/cryptonewScrape.js")(app);


// Routes
// =============================================================
// require("./routes/api-routes.js")(app);



// Starts the server to begin listening
// =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });



