var win = Titanium.UI.currentWindow;

Ti.API.info("Name: " + win.name);
Ti.API.info("Email: " + win.email);


var scrollView = Titanium.UI.createScrollView({
		contentHeight:'auto',
		contentWidth:'auto',
		top:0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:true
	});

var view = Titanium.UI.createView({
	backgroundImage : "../backgrounds/darkfade.jpg",
	width: "100%"
});

var msg	= Titanium.UI.createLabel({
	text:"You have successfully logged in. Upon logging in we sent back your email address and your name. You can pass all kinds of data simply by creating objects on your window.\n\nYour email is:\n" + win.email + "\n\nyour name is:\n" + win.name,
	color:"#fff",
	top:10,
	left:10,
	height:'auto'
});

var logoutBtn = Titanium.UI.createButton({
	title:'Logout'
});

view.add(msg);
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
		view.width = "100%";
	} else if (orientation == 'landscape'){
		view.width = "100%";
	}
});
