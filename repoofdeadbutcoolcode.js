	function reqListener () {
	for (let i = 0; i < this.responseText.length; i++)
	{
		if (this.responseText.substring(i, i+5) == 'lat: '){
			lat = this.responseText.substring(i+5, i+12);
		}
		else if (this.responseText.substring(i, i+5) == 'lng: ') {
			lng = this.responseText.substring(i+5, i+12);
		}
		else if (this.responseText.substring(i, i+4) == 'lat:') {
			lat = this.responseText.substring(i+4, i+11)
		}		  
		else if (this.responseText.substring(i, i+4) == 'lng:') {
			lng = this.responseText.substring(i+4, i+11)
		}
	  /*
	  if (this.responseText.substring(i, i+5) == 'lat: '|| this.responseText.substring(i, i+5) == 'lng: ')
		  console.log(this.responseText.substring(i+5, i+12));	  	
	  else if (this.responseText.substring(i, i+4) == 'lat:'|| this.responseText.substring(i, i+4) == 'lng:')
		  console.log(this.responseText.substring(i+4, i+11));
	  */
	} 

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
	message.channel.send("Caravan coordinates: latitude: " + lat + " longitude: " + lng + "\nThe caravan is " + dist + " miles away");

	
	/*
				try{
					if (!isNaN(check[4].substring(0,(check[4].length - 1))))
					{
						var right = check[4].substring(0,(check[4].length - 1));
						if (check[3] == 'times' || check[3] == 'x')
							message.channel.send(check[2] + " * " + right + " = " + check[2] * right);
						else if (check[3] == 'divideby' || check[3] == '/')
							if (right != 0)
								message.channel.send(check[2] + " / " + right + " = " + check[2] / right);
							else 
								message.channel.send(check[2] + " / " + right + " = dems cucked.");
						else if (check[3] == 'minus' || check[3] == '-')
							message.channel.send(check[2] + " - " + right + " = " + (check[2] - right));
						else if (check[3] == 'plus' || check[3] == '+')
							message.channel.send(check[2] + " * " + right + " = " + (check[2] + right));
					}
					else if (check5[5].substring(0,(check[5].length - 1)) != "")
							if (!isNaN(check[5].substring(0,(check[5].length - 1))))
								right = check[5].substring(0,(check[5].length - 1));
							else
								right = check[5];
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
							message.channel.send(check[2] + " / " + right + " = " + (check[2] / right));
						}
					}
				}
				catch (e) {
			}
		*/