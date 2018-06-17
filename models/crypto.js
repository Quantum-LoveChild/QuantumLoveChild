module.exports = function(sequelize, DataTypes){
	var Pricing = sequelize.define("Pricing",{
		currency_id:{
			type: DataTypes.STRING,
			allowNull: true,
		},
		name:{
			type: DataTypes.STRING, 
			allowNull: true
		},
		symbol: {
			type: DataTypes.STRING,
			allowNull: true
		},
		rank: {
			type: DataTypes.INTEGER, 
			allowNull: true
		},
		price_usd:{
			type: DataTypes.STRING,
			allowNull: true
		},
		price_btc:{
			type: DataTypes.STRING,
			allowNull: true
		},
		twentyfour_volume_usd: {
			type: DataTypes.STRING,
			allowNull:true
		},
		market_cap_usd: {
			type: DataTypes.STRING,
			allowNull: true
		},
		available_supply:{
			type: DataTypes.STRING,
			allowNull: true
		},
		total_supply:{
			type: DataTypes.STRING,
			allowNull:true
		},
		max_supply: {
			type: DataTypes.STRING,
			allowNull: true
		}, 
		percent_change_1h: {
			type: DataTypes.STRING,
			allowNull: true
		},
		percent_change_24h: {
			type: DataTypes.STRING,
			allowNull: true
		},
		percent_change_7d: {
			type: DataTypes.STRING,
			allowNull: true
		},
		last_updated: {
			type: DataTypes.STRING,
			allowNull: true
		}

	});
	return Pricing;
}







// {
// "id": "bitcoin",
// "name": "Bitcoin",
// "symbol": "BTC",
// "rank": "1",
// "price_usd": "14000.1",
// "price_btc": "1.0",
// "24h_volume_usd": "21525400000.0",
// "market_cap_usd": "234604393734",
// "available_supply": "16757337.0",
// "total_supply": "16757337.0",
// "max_supply": "21000000.0",
// "percent_change_1h": "4.71",
// "percent_change_24h": "-10.0",
// "percent_change_7d": "-21.23",
// "last_updated": "1513975153"
// },