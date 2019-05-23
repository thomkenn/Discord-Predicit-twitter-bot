const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var mysql = require('mysql');
// Initialize Discord Bot
const bot = new Discord.Client();

var i = 0;
var z;
var randomNumber = Math.floor(Math.random() * 16);
var ajpostcounter = 0;
var kdogpostcounter = 0;
var registername = auth.owner;
var len1 = 0;
var len2 = 0;
var len3 = 0;
var randomNumberP = 0;
var randomNumberC = 0;
var randomNumberB = 0;
var today = new Date();
var electionday = new Date(2020, 10, 3);
var shutdownday = new Date(2018, 11, 22);
var lat = 0;
var lng = 0;
var R = 6371e3; // metres
var beto = 0;
var bernie = 0;
var gillibrand = 0;
var kamala = 0;
var a = 0;
var c = 0;
var betindex = 0;
var cazbase = 'https://cdn1.arizona.vote/data/4/0/featured_races_4_0_en_'
var cazint = 0;
var cazend = '.json';
var errcheck = 0;
var output = "";
var lastpi = null;
var comp = 0;
var cnums = 0;
var Twitter = require('twitter');
var beto1 = 0;
var kamala1 = 0;
var gillibrand1 = 0;
var bernie1 = 0;
var klobuchar1 = 0;
var warren1 = 0;
var prescnums = 0;
var currnegrisk = "";
var currnegriskv2 = "";
var negriskcounter = 0;
var access = "";
var cost = 0;
var payout = 0;
var cone = 0;

//Twitter Login
var client = new Twitter({
  consumer_key: auth.Twitter_consumer_key,
  consumer_secret: auth.Twitter_consumer_secret,
  access_token_key: auth.Twitter_access_token_key,
  access_token_secret: auth.Twitter_access_token_secret
});

//Paramaters
var params = {screen_name: 'nodejs'};

//Login to a RDS database
var con = mysql.createConnection({
	host: auth.SQLhost,
	user: auth.SQLuser,
	password: auth.SQLpassword,
	database: auth.SQLdatabase
});

try{
//Tracking the amount of posts stored from AJ
con.query("SELECT amount from randomvars where nameof = 'ajcounter'", function (err, result) {
		if (err) throw err;
		ajpostcounter = result[0].amount;
		//console.log(result);
});

//Used for storing contract nums
con.query("SELECT amount from randomvars where nameof = 'prescnums'", function (err, result) {
		if (err) throw err;
		prescnums = result[0].amount;
		//console.log(result);
});

//Used for storing contract nums
con.query("SELECT amount from randomvars where nameof = 'contractnums'", function (err, result) {
		if (err) throw err;
		cnums = result[0].amount;
		//console.log(cnums + "THIS IS THE IMPORTANT ONE");
});

//Tracking the amount of posts stored from kdog
con.query("SELECT amount from randomvars where nameof = 'kdogcounter'", function (err, result) {
	if (err) throw err;
	kdogpostcounter = result[0].amount;
});
}
catch (err) {
	console.log("error with query");
}

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//login with bot
bot.login(auth.token)
 .then(console.log("loggedin"));

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
	bot.users.get(auth.owner).send("turned on");
});

bot.on("message", async message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    const check = message.content.toLowerCase().trim().split(/ +/g);

	if (check[0] == 'what' && check[1] == 'is' && check.length >= 5 && !isNaN(check[2]))
		{
			var right = parseFloat(check[4]);
			//console.log(check.length);
			if (!isNaN(right))
			{
				if (check[3] == 'times' || check[3] == 'x' || check[3] == '*')
				{
					message.channel.send(check[2] + " * " + right + " = " + check[2] * right);
				}
				else if (check[3] == 'dividedby' || check[3] == "/")
				{
					if (right != 0)
						message.channel.send(check[2] + " / " + right + " = " + check[2] / right);
					else
						message.channel.send(check[2] + " / " + right + " = dems cucked.");
				}
				else if (check[3] == 'plus' || check[3] == '+')
				{
					var left = parseFloat(check[2]) + parseFloat(check[4]);
					message.channel.send(check[2] + " + " + right + " = " + (left));
				}
				else if (check[3] == 'minus' || check[3] == '-')
				{
					message.channel.send(check[2] + " - " + right + " = " + (check[2] - right));
				}
			}
			else if (check.length == 6)
			{
				right = parseFloat(check[5]);
				//console.log(right);
				if (!isNaN(right))
				{
					if (check[3] == 'multiplied' && check[4] == 'by')
					{
						if(!isNaN(right))
						{
							message.channel.send(check[2] + " * " + right + " = " + (check[2] * right));
						}
					}
					else if (check[3] == 'divided' && check[4] == 'by')
					{
						if(!isNaN(right))
						{
							if (right == '0')
								message.channel.send(check[2] + " / " + right + " = dems cucked");
							else
								message.channel.send(check[2] + " / " + right + " = " + (check[2] / right));
						}
					}
				}
			}
		};
	try {
	con.query("select uglycat from UGLYCAT", function (err, result) {
				if (err) throw err;
				len1 = result.length;
	});

	con.query("SELECT phrase from PHRASES", function (err, result) {
				if (err) throw err;
				len2 = result.length;

	});

	con.query("SELECT burn from BURNS", function (err, result) {
				if (err) throw err;
				len3 = result.length;
	});

	con.query("select id from bets", function (err, result) {
				if (err) throw err;
				betindex = result.length;
	});

	randomNumberB = Math.floor(Math.random() * len3);
	randomNumberP = Math.floor(Math.random() * len2);
	randomNumberC = Math.floor(Math.random() * len1);
	}
	catch (err) {
		console.log("error with select burns");
	}

	if (message.attachments.first() != null)
	{
		if( message.attachments.first().filename == "kdog-bush.gif" && message.author.id == 181830914022572032){
			ajpostcounter = ajpostcounter + 1;
			con.query("update randomvars SET amount = " + ajpostcounter + " where nameof = 'ajcounter'");
			con.query("commit");
			//console.log(ajpostcounter);
		}
	};
	if (message.author.id == registername)
	{
		kdogpostcounter = kdogpostcounter + 1;
		con.query("update randomvars SET amount = " + kdogpostcounter + " where nameof = 'kdogcounter'");
		con.query("commit");
	}
    if (message.toString().substring(0, 1) == '!') {
        const args = message.content.slice(1).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
	    console.log(cmd);

        //args = args.splice(1);
        switch(cmd) {
            case 'ping':
				var sendMessage = '<@' + message.author.id + '> PONG!!!!!!!!!!!!!';
				message.channel.send(sendMessage);
				break;
			case 'uglycat':
				con.query("SELECT uglycat from UGLYCAT", function (err, result) {
				if (err) throw err;
				var sendMessage = '<@' + message.author.id + '> ' + result[randomNumberC].uglycat;
				message.channel.send(sendMessage);
			});
				break;
			case 'counter':
				var sendMessage = '<@' + message.author.id + '> AJ Gif Posts: ' + ajpostcounter + "\nKdog comments: " + kdogpostcounter + "\nRatio: " + (ajpostcounter/kdogpostcounter*100).toFixed(2) + "%, which is " + ((((ajpostcounter/kdogpostcounter)/(1/200))*100)-100).toFixed(2) + "% more frequent than cab said";
				message.channel.send(sendMessage);
				break;
			case 'caravan':
				/*
				var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
				var oReq = new XMLHttpRequest();
				oReq.addEventListener("load", reqListener);
				oReq.open("GET", "https://cis.org/Migrant-Caravan-Map");
				oReq.send();
				*/
				message.channel.send("fuck if i know");
				break;
			case 'predictit':
				if (lastpi == null)
				{
					message.channel.send("Error retrieving data. Please wait 60 seconds and try again");
					break;
				}
				z = message.toString().substring(11, (message.toString().length));
				console.log(z);
				//console.log(lastpi.markets);
				if (z == "random")
				{
					a = lastpi.markets.length - 1;
					a = Math.floor((Math.random() * a));
					z = lastpi.markets[a].name;
					message.channel.send("Random market selected: " + z);
				}
				a = 0;
				for (increment in lastpi.markets)
				{
					if (z == lastpi.markets[increment].name)
					{
						z = "```\n";
						for (innerinc in lastpi.markets[increment].contracts)
							z = z + "Contract Name: " + lastpi.markets[increment].contracts[innerinc].name + "\nLastTradedPrice: " + lastpi.markets[increment].contracts[innerinc].lastTradePrice + "\n";
						z = z + "```";
						z = lastpi.markets[increment].url + "\n" + z;
						message.channel.send(z);
						a = 1;
						break;
					}
					else if (((lastpi.markets[increment].name).toLowerCase()).includes(z.toLowerCase()))
					{
						i = "```\First match found:\n";
						i = i + "Market found: " + lastpi.markets[increment].name + "\n";
						for (innerinc in lastpi.markets[increment].contracts)
							i = i + "Contract Name: " + lastpi.markets[increment].contracts[innerinc].name + "\nLastTradedPrice: " + lastpi.markets[increment].contracts[innerinc].lastTradePrice + "\n";
						i = i + "```";
						i = lastpi.markets[increment].url + "\n" + i;
						a = 2;
					}
				}
				if (a == 0)
				{
					console.log(lastpi);
					z = "Sorry, market not found. Please be sure to use exact words from market title.";
					message.channel.send(z);
				}
				else if (a == 2)
				{
					message.channel.send(i);
				}
				break;
			case 'posrisk':
				output = 0;
				z = "```\nCurrent Pos Risk:\n";
				if (lastpi == null)
				{
					message.channel.send("Error retrieving data. Please wait 60 seconds and try again");
					getPIdata();
					break;
				}
				for (increment in lastpi.markets)
					{
						//console.log(mydata.markets[increment].name);
						if (lastpi.markets[increment].contracts.length >= 2)
						{
							i = 0;
							for(innerinc in lastpi.markets[increment].contracts)
							{
								if (lastpi.markets[increment].contracts[innerinc].bestBuyYesCost == null)
									i = 1;
								else if (lastpi.markets[increment].contracts[innerinc].bestBuyYesCost > i)
								{
									i = lastpi.markets[increment].contracts[innerinc].bestBuyYesCost;
									a = innerinc;
								}
							}
							if (i < .95)
							{
								i = 1 - i;
								i = i * .9;
								for (innerinc in lastpi.markets[increment].contracts)
								{
									if (innerinc != a)
									{
										i = i - lastpi.markets[increment].contracts[innerinc].bestBuyYesCost;
									}
								}
								if (i > 0)
								{
									z = z + "Market: " + lastpi.markets[increment].name + "\nPos Risk: " + i.toFixed(2) +"\nURL: " + lastpi.markets[increment].url + "\n";
									output = 1;
								};
							}
						}
					}
				z = z + "```";
				if (output == 0)
					z = "No pos risk currently available";
				message.channel.send(z);
        break;
			case 'negriskv2':
				output = 0;
				z = message.toString().substring(11, (message.toString().length));
				console.log(z);
				if (lastpi == null)
				{
					message.channel.send("Error retrieving data. Please wait 60 seconds and try again");
					getPIdata();
					break;
				}
				a = 0;
				for (increment in lastpi.markets)
				{
					if (z == lastpi.markets[increment].name)
					{
						output = increment;
						a = 1;
						break;
					}
					else if (((lastpi.markets[increment].name).toLowerCase()).includes(z.toLowerCase()))
					{
						i = lastpi.markets[increment].name;
						if (a != 1)
							output = increment;
						a = 2;
					}
				}
				if (a == 0)
				{
					z = "Sorry, market not found. Please be sure to use exact market title.";
					message.channel.send(z);
					break;
				}
				else if (a == 2)
				{
					z = i;
				}
				if (lastpi.markets[output].contracts.length >= 2)
				{
					i = 0;
					cost = 0;
					payout = 0;
					cone = 0;
					if (lastpi.markets[output].contracts[0].bestBuyNoCost == null)
						cone = 99;
					else
						cone = lastpi.markets[output].contracts[0].bestBuyNoCost * 100;
					payout = (90 + .1 * cone) * (lastpi.markets[output].contracts.length - 1);
					cost = cone;
					for(innerinc in lastpi.markets[output].contracts)
					{
						if (innerinc != 0) {
							if (lastpi.markets[output].contracts[innerinc].bestBuyNoCost == null)
							{
								i += 1;
								payout = (90 + .1 * cone) * (lastpi.markets[output].contracts.length - 1 - i);
							}
							else
								cost = cost + (lastpi.markets[output].contracts[innerinc].bestBuyNoCost * 100) * (cone * .1 + 90) / (90 + .1 * (lastpi.markets[output].contracts[innerinc].bestBuyNoCost * 100));
						}
					}
					cost = cost.toFixed(2);
					payout = payout.toFixed(2);
					if (0 <= payout - cost)
					{
						message.channel.send("The cost is: " + cost + " the payout is " + payout + ". Neg risk possible");
					}
					else
						message.channel.send("The cost is: " + cost + " the payout is " + payout + ". Neg risk NOT possible");
				}
				break;
			case 'negrisk':
				output = 0;
				z = message.toString().substring(9, (message.toString().length));
				console.log(z);
				if (lastpi == null)
				{
					message.channel.send("Error retrieving data. Please wait 60 seconds and try again");
					getPIdata();
					break;
				}
				if (z == "top")
				{
					var topmar = [];
					z = "```\nCurrent Neg Risk:\n";
					output = 0;
					for (increment in lastpi.markets)
					{
						//console.log(mydata.markets[increment].name);
						if (lastpi.markets[increment].contracts.length >= 2)
						{
							i = 0;
							for(innerinc in lastpi.markets[increment].contracts)
							{
								if (lastpi.markets[increment].contracts[innerinc].bestBuyNoCost == null)
									i += 0;
								else
									i += (1 - lastpi.markets[increment].contracts[innerinc].bestBuyNoCost);
							}
							a = lastpi.markets[increment].contracts.length;
							topmar.push(i.toFixed(2) + ", Market: " + lastpi.markets[increment].name + "\nURL: " + lastpi.markets[increment].url + "\n");
						}
					}
					topmar.sort();
					topmar.reverse();
					z += topmar[0];
					z += topmar[1];
					z += topmar[2];
					z += topmar[3];
					z += topmar[4];
					z += topmar[5];
					z = z + "```";
					message.channel.send(z);
					break;

				}
				if (z == "all")
				{
					z = "```\nCurrent Neg Risk:\n";
					output = 0;
					for (increment in lastpi.markets)
					{
						//console.log(mydata.markets[increment].name);
						if (lastpi.markets[increment].contracts.length >= 2)
						{
							i = 0;
							for(innerinc in lastpi.markets[increment].contracts)
							{
								if (lastpi.markets[increment].contracts[innerinc].bestBuyNoCost == null)
									i += 0;
								else
									i += (1 - lastpi.markets[increment].contracts[innerinc].bestBuyNoCost);
							}
							a = lastpi.markets[increment].contracts.length;
							if (a == 2) {
								if (i >= 1.06)
								{
									z = z + "Market: " + lastpi.markets[increment].name + "\nNeg Risk: " + i.toFixed(2) +"\nURL: " + lastpi.markets[increment].url + "\n";
									output = 1;
								}
							}
							else if (a == 3) {
								if (i >= 1.08)
								{
									z = z + "Market: " + lastpi.markets[increment].name + "\nNeg Risk: " + i.toFixed(2) +"\nURL: " + lastpi.markets[increment].url + "\n";
									output = 1;
								}							}
							else if (a == 4 || a == 5) {
								if (i >= 1.09)
								{
									z = z + "Market: " + lastpi.markets[increment].name + "\nNeg Risk: " + i.toFixed(2) +"\nURL: " + lastpi.markets[increment].url + "\n";
									output = 1;
								}							}
							else if (a >= 5 && a <= 10) {
								if (i >= 1.10)
								{
									z = z + "Market: " + lastpi.markets[increment].name + "\nNeg Risk: " + i.toFixed(2) +"\nURL: " + lastpi.markets[increment].url + "\n";
									output = 1;
								}							}
							else if (a > 10) {
								if (i >= 1.11)
								{
									z = z + "Market: " + lastpi.markets[increment].name + "\nNeg Risk: " + i.toFixed(2) +"\nURL: " + lastpi.markets[increment].url + "\n";
									output = 1;
								}							}
						}
					}
					z = z + "```";
					if (output == 0)
						z = "No neg risk currently available";
					message.channel.send(z);
					break;
				}
				//console.log(lastpi.markets);
				if (z == "random")
				{
					do {
					a = lastpi.markets.length - 1;
					a = Math.floor((Math.random() * a));
					z = lastpi.markets[a].name;
					i = lastpi.markets[a].contracts.length;
					} while (i < 2);
					message.channel.send("Random market selected: " + z);
				}
				a = 0;
				for (increment in lastpi.markets)
				{
					if (z == lastpi.markets[increment].name)
					{
						output = increment;
						a = 1;
						break;
					}
					else if (((lastpi.markets[increment].name).toLowerCase()).includes(z.toLowerCase()))
					{
						i = lastpi.markets[increment].name;
						if (a != 1)
							output = increment;
						a = 2;
					}
				}
				if (a == 0)
				{
					z = "Sorry, market not found. Please be sure to use exact market title.";
					message.channel.send(z);
					break;
				}
				else if (a == 2)
				{
					z = i;
				}
				if (lastpi.markets[output].contracts.length >= 2)
				{
					i = 0;
					for(innerinc in lastpi.markets[output].contracts)
					{
						if (lastpi.markets[output].contracts[innerinc].bestBuyNoCost == null)
							i += 0;
						else
							i += (1 - lastpi.markets[output].contracts[innerinc].bestBuyNoCost);
					}
					z = '```\n'
					i = i.toFixed(2);
					z = z +"Market: " + lastpi.markets[output].name + "\nCombined neg risk: " + i +"\nURL: " + lastpi.markets[output].url + "\n";
					z = z + '```';
					a = lastpi.markets[output].contracts.length;
					if (a == 2) {
						z = z + "\nNeg risk? ";
						if (i >= 1.06)
							z = z + "**yes**";
						else
							z = z + "**no**";
					}
					else if (a == 3) {
						z = z + "\nNeg risk? ";
						if (i >= 1.08)
							z = z + "**yes**";
						else
							z = z + "**no**";
					}
					else if (a == 4 || a == 5) {
						z = z + "\nNeg risk? ";
						if (i >= 1.09)
							z = z + "**yes**";
						else
							z = z + "**no**";
					}
					else if (a >= 5 && a <= 10) {
						z = z + "\nNeg risk? ";
						if (i >= 1.10)
							z = z + "**yes**";
						else
							z = z + "**no**";
					}
					else if (a > 10) {
						z = z + "\nNeg risk? ";
						if (i >= 1.11)
							z = z + "**yes**";
						else
							z = z + "**no**";
					}
					message.channel.send(z);
				}
				else

						message.channel.send("Market selected: " + z + "\nThis is not a linked market");
				break;
			case 'list':
				z = "```\nA sample of what you should enter:";
				var i = 0;
				for (increment in lastpi.markets)
				{
					if(0 == increment % 2)
					{
						i = i + 1;
						z = z + lastpi.markets[increment].name + "\n";
						console.log(lastpi.markets[increment].name);
					}
					if (i > 25) {
						z = z + "\n For more names, consult predictit.com";
						break;
					}
				}
				z = z + "```";
				message.channel.send(z);
				break;
			case 'insertpz':
				con.query("INSERT INTO PHRASES VALUES ('" + message.toString().substring(8, (message.toString().length)) + "')");
				con.query("commit");
				break;
			case 'insertcz':
				con.query("INSERT INTO UGLYCAT VALUES ('" + message.toString().substring(8, (message.toString().length)) + "')");
				con.query("commit");
				break;
			case 'election':
				today = new Date();
				z = "There are " + ((electionday - today)/(1000*24*60*60)).toFixed(2) + " days till election day. Make sure to vote republican and get your republican friends to the polls!" ;
				message.channel.send(z);
				break;
			case 'bet':
				z = "";
				con.query("SELECT id,bettext from bets", function (err, result) {
				if (err) throw err;
				for (i = 0; i < result.length; i++)
				{
					z += result[i].bettext + "\n";
				}
					message.channel.send(z);
				});
				break;
			case 'shutdown':
				shutitdown();
				break;
			case 'secrettest':
				campaignspending();
				break;
			case 'djia':
				z = message.channel.id;
				checkdow();
				//console.log(message.channel.id + "main body");
				break;
			case 'burn':
				con.query("SELECT uname FROM usernames where u_id = " + message.mentions.users.first().id, function (err, result) {
					if (result != "") {
						if (err) throw err;
							con.query("SELECT burn FROM BURNS", function (err, resultedburn) {
								if (err) throw err;
								message.channel.send("hey " + result[0].uname + ", " + resultedburn[randomNumberB].burn);
						});
					}
					else {
						message.channel.send("Hey pig fucker <@" + message.mentions.users.first().id + ">, youre so insignificant i dont even have your name on record");
					}
				});
				break;
				/*
			case 'senUpdate':
					con.query("UPDATE PREDICTION SET ", function (err	, result) {
			*/
            // Just add any case commands if you want to..
         }
     }
	if (message.toString().substring(0, 21) == '<@540893791356321803>') {
		if (message.author.id != '181830914022572032')
		{
			con.query("SELECT phrase from PHRASES", function (err, result) {
				if (err) throw err;
				var sendMessage = '<@' + message.author.id + '> ' + result[randomNumberP].phrase;
				message.channel.send(sendMessage);
			});
		}
	}
});
/*
checktime();

function checktime() {
	console.log("starting chcecktime");
	dotime();
}

function dotime() {
var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 8, 0, 0) - now;
if (millisTill10 < 0) {
     millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
}
setTimeout(function(){campaignspending(); checktime();}, millisTill10);
}

function campaignspending() {
	z = "";
	con.query("SELECT * from Beto", function (err, result) {
		if (err) throw err;
		a = result.length;
		beto = "As of " + result[a-1].date + ":\nBeto has spent $" + result[a-1].amount + "k on twitter ads\n";
		beto1 = "Beto has spent $" + (result[a-1].amount - result[a-2].amount).toFixed(2) + "k on twitter ads\n";
		//console.log(result);
	});
	con.query("SELECT * from Kamala", function (err, result) {
		if (err) throw err;
		a = result.length;
		kamala = "Kamala has spent $" + result[a-1].amount + "k on twitter ads\n";
		kamala1 = "Kamala has spent $" + (result[a-1].amount - result[a-2].amount).toFixed(2) + "k on twitter ads\n";

	});
	console.log(z);
	con.query("SELECT * from Bernie", function (err, result) {
		if (err) throw err;
		a = result.length;
		bernie = "Bernie has spent $" + result[a-1].amount + "k on twitter ads\n";
		bernie1 = "Bernie has spent $" + (result[a-1].amount - result[a-2].amount).toFixed(2) + "k on twitter ads\n";
		//console.log(result);
	});
	con.query("SELECT * from Warren", function (err, result) {
		if (err) throw err;
		a = result.length;
		z = "Warren has spent $" + result[a-1].amount + "k on twitter ads\n";
		warren1 = "Warren has spent $" + (result[a-1].amount - result[a-2].amount).toFixed(2) + "k on twitter ads\n";
		//console.log(result);
	});
	con.query("SELECT * from Klobuchar", function (err, result) {
		if (err) throw err;
		a = result.length;
		lng = "Klobuchar has spent $" + result[a-1].amount + "k on twitter ads\n";
		klobuchar1 = "Klobuchar has spent $" + (result[a-1].amount - result[a-2].amount).toFixed(2) + "k on twitter ads\n";
		//console.log(result);
	});
	con.query("SELECT * from Gillibrand", function (err, result) {
		if (err) throw err;
		a = result.length;
		gillibrand = "Gillibrand has spent $" + result[a-1].amount + "k on twitter ads\n";
		gillibrand1 = "Gillibrand has spent $" + (result[a-1].amount - result[a-2].amount).toFixed(2) + "k on twitter ads\n";
		//console.log(result);
	});
	setTimeout(function() {
		z = beto + kamala + bernie + z + lng + gillibrand;
		client.post('statuses/update', {status: z},  function(error, tweet, response) {
		if(!error){
			console.log(tweet);  // Tweet body.
				//console.log(response);  // Raw response object.
		}
		});
		//console.log(z);
		setTimeout(function() {
			z = "In the past 24 hours:\n" + beto1 + kamala1 + bernie1 + warren1 + klobuchar1 + gillibrand1;
			client.post('statuses/update', {status: z},  function(error, tweet, response) {
			if(!error){
				console.log(tweet);  // Tweet body.
					//console.log(response);  // Raw response object.
			}
			});
			console.log(z);
		},6000);
	},5000);
}
*/

//Used for monitoring Predictit. Currently being used. Runs every minute (the frequency PI updates their API)
setInterval(function(){
	getPIdata();
	checkdnom();
	checkpres();
	checkneg();
	checknegv2();
},60005);

function checknegv2() {
	output = 0;
	var zv2 = [];
	var pmap = new Map();
	if (lastpi == null)
		return;
	for (increment in lastpi.markets)
		if (lastpi.markets[increment].contracts.length >= 2)
		{
			i = 0;
			cost = 0;
			payout = 0;
			cone = 0;
			if (lastpi.markets[increment].contracts[0].bestBuyNoCost == null)
				cone = 99;
			else
				cone = lastpi.markets[increment].contracts[0].bestBuyNoCost * 100;
			payout = (90 + .1 * cone) * (lastpi.markets[increment].contracts.length - 1);
			cost = cone;
			for(innerinc in lastpi.markets[increment].contracts)
			{
				if (innerinc != 0) {
					if (lastpi.markets[increment].contracts[innerinc].bestBuyNoCost == null)
					{
						i += 1;
						payout = (90 + .1 * cone) * (lastpi.markets[increment].contracts.length - 1 - i);
					}
					else
						cost = cost + (lastpi.markets[increment].contracts[innerinc].bestBuyNoCost * 100) * (cone * .1 + 90) / (90 + .1 * (lastpi.markets[increment].contracts[innerinc].bestBuyNoCost * 100));
				}
			}
			if (0 <= payout - cost)
			{
				output = 1;
				zv2.push(lastpi.markets[increment].name);
				pmap.set(lastpi.markets[increment].name, increment);
				//message.channel.send("The cost is: " + cost + " the payout is " + payout + ". Neg risk possible");
			}
			//message.channel.send("The cost is: " + cost + " the payout is " + payout + ". Neg risk NOT possible");
		}
	latv2 = [];
	temp = zv2.toString();
	if (currnegriskv2 == "")
	{
		console.log(zv2.toString() + "is being added");
		currnegriskv2 = zv2.toString();
		return;
	}
	if (output != 0)
	{
		for (inc in zv2)
		{
			if (!currnegriskv2.includes(zv2[inc]))
			{
				console.log("adding " + zv2[inc] + " to " + currnegriskv2);
				latv2.push(zv2[inc]);
				currnegriskv2 = currnegriskv2 + " " +  zv2[inc].toString();
			}
		};
		if (latv2 != "")
		{
			output = pmap.get(latv2[0]);
			{
				i = 0;
				cost = 0;
				payout = 0;
				cone = 0;
				if (lastpi.markets[output].contracts[0].bestBuyNoCost == null)
					cone = 99;
				else
					cone = lastpi.markets[output].contracts[0].bestBuyNoCost * 100;
				payout = (90 + .1 * cone) * (lastpi.markets[output].contracts.length - 1);
				cost = cone;
				for(innerinc in lastpi.markets[output].contracts)
				{
					if (innerinc != 0) {
						if (lastpi.markets[output].contracts[innerinc].bestBuyNoCost == null)
						{
							i += 1;
							payout = (90 + .1 * cone) * (lastpi.markets[output].contracts.length - 1 - i);
						}
						else
							cost = cost + (lastpi.markets[output].contracts[innerinc].bestBuyNoCost * 100) * (cone * .1 + 90) / (90 + .1 * (lastpi.markets[output].contracts[innerinc].bestBuyNoCost * 100));
					}
				}
				if (0 <= payout - cost)
				{
					cost = cost.toFixed(2);
					payout = payout.toFixed(2);
					bot.channels.get("274023975292764180").send("Market: " + lastpi.markets[output].name + "\nURL: " + lastpi.markets[output].url + ". The cost is: " + cost + " the payout is " + payout + ". Neg risk possible");
				}
			}
		};
		console.log("zv2: " + zv2);
		console.log(latv2);
	}
	if (negriskcounter == 45)
	{
		console.log(temp + "is being added");
		currnegriskv2 = temp;
		negriskcounter = 0;
	}
}

function checkneg() {
	if (lastpi == null)
		return;
	//z = "```\nCurrent Neg Risk:\n";
	z = [];
	output = 0;
	for (increment in lastpi.markets)
	{
		//console.log(mydata.markets[increment].name);
		if (lastpi.markets[increment].contracts.length >= 2)
		{
			i = 0;
			for(innerinc in lastpi.markets[increment].contracts)
			{
				if (lastpi.markets[increment].contracts[innerinc].bestBuyNoCost == null)
					i += 0;
				else
					i += (1 - lastpi.markets[increment].contracts[innerinc].bestBuyNoCost);
			}
			a = lastpi.markets[increment].contracts.length;
			if (a == 2) {
				if (i >= 1.06)
				{
					z.push(lastpi.markets[increment].name);
					output = 1;
				}
			}
			else if (a == 3) {
				if (i >= 1.08)
				{
					z.push(lastpi.markets[increment].name);
					output = 1;
				}							}
			else if (a == 4 || a == 5) {
				if (i >= 1.09)
				{
					z.push(lastpi.markets[increment].name);
					output = 1;
				}							}
			else if (a >= 5 && a <= 10) {
				if (i >= 1.10)
				{
					z.push(lastpi.markets[increment].name);
					output = 1;
				}							}
			else if (a > 10) {
				if (i >= 1.11)
				{
					z.push(lastpi.markets[increment].name);
					output = 1;
				}
			}
		}
	}
	console.log(z);
	lat = [];
	temp = z.toString();
	if (currnegrisk == "")
	{
		console.log(z.toString() + "is being added");
		currnegrisk = z.toString();
		negriskcounter = 0;
		return;
	}
	if (output != 0) {
		for (inc in z)
		{
			if (!currnegrisk.includes(z[inc]))
			{
				console.log("adding " + z[inc] + " to " + currnegrisk);
				lat.push(z[inc]);
				currnegrisk = currnegrisk + " " +  z[inc].toString();
			}
		};
		console.log("z: " + z);
		console.log("currnegrisk =" + currnegrisk);
		console.log(lat);
		if (lat != "")
		{
			console.log("starting print statement: " + lat);
			z = "ALERT! NEW NEG RISK!\n```\n"
			for (zinc in lat)
			{
				for (increment in lastpi.markets)
				{
					if (lat[zinc] == lastpi.markets[increment].name)
					{
						output = increment;
						a = 1;
						break;
					}
				}
				if (a == 0)
				{
					console.log("error negrisk");
					break;
				}
				if (lastpi.markets[output].contracts.length >= 2)
				{
					i = 0;
					for(innerinc in lastpi.markets[output].contracts)
					{
						if (lastpi.markets[output].contracts[innerinc].bestBuyNoCost == null)
							i += 0;
						else
							i += (1 - lastpi.markets[output].contracts[innerinc].bestBuyNoCost);
					}
					i = i.toFixed(2);
					z = z +"Market: " + lastpi.markets[output].name + "\nCombined neg risk: " + i +"\nURL: " + lastpi.markets[output].url + "\n";
					z = z + '```';
				}
			}
			bot.channels.get("274023975292764180").send(z);
		}
	};
	negriskcounter = negriskcounter + 1;
	console.log(negriskcounter);
	if (negriskcounter == 45)
	{
		console.log(temp + "is being added");
		currnegrisk = temp;
		negriskcounter = 0;
	}
};

//Set what day of the shutdown are are in
/*
setInterval(function(){
	shutitdown();
},86400000);
*/
function shutitdown(){
	z = new Date();
	z = z - shutdownday - 18000000;
	z = z / 86400000;
	z = z - 35;
	z = Math.ceil(z);
	z = "The shutdown ended " + z + " days ago";
	bot.channels.get("268801667133079552").send(z);
}

function checkpres() {
	try {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", prescontractcounter);
	oReq.open("GET", "https://www.predictit.org/api/marketdata/markets/3698");
	oReq.send();
	}
	catch (err) {
		console.log("error with 3rd pi request");
	}
}

function checkstock(stock) {
	try {
	console.log("stock: " + stock);
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", stockcheck);
	i = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDj-tjmClRMWfQQjEyj_8Ede6JG8oHzH9U&cx=009270010320727529401:6du5wfyvl7a&q=" + stock;
	console.log(i);
	oReq.open("GET", i);
	oReq.send();
	}
	catch (err) {
		console.log("error with google request");
	}
}

function stockcheck() {
	var mydata = JSON.parse(this.responseText);
	//console.log(mydata.items[0].pagemap);
	try{
	i = mydata.items[0].pagemap.financialquote[0].name + "\n";
	i = i + (mydata.items[0].pagemap.financialquote[0].price) + "\n";
	if (mydata.items[0].pagemap.financialquote[0].pricechange > 0)
		i = i + "```CSS\n+" + mydata.items[0].pagemap.financialquote[0].pricechange + "\n```";
	else
		i = i + "```DIFF\n" + mydata.items[0].pagemap.financialquote[0].pricechange + "\n```";
	bot.channels.get(z).send(i);
	}
	catch (err)
	{
		bot.channels.get(z).send("Im afraid i cant do that dave");
	}
	return;
}

function checkdow() {
	try {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", dowcheck);
	oReq.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyDj-tjmClRMWfQQjEyj_8Ede6JG8oHzH9U&cx=009270010320727529401:2etur6e4nrg&q=.djia");
	oReq.send();
	}
	catch (err) {
		console.log("error with google request");
	}
}

function dowcheck() {
	var mydata = JSON.parse(this.responseText);
	//console.log(mydata.items[0].pagemap);
	i = "DJIA: ";
	console.log("final check:" + mydata.items[0].pagemap.financialquote);
	i = i + (mydata.items[0].pagemap.financialquote[0].price).substring(0,2) + ',' + (mydata.items[0].pagemap.financialquote[0].price).substring(2,(mydata.items[0].pagemap.financialquote[0].price).length) + "\n";
	if (mydata.items[0].pagemap.financialquote[0].pricechange > 0)
		i = i + "```CSS\n+" + mydata.items[0].pagemap.financialquote[0].pricechange + "\n```";
	else
		i = i + "```DIFF\n" + mydata.items[0].pagemap.financialquote[0].pricechange + "\n```";
	bot.channels.get(z).send(i);
	return;
}

//https://www.googleapis.com/customsearch/v1?key=AIzaSyDj-tjmClRMWfQQjEyj_8Ede6JG8oHzH9U&cx=009270010320727529401:ii6u0y1plls&q=Dow Jones Industrial Average
function prescontractcounter() {
	try {
	var mydata = JSON.parse(this.responseText);
	i = 0;
	a = 0;
	for (increments in mydata.contracts)
	{
		if (mydata.contracts[increments].id > a)
		{
			a = mydata.contracts[increments].id;
			z = mydata.contracts[increments].name;
		}
		i++;
	}
	if (i > prescnums)
	{
		if ( 1 == i - prescnums)
		{
			z = "Alert! New person added added to pres market: " + z
			bot.users.get(auth.owner).send(z);
			client.post('statuses/update', {status: z},  function(error, tweet, response) {
			if(!error){
			console.log(tweet);  // Tweet body.
			//console.log(response);  // Raw response object.
			}
			});
			console.log(z);
		}
		else
		{
			z = "Alert! " + (i - prescnums) + " new people added to pres market. Newest being: " + z;
			bot.users.get(auth.owner).send(z);
			client.post('statuses/update', {status: z},  function(error, tweet, response) {
			if(!error){
			console.log(tweet);  // Tweet body.
			//console.log(response);  // Raw response object.
			}
			});
		}
		con.query("update randomvars SET amount = " + i + " where nameof = 'prescnums'");
		prescnums = i;
	}
	else
	{
		z = "Alert! No new person added added to pres market. num of people: " + i;
		//console.log(z);
	}
	}
	catch (err) {
		z = "invalid get request";
		console.log(z + ": " + mydata);
	}

}

function checkdnom() {
	try {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", contractcounter);
	oReq.open("GET", "https://www.predictit.org/api/marketdata/markets/3633");
	oReq.send();
	}
	catch (err) {
		console.log("error with 2nd pi request");
	}
}

function contractcounter() {
	try {
	var mydata = JSON.parse(this.responseText);
	i = 0;
	a = 0;
	for (increments in mydata.contracts)
	{
		if (mydata.contracts[increments].id > a)
		{
			a = mydata.contracts[increments].id;
			z = mydata.contracts[increments].name;
		}
		i++;
	}
	if (i > cnums)
	{
		if ( 1 == i - cnums)
		{
			z = "Alert! New person added added to dem nom market: " + z
			bot.users.get(auth.owner).send(z);
			client.post('statuses/update', {status: z},  function(error, tweet, response) {
			if(!error){
			console.log(tweet);  // Tweet body.
			//console.log(response);  // Raw response object.
			}
			});
		}
		else
		{
			z = "Alert! " + (i - cnums) + " new people added to dem nom market. Newest being: " + z;
			bot.users.get(auth.owner).send(z);
			client.post('statuses/update', {status: z},  function(error, tweet, response) {
			if(!error){
			console.log(tweet);  // Tweet body.
			//console.log(response);  // Raw response object.
			}
			});
		}
		con.query("update randomvars SET amount = " + i + " where nameof = 'contractnums'");
		cnums = i;
	}
	else
	{
		z = "Alert! No new person added added to dem nom market. num of people: " + i;
		//console.log(z);
	}
	}
	catch (err) {
		z = "invalid get request";
		console.log(z + ": " + mydata);
	}

}

//This is used to retrieve contract specific info. contract number is passed to it, and its pulled up, site scanned.
function getpiVolatility (marketnumber, contractnumber) {
	console.log("contract num\n" + contractnumber + "\nMarket num " + marketnumber);
	z = "https://www.predictit.org/api/Market/" + marketnumber + "/Contracts/Stats";
	a = contractnumber;
	//console.log(z);
	try{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", pivolatilitylistener, false);
	oReq.open("GET", z);
	oReq.send();
	}
	catch (err) {
		console.log("PI blocked request");
	}
}

//This scans the XML request for the current volume
function pivolatilitylistener (){
	//var output = "test";
	console.log("made it this far round 2 \n" + a);
	var mydata = JSON.parse(this.responseText);
	var index = mydata.findIndex(mkt=> mkt.contractId === a);
	z = mydata[index].todaysVolume;
	console.log(z);
	z = parseInt(z);
	if (z > 4000)
	{
		z = output + "\nWith " + z + " shares traded today";
		bot.channels.get("274023975292764180").send(z);
	};
}
//<td>Today's Volume:</td>
//initializes the API call
function getPIdata () {
	try {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", pilistener);
	oReq.open("GET", "https://www.predictit.org/api/marketdata/all/");
	oReq.send();
	}
	catch (err) {
		console.log("error getting dem nom");
	}
}
//Scans the API call.
function pilistener () {
	try {
	var mydata = JSON.parse(this.responseText);
	if (lastpi == null)
	{
		//console.log(lastpi);
		lastpi = mydata;
		return;
	}
	var i = 0;
	for (increment in mydata.markets)
	{
		if (mydata.markets[increment].id != lastpi.markets[increment].id)
		{
			console.log("new markets added");
			lastpi = mydata;
			return;
		}
		for(innerinc in mydata.markets[increment].contracts)
		{
			if (mydata.markets[increment].contracts.length != lastpi.markets[increment].contracts.length)
			{
				console.log("new contracts added (2) named " + mydata.markets[increment].contracts[innerinc].name + "in the market " + mydata.markets[increment]);
				lastpi = mydata;
				return;
			}
			if (mydata.markets[increment].contracts[innerinc].id != lastpi.markets[increment].contracts[innerinc].id) //error, this is not working when the order changes
			{
				lat = lastpi.markets[increment].contracts.filter(obj => {
					return obj.id == mydata.markets[increment].contracts[innerinc].id;
				})
				if (!lat) {
					console.log("new contracts added (2) named " + mydata.markets[increment].contracts[innerinc].name + "in the market " + mydata.markets[increment]);
					lastpi = mydata;
					return;
				}
				console.log(lat[0].lastTradePrice + "this is working!");
			}
			else {
				lat = [lastpi.markets[increment].contracts[innerinc]];
			}
			comp = mydata.markets[increment].contracts[innerinc].lastTradePrice - lat[0].lastTradePrice
			z = "Alert! the market \"" + mydata.markets[increment].contracts[innerinc].longName + "\" has moved by " + comp.toFixed(2) + " cents in the past 60 seconds!";
			z += "\nLink: " + mydata.markets[increment].url;
			//console.log(z);

			//console.log("the price has moved: " + comp);
			if ((mydata.markets[increment].contracts[innerinc].longName.includes("tweets") == false) && (mydata.markets[increment].contracts[innerinc].longName.includes("approval") == false))
			{
				if (comp > .09 || comp < -.09)
				{
					output = z;
					getpiVolatility(mydata.markets[increment].id, mydata.markets[increment].contracts[innerinc].id);
					lastpi = mydata;
					return;
				//console.log(z);
				//console.log("Alert! the market " + mydata.markets[increment].contracts[innerinc].longName + " has moved by " + comp + " cents in the past 60 seconds!");
				}
			}
		}
	}
	lastpi = mydata;
	}
	catch (err) {
		console.log("error trying to query main api");
	}
}
