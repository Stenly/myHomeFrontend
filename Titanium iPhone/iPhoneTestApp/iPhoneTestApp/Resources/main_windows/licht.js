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
 * Function to create Light-Switch
 */
var topx = 10;

function createSwitch(value){
	Titanium.API.info("Create Light: " + value.id + "(Light On/Off: " + value.light +")");
	
	var lightboolean;
	var lighttext;
	
	if(value.light == 1){
		lightboolean = true;
		lighttext = "An";	
	} else {
		lightboolean = false;
		lighttext = "Aus";
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
	
		var posx2 = 150;
	var posx1 = parseInt(value.pos_x);
	var posx = posx1 + posx2;
	
	var posy = parseInt(value.pos_y);
	
	Titanium.API.info("Pos X: " + posx);
	
	var farbelight;
	if(value.light == 1){
		farbelight = "#009900";
	} else {
		farbelight = "#660000";
	}
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
	
	circlesLabelsarray[value.id] = Titanium.UI.createLabel({
		text:'Licht ' + value.id,
		height:'auto',
		left: posx - 20,
		top: posy - 20,
		visible: false,
		zIndex: 12
	});
	
	switchesarray[value.id].addEventListener('change',function(e)
	{
				var lightsonoff;	
		
		if (switchesarray[value.id].value == true){
			lightsonoff = true;	
		} else {
			lightsonoff = false;
		}
		// e.value
		
		/*
		 * HTTP Request: Update Lights
		 */
		var lightsUpdate = Titanium.Network.createHTTPClient();
		
		lightsUpdate.onload = function()
		{
				var json = this.responseText;
				var response = JSON.parse(json);
				if (response.status == true)
				{
					Titanium.API.info("Update Light: " + response.id);
					updateSwitchAndCircle(response.id, response.light);
				}
				else
				{
					Titanium.API.info(response.user_id);
					Titanium.API.info(response.message);
				}
			};
			
			lightsUpdate.open("POST","http://myhome.matsbecker.com/iPhone/update_lights.php");
			var params = {
				user_id: Titanium.App.Properties.getInt("user_id"),
				id: value.id,
				light: lightsonoff
			};
			lightsUpdate.send(params);
			Titanium.API.info("Send: " + params.id);
	});
	
	view.add(labelsarray[value.id]);
	view.add(switchesarray[value.id]);
	
	scrollView.add(circlesarray[value.id]);
	scrollView.add(circlesLabelsarray[value.id]);
}
// end functione createSwitch
function updateSwitchAndCircle(id, light){
	var status;
	var farbe;
	if (light == true){
			status = "An";
			farbe = "#009900";
		} else {
			status = "Aus";
			farbe = "#660000";
		}
		labelsarray[id].text = 'Licht ' + id + ': ' + status;
		circlesarray[id].backgroundColor = farbe;
}

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
