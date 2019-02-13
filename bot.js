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
var electionday = new Date(2018, 10, 6);
var shutdownday = new Date(2018, 11, 22);
var lat = 0;
var lng = 0;
var sinema = 0;
var mcsally = 0;
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

//Used for storing election results from AZ, no longer used
con.query("SELECT amount from randomvars where nameof = 'sinema' OR nameof = 'prescnums'", function (err, result) {
		if (err) throw err;
		prescnums = result[0].amount;
		sinema = result[1].amount;
		//console.log(result);
});	

//Used for storing election results from AZ, no longer used
con.query("SELECT amount from randomvars where nameof = 'mcsally' OR nameof = 'contractnums'", function (err, result) {
		if (err) throw err;
		cnums = result[0].amount;
		mcsally = result[1].amount;
		//console.log(cnums + "THIS IS THE IMPORTANT ONE");
});	
/*
con.query("SELECT amount from randomvars where nameof = 'urlnum'", function (err, result) {
		if (err) throw err;
		cazint = result[0].amount;
		console.log(result);
});	
*/

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
	/*
	if (randomNumberB % 10 == 0 && message.content != "" && !message.content.toString().includes("'") && typeof(message.attachments.first()) == "undefined" && typeof(message.mentions.users.first()) == "undefined")
	{
		con.query("INSERT INTO PHRASES VALUES ('" + message.content + "')");
		con.query("commit");
		console.log(message.content);
	}
	*/
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
			/*
			case 'arizona':
				getcazint();
				z = cazbase + cazint + cazend;
				var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
				var oReq = new XMLHttpRequest();
				oReq.addEventListener("load", reqListener);
				oReq.open("GET", z);
				oReq.send();
				break;
			*/
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
						a = 2;
					}
				}
				if (a == 0)
				{
					z = "Sorry, market not found. Please be sure to use exact market title and capitalize names.";
					message.channel.send(z);
				}
				else if (a == 2)
				{
					message.channel.send(i);
				}
				break;
			case 'list':
				z = "```\nA sample of what you should enter:";
				for (increment in lastpi.markets)
				{
					z = z + lastpi.markets[increment].name + "\n";
					console.log(lastpi.markets[increment].name);
					if (increment > 25) {
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
	 
	 //Used for tracking AZ election results. No longer used, will be removed. 
	function reqListener () {
	var mydata = JSON.parse(this.responseText);
	z = "";
	i = mydata[0].ContestTotalVotes;
	if (mydata[0].Choices[0].PartyShortName == "DEM")
	{
		z = "Current Sinema vote: " + mydata[0].Choices[0].ChoiceTotalVotes;
		z = z + "\n" + "Current Mcsally Vote: " + mydata[0].Choices[1].ChoiceTotalVotes;
		z = z + "\n" + "Sinema leads by: " + (mydata[0].Choices[0].ChoiceTotalVotes - mydata[0].Choices[1].ChoiceTotalVotes);
		mcsally = mydata[0].Choices[1].ChoiceTotalVotes;
		sinema = mydata[0].Choices[0].ChoiceTotalVotes;
		c = (sinema / i - mcsally / i) * 100;
		z = z + "\n" + "Current MOV: " + c.toFixed(2) + "% +D";
	}
	else if (mydata[0].Choices[0].PartyShortName == "REP")
	{
		z = "Current Mcsally vote: " + mydata[0].Choices[0].ChoiceTotalVotes;
		z = z + "\n" + "Current Sinema Vote: " + mydata[0].Choices[1].ChoiceTotalVotes;
		z = z + "\n" + "Mcsally leads by: " + (mydata[0].Choices[0].ChoiceTotalVotes - mydata[0].Choices[1].ChoiceTotalVotes);
		mcsally = mydata[0].Choices[0].ChoiceTotalVotes;
		sinema = mydata[0].Choices[1].ChoiceTotalVotes;
		c = (mcsally / i - sinema / i) * 100;
		z = z + "\n" + "Current MOV: " + c.toFixed(2) + "% +R";
	}
	message.channel.send(z);
	};
 
	 if (message.toString().substring(0, 21) == '<@540893791356321803>') {
		con.query("SELECT phrase from PHRASES", function (err, result) {
			if (err) throw err;
			var sendMessage = '<@' + message.author.id + '> ' + result[randomNumberP].phrase;
			message.channel.send(sendMessage);
		 });
	}
});

//Used to initialize AZ election results monitoring.No longer used. 
/*
setInterval(function(){ 
	getcazint();
},5000);
*/
function getcazint () {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", setcazint);
	oReq.open("GET", "https://cdn1.arizona.vote/data/4/0/election_4_0.json", false);
	oReq.send();
}

function setcazint () {
	try {
	var mydata = JSON.parse(this.responseText);
	cazint = mydata.uploadId;
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	z = cazbase + cazint + cazend;
	oReq.addEventListener("load", reqListener1);
	console.log("trying to get");
	oReq.open("GET", z);
	oReq.send();
	}
	catch (err) {
		console.log("error with http scrape");
	}
}

function reqListener1 () {
		console.log(cazint);
		var mydata = JSON.parse(this.responseText);
		i = mydata[0].ContestTotalVotes;
		if (mydata[0].Choices[0].PartyShortName == "DEM")
		{
			right = mydata[0].Choices[1].ChoiceTotalVotes;
			left = mydata[0].Choices[0].ChoiceTotalVotes;
		}
		else if (mydata[0].Choices[0].PartyShortName == "REP")
		{
			right = mydata[0].Choices[0].ChoiceTotalVotes;
			left = mydata[0].Choices[1].ChoiceTotalVotes;
		}
		if (right != mcsally || left != sinema)
		{
			z = "UPDATE! THE ARIZONA VOTE TOTALS HAVE CHANGED!\n";
			if (right < left)
			{	
				z = z + "Current leader: Sinema.";
				z = z + "\n" + "Current Sinema Vote: " + left + ". This has gone up by: " + (left - sinema);
				z = z + "\n" + "Curren Mcsally vote: " + right +  ". This has gone up by: " + (right - mcsally);
				z = z + "\n" + "Sinema now leads by: " + (left - right);
				z = z + "\n" + "This has swung to sinema by: " + ((left-sinema)-(right-mcsally)) + " votes (negative means swung away).";
				c = (sinema / i - mcsally / i) * 100;
				z = z + "\n" + "Old MOV: " + c.toFixed(2);
				c = (left / i - right / i) * 100; 
				z = z + "\n" + "New MOV: " + c.toFixed(2);
			}
			else if (left < right || left == right)
			{	
				z = z + "Current leader: Mcsally.";
				z = z + "\n" + "Current Mcsally Vote: " + right + ". This has gone up by: " + (right - mcsally);
				z = z + "\n" + "Curren Sinema vote: " + left + ". This has gone up by: " + (left - sinema);
				z = z + "\n" + "Mcsally now leads by: " + (right - left);
				z = z + "\n" + "This has swing to mcsally by: " + ((right-mcsally)-(left-sinema)) + " votes. (negative means swung away)";
				c = (right / i - left / i) * 100; 
				z = z + "\n" + "New MOV: " + c.toFixed(2);
			}
			bot.channels.get("268801667133079552").send(z);
			bot.users.get(auth.owner).send(z); 
			z = z.substring(46);
			z = "AZ UPDATE \n" + z;
			client.post('statuses/update', {status: z},  function(error, tweet, response) {
			if(!error){
			console.log(tweet);  // Tweet body.
			//console.log(response);  // Raw response object.
			}
			});
			mcsally = right;
			sinema = left;
			con.query("update randomvars SET amount = " + mcsally + " where nameof = 'mcsally'");
			con.query("update randomvars SET amount = " + sinema + " where nameof = 'sinema'");
		}
		con.query("update randomvars SET amount = " + cazint + " where nameof = 'urlnum'");
		//console.log("updating cazint" + cazint);
}

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
			z = "In the past 24 hours:\n" + beto1 + kamala1 + bernie1 + gillibrand1 + klobuchar1 + warren1;
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

//Used for monitoring Predictit. Currently being used. Runs every minute (the frequency PI updates their API)
setInterval(function(){ 
	getPIdata();
	checkdnom();
	checkpres();
},60005);

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
function getpiVolatility (contractnumber) {
	//console.log("made it this far \n" + contractnumber);
	z = "https://www.predictit.org/legacy/Contract/" + contractnumber;
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
	//console.log("made it this far round 2 \n" + output);
	var mydata = this.responseText;
	//console.log(mydata);
	for (let i = 0; i < mydata.length; i++)
	{
		if (mydata.substring(i, i +24) == "<td>Today's Volume:</td>")
		{
			z = mydata.substring(i+24+46, i+24+70);
			//console.log(z);
			z = z.replace(/,/g, "");
			z= parseInt(z);
			if (z > 4000)
			{
				z = output + "\nWith " + z + " shares traded today";
				bot.channels.get("274023975292764180").send(z)
			}
			return;
		}
	}
	
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
					getpiVolatility(mydata.markets[increment].contracts[innerinc].id);
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
