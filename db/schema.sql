USE crypto_price_db;
CREATE TABLE exchangevolumes(
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	exchange_name NVARCHAR(50),
	twentyfour_hour_volume INTEGER(200), 
	website VARCHAR (50),
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);

CREATE TABLE coindesk_articles (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	article_title NVARCHAR(200),
	article_link NVARCHAR(200),
	sentiment_score FLOAT,
	sentiment_comparative FLOAT,
	sentiment_tokens NVARCHAR(400),
	sentiment_positive_words NVARCHAR(300),
	sentiment_negative_words NVARCHAR(300),
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	PRIMARY KEY(id)
)

CREATE TABLE cointelegraph_articles (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	article_title NVARCHAR(200),
	article_link NVARCHAR(200),
	sentiment_score FLOAT,
	sentiment_comparative FLOAT,
	sentiment_tokens NVARCHAR(400),
	sentiment_positive_words NVARCHAR(300),
	sentiment_negative_words NVARCHAR(300),
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
)


CREATE TABLE cryptonews_articles (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	article_title NVARCHAR(200),
	article_link NVARCHAR(200),
	sentiment_score FLOAT,
	sentiment_comparative FLOAT,
	sentiment_tokens NVARCHAR(400),
	sentiment_positive_words NVARCHAR(300),
	sentiment_negative_words NVARCHAR(300),
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
)

CREATE TABLE pricings (
  id int(11) NOT NULL AUTO_INCREMENT,
  currency_id varchar(255) DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  symbol varchar(255) DEFAULT NULL,
  rank int(11) DEFAULT NULL,
  price_usd varchar(255) DEFAULT NULL,
  price_btc varchar(255) DEFAULT NULL,
  twentyfour_volume_usd varchar(255) DEFAULT NULL,
  market_cap_usd varchar(255) DEFAULT NULL,
  available_supply varchar(255) DEFAULT NULL,
  total_supply varchar(255) DEFAULT NULL,
  max_supply varchar(255) DEFAULT NULL,
  percent_change_1h varchar(255) DEFAULT NULL,
  percent_change_24h varchar(255) DEFAULT NULL,
  percent_change_7d varchar(255) DEFAULT NULL,
  last_updated varchar(255) DEFAULT NULL,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) 

