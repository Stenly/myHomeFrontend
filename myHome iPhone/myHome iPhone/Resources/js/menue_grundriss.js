Titanium.App.Properties.setBool('licht', false);
var win1 = Titanium.UI.currentWindow;

win1.orientationModes = [Titanium.UI.LANDSCAPE_RIGHT];

Titanium.UI.orientation = Titanium.UI.LANDSCAPE_RIGHT;
 
var logoutBtn = Titanium.UI.createButton({
	title:'Logout'
});

win1.rightNavButton = logoutBtn;

win1.backgroundImage = "../images/grundriss.png";


var circlesarray = [];
var circlesLabelsarray = [];
var modalWindowsArray = [];
var switchArray =[];
var buttonArray = [];
var topx = 10;

function createLicht(value){
	Titanium.API.info("Create Light: " + value.id + "(Light On/Off: " + value.light +")");
	
	var lightboolean;
	var farbelight;
	
	if(value.light == 1){
		lightboolean = true;
		farbelight = "#009900";	
	} else {
		lightboolean = false;
		farbelight = "#660000";
	}
	
	/*
	 * String Wert muss für Addition in Integer Wert umgewandelt werden
	 */
	var posx1 = parseInt(value.pos_x, 10);
	
	/*
	 * Wert für den linken "Frame", der enstprechend auf die Nodes addiert werden muss, damit sie auf dem Grundriss richtig angezeigt werden
	 * Sollte später als globale Konstante definiert werden, da sich die Breite je nach Gerät unterscheidet
	 */
	var posx2 = 0;
	
	var posx = posx1 + posx2;
	
	/*
	 * String Wert muss für Berechnung in Integer Wert umgewandelt werden
	 */
	var posy = parseInt(value.pos_y, 10);
	
	/*
	 * Licht Nodes werden als Kreise definiert und in einem Array gespeichert, um später darauf zugreifen zu können
	 */
	circlesarray[value.id] = Titanium.UI.createView({
		width: 20,
		height: 20,
		borderRadius: 5,
		backgroundColor: farbelight,
		top: posy,
		left: posx,
		zIndex: 11,
		visible: true
	});
	
	/*
	 * Beschriftung der Licht Nodes.
	 */
	circlesLabelsarray[value.id] = Titanium.UI.createLabel({
		text:'Licht ' + value.id,
		height:'auto',
		left: posx - 20,
		top: posy - 20,
		visible: true,
		zIndex: 12
	});
	
	modalWindowsArray[value.id] = Titanium.UI.createWindow({
				opacity: 0.8,
				bottom: 0,
				height: 50,
				backgroundColor: '#000',
				zIndex: 100,
				visible: false
			});
			
	var modalWinLabel = Titanium.UI.createLabel({
				text: "Licht " + value.id,
				color: '#fff',
				left: 10
			});
			
	modalWindowsArray[value.id].add(modalWinLabel);
	
	
	switchArray[value.id] = Titanium.UI.createSwitch({
		value: lightboolean,
		left: 150
	});
	
	modalWindowsArray[value.id].add(switchArray[value.id]);
	
	buttonArray[value.id] = Titanium.UI.createButton({
		title: 'Close',
		right: 10,
		width: 100,
		height: 30,
		top: 10
	});
	
	modalWindowsArray[value.id].add(buttonArray[value.id]);
					
	win1.add(modalWindowsArray[value.id]);
	
	circlesarray[value.id].addEventListener('click',function(e)
    {
		
		if(modalWindowsArray[value.id].visible == false && Titanium.App.Properties.getBool('licht') == false){
			Titanium.API.info("Licht Klick Modal Window == false");
			Titanium.App.Properties.setBool('licht', true);			
			modalWindowsArray[value.id].visible = true;			
					
					
		} 
		
	});
	
	buttonArray[value.id].addEventListener('click',function(e)
    {
		
		if(modalWindowsArray[value.id].visible == false){
			Titanium.API.info("Licht Klick Modal Window == false");
						
			modalWindowsArray[value.id].visible = true;			
					
					
		} else {
			Titanium.API.info("Licht Klick Modal Window == true");
			Titanium.App.Properties.setBool('licht', false);
			modalWindowsArray[value.id].visible = false;	
		}
		
	});
	
	switchArray[value.id].addEventListener('change',function(e)
	{
      /*
  		 * HTTP Request: Update Lights
  		 * Es wird ein HTTP Request erstellt, um die Licht Nodes upzudaten
  		 */
  		var lightsUpdate = Titanium.Network.createHTTPClient();
  		
  		
  		/*
  		 * Wird automatisch geladen, wenn Antwort vom Server empfangen wird
  		 */
  		lightsUpdate.onload = function()
  		{
  				var json = this.responseText;
  				var response = JSON.parse(json);
  				if (response.status == true)
  				{
  					Titanium.API.info("Update Light: " + response.id);
  					
  					// Funktion für Änderung der Farbei bei den Licht Nodes, sowie der Änderung beim Label Text
  					updateCircle(response.id, response.light);
  				}
  				else
  				{
  					Titanium.API.info(response.user_id);
  					Titanium.API.info(response.message);
  				}
  		};
  			
  			/*
         * switchesarray[value.id].value = true oder false
         */
  			lightsUpdate.open("POST","http://myhome.matsbecker.com/iPhone/update_lights.php");
  			var params = {
  				user_id: Titanium.App.Properties.getInt("user_id"),
  				id: value.id,
  				light: switchArray[value.id].value
  			};
  			lightsUpdate.send(params);
  			Titanium.API.info("Send: " + params.id);
  			
	});
	
	win1.add(circlesarray[value.id]);
	win1.add(circlesLabelsarray[value.id]);
}

function updateCircle(id2, light2){
  var farbe2;
  if (light2 == true){
      farbe2 = "#009900";
    } else {
      farbe2 = "#660000";
    }
    circlesarray[id2].backgroundColor = farbe2;
}

logoutBtn.addEventListener('click',function(e)
{
	Ti.App.fireEvent('eventLogout');
});

/*
 * HTTP Request: Get Lights
 */
var lightsGet = Titanium.Network.createHTTPClient();

lightsGet.onload = function()
{
	var json = this.responseText;
	var response = JSON.parse(json);
	if (response.status != false)
	{
		
		for( var i = 0; i<response.length; i++){
			createLicht(response[i]);
			Titanium.API.info("Response: " + response[i]);
		}
	}
	else
	{
		var msg	= Titanium.UI.createLabel({
			text: response.message,
			top:10,
			textAlign: "center",
			height:'auto'
		});
		win1.add(msg);
		Titanium.API.info(response.user_id);
		Titanium.API.info(response.message);
	}
};

/*
 * Funktion wird aufgerufen, wenn das Fenster geöffnet wird (bzw. erstellt wird).
 * Soll ein Refresh eingebaut werden?
 */
win1.addEventListener('open', function(e){
	Titanium.API.info("Hole Lichter von der Datenbank...");
	
	Titanium.App.Properties.setInt("user_id", 1);
	
	if (Titanium.App.Properties.getInt("user_id") != '')
	{
		lightsGet.open("POST","http://myhome.matsbecker.com/iPhone/post_lights.php");
		var params = {
			user_id: Titanium.App.Properties.getInt("user_id")
		};
		lightsGet.send(params);
		Titanium.API.info("User ID: " + Titanium.App.Properties.getInt("user_id"));
	}
	else
	{
		Titanium.API.info("No User ID.");
	}
});
