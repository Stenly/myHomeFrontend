var win = Titanium.UI.currentWindow;

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

var msg	= Titanium.UI.createLabel({
	text:"Licht",
	color:"#000",
	height:'auto',
	top:0
});

var logoutBtn = Titanium.UI.createButton({
	title:'Logout'
});

//
// Lichtkreise
//
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

//
// BASIC SWITCH 1
//
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

//
// BASIC SWITCH 2
//
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

view.add(basicSwitchLabel);
view.add(basicSwitch);

view.add(basicSwitchLabel2);
view.add(basicSwitch2);

scrollView.add(view2);
scrollView.add(circle);
scrollView.add(circle2);
scrollView.add(view);



win.rightNavButton = logoutBtn;
win.add(scrollView);

logoutBtn.addEventListener('click',function(e)
{
	Ti.App.fireEvent('eventLogout');
});

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
		circle.visible = false;
		circle2.visible = false;
	} else if (orientation == 'landscape'){
		view.width = 150;
		view.left = 0;
		view.height = scrollView.height;
		view2.width = scrollView.width - view.width;
		view2.left = view.width;
		view2.visible = true;
		circle.visible = true;
		circle2.visible = true;
	}
});
