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
var lat = 0;
var lng = 0;
var sinema = 0;
var mcsally = 0;
var R = 6371e3; // metres
var φ1 = 0;
var φ2 = 0;
var Δφ = 0;
var Δλ = 0;
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

//Tracking the amount of posts stored from AJ
con.query("SELECT amount from randomvars where nameof = 'ajcounter'", function (err, result) {
		if (err) throw err;
		ajpostcounter = result[0].amount;
		console.log(result);
});

//Used for storing election results from AZ, no longer used
con.query("SELECT amount from randomvars where nameof = 'sinema'", function (err, result) {
		if (err) throw err;
		sinema = result[0].amount;
		console.log(result);
});	

//Used for storing election results from AZ, no longer used
con.query("SELECT amount from randomvars where nameof = 'mcsally' OR nameof = 'contractnums'", function (err, result) {
		if (err) throw err;
		cnums = result[0].amount;
		mcsally = result[1].amount;
		console.log(cnums + "THIS IS THE IMPORTANT ONE");
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
			console.log(check.length);
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
				console.log(right);
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
	
	if (message.attachments.first() != null)
	{
		if( message.attachments.first().filename == "kdog-bush.gif" && message.author.id == 181830914022572032){
			ajpostcounter = ajpostcounter + 1;
			con.query("update randomvars SET amount = " + ajpostcounter + " where nameof = 'ajcounter'");
			con.query("commit");
			console.log(ajpostcounter);
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
 
	 if (message.toString().substring(0, 21) == '<@275064425281486848>') {
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
			console.log(response);  // Raw response object.
			}
			});
			mcsally = right;
			sinema = left;
			con.query("update randomvars SET amount = " + mcsally + " where nameof = 'mcsally'");
			con.query("update randomvars SET amount = " + sinema + " where nameof = 'sinema'");
		}
		con.query("update randomvars SET amount = " + cazint + " where nameof = 'urlnum'");
		console.log("updating cazint" + cazint);
}

//Used for monitoring Predictit. Currently being used. Runs every minute (the frequency PI updates their API)
setInterval(function(){ 
	getPIdata();
	checkdnom();
},60005);

function checkdnom() {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", contractcounter);
	oReq.open("GET", "https://www.predictit.org/api/marketdata/markets/3633");
	oReq.send();
}

function contractcounter() {
	var mydata = JSON.parse(this.responseText);
	i = 0;
	a = 0;
	for (increments in mydata.contracts)
	{
		if (increments.id > a)
		{
			a = increments.id;
			z = increments.name
		}
		i++;
	}
	if (i > cnums)
	{
		if ( 0 == i - cnums)
		{
			z = "Alert! New person added added to dem nom market: " + z 
			bot.users.get(auth.owner).send(z);
			client.post('statuses/update', {status: z},  function(error, tweet, response) {
			if(!error){
			console.log(tweet);  // Tweet body.
			console.log(response);  // Raw response object.
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
			console.log(response);  // Raw response object.
			}
			});
		}
		con.query("update randomvars SET amount = " + i + " where nameof = 'contractnums'");
		cnums = i;
	}
	else
	{
		z = "Alert! No new person added added to dem nom market. num of people: " + i;
		console.log(z);
	}
}

//This is used to retrieve contract specific info. contract number is passed to it, and its pulled up, site scanned. 
function getpiVolatility (contractnumber) {
	//console.log("made it this far \n" + contractnumber);
	z = "https://www.predictit.org/legacy/Contract/" + contractnumber;
	//console.log(z);
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", pivolatilitylistener, false);
	oReq.open("GET", z);
	oReq.send();
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
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", pilistener);
	oReq.open("GET", "https://www.predictit.org/api/marketdata/all/");
	oReq.send();
}
//Scans the API call. 
function pilistener () {
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
			if (mydata.markets[increment].contracts[innerinc].id != lastpi.markets[increment].contracts[innerinc].id)
			{
				console.log("new contracts added");
				lastpi = mydata;
				return;
			}
			comp = mydata.markets[increment].contracts[innerinc].lastTradePrice - lastpi.markets[increment].contracts[innerinc].lastTradePrice
			var z = "Alert! the market \"" + mydata.markets[increment].contracts[innerinc].longName + "\" has moved by " + comp.toFixed(2) + " cents in the past 60 seconds!";
			z += "\nLink: " + mydata.markets[increment].url;
			//console.log(z);

			//console.log("the price has moved: " + comp);
			if (mydata.markets[increment].contracts[innerinc].longName.includes("tweets") == false && mydata.markets[increment].contracts[innerinc].longName.includes("approval") == false) 
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

/*
φ1 = lat * 3.14 /180;
φ2 = 25.930 * 3.14 /180;
Δφ = ((25.930)-lat) * 3.14 /180;
Δλ = ((-97.484)-lng) * 3.14 /180;

a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

dist = R * c; 
dist = (dist / 1609.344).toFixed(2);
//dist = Math.sqrt((lat-25.930)^2 + (lng-97.484)^2);
//dist = dist*111*0.621371;
if (distlong != dist)
{
	z = distlong - dist;
	i = "THE CARAVAN HAS MOVED! NEW Caravan coordinates: latitude: " + lat + " longitude: " + lng + "\nThe caravan is " + dist + " miles away. \nThe caravan is now " + z.toFixed(2) + " miles closer!";
	bot.channels.get("268801667133079552").send(i);
	con.query("update caravan SET dist = " + dist + ", lat = " + lat + ", lng = " + lng + " where id = 1");
	console.log(distlong);
	distlong = dist;
	
	client.post('statuses/update', {status: i + "\nSource: @Cis-org #CARAVAN"},  function(error, tweet, response) {
	if(!error){
	console.log(tweet);  // Tweet body.
	console.log(response);  // Raw response object.
	}
}); */
//}
//}



