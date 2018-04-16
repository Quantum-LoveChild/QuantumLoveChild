// Import request and cheerio libraries
const request = require('request');
const cheerio = require('cheerio');
var mysql = require("mysql");
const password = require("../pw/pw.js");



module.exports = function(app){
// Establishing a MySQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: password,
  database: "crypto_price_db"
});

// Starting the MySQL connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

exchangeScrape();
// setInterval(function(){
// 	exchangeScrape();
// }, 50000);



function exchangeScrape(){

	//Creating an array of exchanges
	const exchangeList = ["okex", "gdax", "poloniex", "binance", "upbit", "bitfinex", "bithumb", "huobi",
	 "bittrex", "hitbtc", "kraken", "bitz", "bitstamp", "bitflyer", "coinone", "coinbene",
	 "btcc", "coinegg", "wex", "korbit", "exx", "bits-blockchain", "gemini", "bibox", 
	 "kucoin", "coinsbank", "exmo", "liqui", "gate-io", "simex", "livecoin", "zb-com",
	  "bitbank", "bitbank", "yobit", "bitbay", "cex-io", "bitcoin-indonesia", "bitinka", 
	  "aex", "lakebtc", "itbit", "coinnest", "tidex", "lbank", "cryptopia", "xbtce", "rightbtc",
	  "btcmarkets", "getbtc", "paribu", "bxthailan", "btctrade-im", "koinex", 
	  "zaif", "exrates", "c2cx", "zebpay", "luno", "btcturk", "negociecoins", 
	  "quadrigacx", "neraex", "vebitcoin", "koineks", "fatbtc", "topbtc",
	  "bigone", "coinexchange", "allcoin", "idex", "bitso", "foxbit", "mercado-bitcoin", 
	   "btc-alpha", "coinsqaure", "bancore-network", "coinroom", "qryptos", 
	   "coinfloor", "quoine", "independent-reserve", "dsx", "mr-exchange", "adiosmarket", 
	    "bitonic", "bl3p", "coinex", "bitmarket", "coinrail", "litebit", "coinut", 
	    "okcoin-intl", "koinim", "bitshare-asset-exchange", "qbtc", "chaoex", "mercatox",
	    "waves-decentralized-exchange", "altcoin-trader", "coss", "gatehub", "tidebit", 
	    "acx", "trade-by-trade", "the-rock-trading", "fargobase", "cobinhood", "etherdelta"];



	// Loop through the array and scrape for every page that it hits. 
	for(let i=0; i<exchangeList.length; i++){
		// Set an example exchange url
		let exchangeUrl = 'https://coinmarketcap.com/exchanges/'+exchangeList[i]+"/";
	 
		// HTTP GET of the youtube website using request
		request.get(exchangeUrl, function(error, response, html){
	    // Use cheerio to parse and create the jQuery-like DOM based on the retrieved html string
	    let $ = cheerio.load(html);
	    // Find the element node which contains the title and retrieve it's text
	    let exchangeName = $('h1.text-large').text();
	    exchangeName = exchangeName.toLowerCase().trim();

	    let exchangeTwentyHourVolume = $('span.text-large2').text();
	    exchangeTwentyHourVolume = Number(exchangeTwentyHourVolume.replace(/[^0-9\.-]+/g,""));
	    console.log("OUR NEW INTEGER LOOKS LIKE THIS:")
	  	
	  	let newCryptoExchangePrice = {
	  		exchange_name: exchangeName,
	  		twentyfour_hour_volume: exchangeTwentyHourVolume,
	  		website: "www."+exchangeName+".com"
	  	}

	    // Output the result
	    console.log("The Link to the Exchange Data is", exchangeUrl, "The Exchange Name is: ", exchangeName, "The 24 Hour Volume is: ", exchangeTwentyHourVolume);
	    // Output: The title of the video https://www.youtube.com/watch?v=7fYKMCCPh28 is The Earth: 4K Extended Edition
		    connection.query('INSERT INTO exchangevolumes SET ?', newCryptoExchangePrice, function (error, results, fields) {
		  if (error) throw error;
		  // Neat!
			});
		});

	}
}
}



