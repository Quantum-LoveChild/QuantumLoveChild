// Import request and cheerio libraries
const request = require('request');
const cheerio = require('cheerio');
var mysql = require("mysql");
const sentiment = require("sentiment");
const password = require("../pw/pw.js")

module.exports = function(app){

coindeskArticleScrape();



function coindeskArticleScrape(){

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

		connection.connect(function(err) {
		  if (err) throw err;
		  console.log("connected as id " + connection.threadId + "\n");
		});

		// connection.query('DELETE FROM coindesk_articles', function(error, results, fields){
	 //   	if (error) throw error;
	 //   	// console.log(results);
	 //   })

	

		// Set an scraping url
		let url = "https://www.coindesk.com/";
	 	
	

		// Creating the function to scrape
		request.get(url, function(error, response, html){
	    // Use cheerio to parse and create the jQuery-like DOM based on the retrieved html string
	    let $ = cheerio.load(html);

	    const articleTitle =  [];
	    const articleLink = [];
	    
	
	   //  // Find the element node which contains the title and retrieve it's text
	   // var featuredArticle = $('.featured-article-title').text();
	
	   $('.fade').each(function(i, elem){

	   
	   
	   	articleLink[i] = $(this).attr("href")
	   	articleTitle[i] = $(this).attr("title")
	   	var articleTitleSentiment = sentiment($(this).attr("title"));
	   	console.log("This is Our Sentiment", articleTitleSentiment );
	   
	   let newArticleRecord = {
	   	article_title: articleTitle[i],
	   	article_link: articleLink[i],
	   	sentiment_score: articleTitleSentiment.score,
	   	sentiment_comparative: articleTitleSentiment.comparative,
	   	sentiment_tokens: JSON.stringify(articleTitleSentiment.tokens),
	   	sentiment_positive_words: JSON.stringify(articleTitleSentiment.positive),
	   	sentiment_negative_words: JSON.stringify(articleTitleSentiment.negative)
	   }

	   connection.query('INSERT INTO coindesk_articles SET ?', newArticleRecord, function(error, results, fields){
	   	if (error) throw error;
	   	console.log(results);
	   })

	   });

	 
	   // Logging the Article Name; and some more stuff to come. 
	   console.log(articleTitle);
	   console.log(articleLink);
	  

	});	   
}

}




