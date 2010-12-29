//
// Lichtkreise
//
/*
var circle = Titanium.UI.createView({
	width: 10,
	height: 10,
	borderRadius: 5,
	backgroundColor:"#660000",
	top: 20,
	left: 460,
	zIndex: 11,
	visible: false
});

var circle2 = Titanium.UI.createView({
	width: 10,
	height: 10,
	borderRadius: 5,
	backgroundColor:"#009900",
	top: 200,
	left: 320,
	zIndex: 11,
	visible: false
});
*/
//
// BASIC SWITCH 1
//
/*
var basicSwitchLabel = Titanium.UI.createLabel({
	text:'Licht 1: Aus' ,
	top:0,
	textAlign: "center",
	height:'auto'
});

var basicSwitch = Titanium.UI.createSwitch({
	value:false,
	top:20
});

basicSwitch.addEventListener('change',function(e)
{
	var status;
	var farbe;	
	
	if (basicSwitch.value == true){
		status = "An";
		farbe = "#009900";	
	} else {
		status = "Aus";
		farbe = "#660000";
	}
	basicSwitchLabel.text = 'Licht 1: ' + status;
	circle.backgroundColor = farbe;
	// e.value
});
*/
//
// BASIC SWITCH 2
//
/*
var basicSwitchLabel2 = Titanium.UI.createLabel({
	text:'Licht 2: An' ,
	top:50,
	textAlign: "center",
	height:'auto'
});

var basicSwitch2 = Titanium.UI.createSwitch({
	value:true,
	top:70
});

basicSwitch2.addEventListener('change',function(e)
{
	var status2;
	var farbe2;	
	
	if (basicSwitch2.value == true){
		status2 = "An";
		farbe2 = "#009900";	
	} else {
		status2 = "Aus";
		farbe2 = "#660000";
	}
	basicSwitchLabel2.text = 'Licht 2: ' + status2;
	circle2.backgroundColor = farbe2;
	// e.value
});
*/
/*
view.add(basicSwitchLabel);
view.add(basicSwitch);

view.add(basicSwitchLabel2);
view.add(basicSwitch2);
*/
//scrollView.add(circle);
//scrollView.add(circle2);