var userTabGroup	= Titanium.UI.createTabGroup();



var login = Titanium.UI.createWindow({
	title:'myHome Login',
	backgroundImage:"backgrounds/flying_colors_640x960.png",
	url:'main_windows/login.js',
	orientationModes : [ Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_RIGHT, Titanium.UI.LANDSCAPE_LEFT]
});

var loginTab = Titanium.UI.createTab({
	title:"Login",
	icon:'icons/user.png',
	window:login
});	

var account = Titanium.UI.createWindow({
	title:'New Account',
	backgroundImage:"backgrounds/darkfade.jpg",
	url:'main_windows/account.js',
	orientationModes : [ Titanium.UI.PORTRAIT, Titanium.UI.LANDSCAPE_LEFT]
});

var accountTab = Titanium.UI.createTab({
	title:'New Account',
	icon:'icons/register.png',
	window:account
});

userTabGroup.addTab(loginTab);
userTabGroup.addTab(accountTab);
userTabGroup.open();

Ti.App.addEventListener('grantEntrance', function(event)
{
	var main	= Titanium.UI.createWindow({
		tabBarHidden 	: false,
	  	title 		: 'myHome',
		url 		: 'main_windows/main.js',
		orientationModes : [ Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_RIGHT, Titanium.UI.LANDSCAPE_LEFT]
	});
	
		
	
	var mainTab	= Titanium.UI.createTab({
		window: main,
		icon:'icons/home.png',
		title: "Home"
	});
	
	var lichtWindow	= Titanium.UI.createWindow({
		tabBarHidden 	: false,
	  	title 		: 'Licht',
		orientationModes : [ Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_RIGHT, Titanium.UI.LANDSCAPE_LEFT],
		url 		: 'main_windows/licht.js'
	});
	
	var lichtTab	= Titanium.UI.createTab({
		window: lichtWindow,
		icon:'icons/lightbulb.png',
		title:"Licht"
	});
	
	var mainTabGroup = Titanium.UI.createTabGroup();
	mainTabGroup.addTab(mainTab);
	mainTabGroup.addTab(lichtTab);
	
	userTabGroup.close();
	mainTabGroup.open();
});

Ti.App.addEventListener('eventLogout', function(event)
{
	Titanium.App.Properties.removeProperty("user_id");
	Titanium.App.Properties.removeProperty("name");
	Titanium.App.Properties.removeProperty("email");
	Titanium.API.info("Loesche Properties...");
	userTabGroup.open();	
});
