var mysql = require("mysql");
var moment = require("moment");
const password = require("../pw/pw.js");

module.exports = function(app){
	

	var connection = mysql.createConnection({
	  host: "localhost",
	  port: 3306,

	  // Your username
	  user: "root",

	  // Your password
	  password: password,
	  database: "crypto_price_db"
	});



	app.get("/api/testCount", function(req, res){
		// console.log(req);
		connection.query("SELECT COUNT (*) as totalRecords FROM exchangevolumes",  function(error, results, fields){
			console.log(results);
			res.json(results);
		})
	});


	app.get("/api/coindeskArticles", function(req, res){
		connection.query("Select DISTINCT (Article_title), article_link, id FROM coindesk_articles ORDER BY id DESC LIMIT 8", function(error, results, fields){
			console.log(results);
			res.json(results);
		})
	})

	app.get("/api/cointelegraphArticles", function(req, res){
		connection.query(" Select DISTINCT (Article_title), article_link, id FROM cointelegraph_articles LIMIT 8", function(error, results, fields){
			console.log(results);
			res.json(results);
		})
	})

	app.get("/api/cryptonewsScrape", function(req, res){
		connection.query(" Select DISTINCT (article_title), article_link FROM cryptonews_articles WHERE article_link LIKE '%news.bitcoin.com%' order by ID DESC LIMIT 8", function(error, results, fields){
			res.json(results);
		})
	})


	app.post("/api/crypto-data", function(req, res){
		console.log("this is our coinmarketCap data", req.body);
		connection.query('INSERT INTO pricings SET ?', req.body,
			function(error, result, fields){
				if(error) throw error;
				console.log("this is the Coinmarket call", result);
			})
	})

	// Starting route to get data about the exchanges.  Need to pul 
	app.get("/api/getExchangeData", function(req, res){
		connection.query("SELECT DISTINCT (exchangevolumes.exchange_name), twentyfour_hour_volume, country, tether_exposure, fiat_pairs, legit_rating, max(updated_at) FROM exchangevolumes INNER JOIN exchange_master_table ON exchangevolumes.exchange_name = exchange_master_table.exchange_name  GROUP BY exchange_name ORDER BY twentyfour_hour_volume DESC LIMIT 6", function(error, results, fields){
			if(error) throw error;
			res.json(results)
			console.log(results);
		})
		
	});




	};
