var db = require("../models");
var mysql = require("mysql");
var password = require("../pw/pw.js");

// create new row for data. 

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

	
	app.post("/api/crypto-data", function(req, res){
		// console.log(req.body);
		// console.log("This is Working");
		db.Pricing.create({
			currency_id: req.body.currency_id,
			name: req.body.name,
			symbol: req.body.symbol,
			rank: req.body.rank,
			price_usd: req.body.price_usd,
			price_btc: req.body.price_btc,
			twentyfour_volume_usd: req.body.twentyfour_volume_usd,
			market_cap_usd: req.body.market_cap_usd,
			available_supply: req.body.available_supply,
			total_supply: req.body.total_supply,
			max_supply: req.body.max_supply,
			percent_change_1h: req.body.percent_change_1h,
			percent_change_24h: req.body.percent_change_24h,
			percent_change_7d: req.body.percent_change_7d,
			last_update: req.body.last_update
		}).then(function(dbPost){
			res.json(dbPost);
			// console.log(dbPost);
		});
	});

	////////////////Starting route to get data about the exchanges. 
	app.get("/api/getExchangeData", function(req, res){
		connection.query("SELECT DISTINCT (exchangevolumes.exchange_name), twentyfour_hour_volume, country, tether_exposure, fiat_pairs, legit_rating, max(updated_at) FROM exchangevolumes INNER JOIN exchange_master_table ON exchangevolumes.exchange_name = exchange_master_table.exchange_name  GROUP BY exchange_name ORDER BY twentyfour_hour_volume DESC LIMIT 6", function(error, results, fields){
			if(error) throw error;
			res.json(results)
			console.log(results);
			})
		});


	////////////////////Starting Route to get Exchange data sumed volume each day by country
	app.get("/api/getExchangeData/country", function(req, res){
		connection.query("SELECT DISTINCT (exchangevolumes.exchange_name), twentyfour_hour_volume, country, tether_exposure, fiat_pairs, legit_rating, max(updated_at) FROM exchangevolumes INNER JOIN exchange_master_table ON exchangevolumes.exchange_name = exchange_master_table.exchange_name  GROUP BY exchange_name ORDER BY twentyfour_hour_volume DESC LIMIT 6", function(error, results, fields){
			if(error) throw error;
			res.json(results)
			console.log(results);
		})
	});

	app.get("/api/coindeskArticles", function(req, res){
		connection.query("Select DISTINCT (Article_title), article_link, id FROM coindesk_articles ORDER BY id DESC LIMIT 8", function(error, results, fields){
			console.log(results);
			res.json(results);
		})
	})

	app.get("/api/cointelegraphArticles", function(req, res){
		connection.query("Select DISTINCT (Article_title), article_link, id FROM cointelegraph_articles WHERE Article_link like '%cointelegraph.com%' And Article_title not in ('Store', 'Buy Bitcoin', 'People', 'Heatmap') ORDER BY id DESC LIMIT 8", function(error, results, fields){
			console.log(results);
			res.json(results);
		})
	})

	app.get("/api/cryptonewsScrape", function(req, res){
		connection.query("Select DISTINCT (article_title), article_link FROM cryptonews_articles  WHERE article_link LIKE '%news.bitcoin.com%'  and article_link not like '%/page/%' order by ID DESC LIMIT 8", function(error, results, fields){
			res.json(results);
			})
		})



}