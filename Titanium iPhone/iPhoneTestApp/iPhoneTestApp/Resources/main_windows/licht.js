var win = Titanium.UI.currentWindow;

var switchesarray =[];
var labelsarray = [];
var circlesarray = [];
var circlesLabelsarray = [];
var switchEventListenerArray = [];

var scrollView = Titanium.UI.createScrollView({
		contentHeight:'auto',
		contentWidth:200,
		top:0,
		backgroundColor:'#fff',
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true
	});

var view = Titanium.UI.createView({
	backgroundColor:'#fff',
	width: "100%",
	zIndex:10
});

var view2 = Titanium.UI.createView({
	borderRadius:0,
	backgroundColor:'#fff',
	backgroundImage: "../images/grundriss.png",
	borderColor:'#000',
	width: 'auto',
	left:100,
	top: 0,
	visible: false,
	zIndex: 10
});

var logoutBtn = Titanium.UI.createButton({
	title:'Logout'
});


scrollView.add(view2);
scrollView.add(view);



win.rightNavButton = logoutBtn;
win.add(scrollView);

logoutBtn.addEventListener('click',function(e)
{
	Ti.App.fireEvent('eventLogout');
});

/*
 * Function to create Light-Switch and Light Nodes
 */
var topx = 10;

function createSwitch(value){
	Titanium.API.info("Create Light: " + value.id + "(Light On/Off: " + value.light +")");
	
	var lightboolean;
	var lighttext;
	var farbelight;
	
	if(value.light == 1){
		lightboolean = true;
		lighttext = "An";
		farbelight = "#009900";	
	} else {
		lightboolean = false;
		lighttext = "Aus";
		farbelight = "#660000";
	}
	
		
	labelsarray[value.id] = Titanium.UI.createLabel({
		text:'Licht ' + value.id + ': ' + lighttext ,
		textAlign: "center",
		height:'auto',
		top: topx
	});
	
	topx = topx + 30;
	
	switchesarray[value.id] = Titanium.UI.createSwitch({
		value: lightboolean,
		top: topx
	});
	
	topx = topx + 30;
	
	/*
	 * String Wert muss für Addition in Integer Wert umgewandelt werden
	 */
	var posx1 = parseInt(value.pos_x, 10);
	
	/*
	 * Wert für den linken "Frame", der enstprechend auf die Nodes addiert werden muss, damit sie auf dem Grundriss richtig angezeigt werden
	 * Sollte später als globale Konstante definiert werden, da sich die Breite je nach Gerät unterscheidet
	 */
	var posx2 = 150;
	
	var posx = posx1 + posx2;
	
	/*
	 * String Wert muss für Berechnung in Integer Wert umgewandelt werden
	 */
	var posy = parseInt(value.pos_y, 10);
	

	/*
	 * Licht Nodes werden als Kreise definiert und in einem Array gespeichert, um später darauf zugreifen zu können
	 */
	circlesarray[value.id] = Titanium.UI.createView({
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: farbelight,
		top: posy,
		left: posx,
		zIndex: 11,
		visible: false
	});
	
	/*
	 * Beschriftung der Licht Nodes.
	 */
	circlesLabelsarray[value.id] = Titanium.UI.createLabel({
		text:'Licht ' + value.id,
		height:'auto',
		left: posx - 20,
		top: posy - 20,
		visible: false,
		zIndex: 12
	});
	
	/*
	 * EventListener werden den einzelnen Switches hinzugefügt, damit das Umschalten der Switches registriert wird
	 */
	switchesarray[value.id].addEventListener('change',function(e)
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
  					updateSwitchAndCircle(response.id, response.light);
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
  				light: switchesarray[value.id].value
  			};
  			lightsUpdate.send(params);
  			Titanium.API.info("Send: " + params.id);
  			
	});
	
	view.add(labelsarray[value.id]);
	view.add(switchesarray[value.id]);
	
	scrollView.add(circlesarray[value.id]);
	scrollView.add(circlesLabelsarray[value.id]);
}
/*
 * Funktion to change color of Light Nodes and the text of the Switch labels
 */
function updateSwitchAndCircle(id2, light2){
  var status2;
  var farbe2;
  if (light2 == true){
      status2 = "An";
      farbe2 = "#009900";
    } else {
      status2 = "Aus";
      farbe2 = "#660000";
    }
    labelsarray[id2].text = 'Licht ' + id2 + ': ' + status2;
    circlesarray[id2].backgroundColor = farbe2;
}
/*
 * Funktion um Orientation zu bestimmen.
 * Muss global definiert werden
 */
function getOrientation(o){
	switch(o) {
		case Titanium.UI.PORTRAIT: return 'potrait';
		case Titanium.UI.UPSIDE_PORTRAIT: return 'potrait';
		case Titanium.UI.LANDSCAPE_LEFT: return 'landscape';
		case Titanium.UI.LANDSCAPE_RIGHT: return 'landscape';
	}
}
Titanium.Gesture.addEventListener('orientationchange', function(e){
	var orientation = getOrientation(e.orientation);
	if (orientation == 'potrait'){
		view.width = scrollView.width;
		view.height = scrollView.height;
		view2.visible = false;
		//circle.visible = false;
		//circle2.visible = false;
		for( var n = 1; n<circlesarray.length; n++){
			Titanium.API.info("circlesarray["+ n +"] set unvisible");
			circlesarray[n].visible = false;
			circlesLabelsarray[n].visible = false;
		}
	} else if (orientation == 'landscape'){
		view.width = 150;
		view.left = 0;
		view.height = scrollView.height;
		view2.width = scrollView.width - view.width;
		view2.left = view.width;
		view2.visible = true;
		//circle.visible = true;
		//circle2.visible = true;
		for( var j = 1; j<circlesarray.length; j++){
			Titanium.API.info("circlesarray["+ j +"] set visible (X:" + circlesarray[j].left + "; Y: " + circlesarray[j].top + ")");
			circlesarray[j].visible = true;
			Titanium.API.info("circlesLabelsarray["+ j +"] set visible (X:" + circlesLabelsarray[j].left + "; Y: " + circlesLabelsarray[j].top + ")");
			circlesLabelsarray[j].visible = true;
		}
	}
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
		Titanium.API.info(response);
		for( var i = 0; i<response.length; i++){
			var value = response[i];
			createSwitch(value);
			//Titanium.API.info("Licht ID" + value.id);
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
		view.add(msg);
		Titanium.API.info(response.user_id);
		Titanium.API.info(response.message);
	}
};

/*
 * Funktion wird aufgerufen, wenn das Fenster geöffnet wird (bzw. erstellt wird).
 * Soll ein Refresh eingebaut werden?
 */
win.addEventListener('open', function(e){
	Titanium.API.info("Hole Lichter von der Datenbank...");
	
	if (Titanium.App.Properties.getInt("user_id") != '')
	{
		lightsGet.open("POST","http://myhome.matsbecker.com/iPhone/post_lights.php");
		var params = {
			user_id: Titanium.App.Properties.getInt("user_id")
		};
		lightsGet.send(params);
		Titanium.API.info(params);
	}
	else
	{
		Titanium.API.info("No User ID.");
	}
});
