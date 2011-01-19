//Titanium.include('js/functions.js');
Titanium.include('js/suds.js');

var db = Titanium.Database.install("db/myHome4.sqlite", 'myHome4');

var dbLogin = db.execute('SELECT * FROM login WHERE id = 1');
Titanium.App.Properties.setString('loginName', dbLogin.fieldByName('name'));
Titanium.App.Properties.setString('loginPassword', dbLogin.fieldByName('password'));
if(dbLogin.fieldByName('name') == ""){
	Titanium.App.Properties.setBool('loginAuto', false);
} else {
	Titanium.App.Properties.setBool('loginAuto', true);	
}

var url = db.execute('SELECT * FROM url WHERE id = 1');
Titanium.App.Properties.setString('url', url.fieldByName('url'));
db.close();

Titanium.API.info("Set Global URL: " + Titanium.App.Properties.getString('url'));
Titanium.API.info("Set Global Name: " + Titanium.App.Properties.getString('loginName'));
Titanium.API.info("Set Global Password: " + Titanium.App.Properties.getString('loginPassword'));

// Android-Version
var win1 = Titanium.UI.createWindow({  
    title:'myHome'
});

win1.setBackgroundImage('images/darkfade.jpg');
createAppSingleWindow();

function createAppSingleWindow() {
	
    if (Titanium.Platform.osname != 'android') {
        win1.hideTabBar();
        var tab1 = Titanium.UI.createTab({
            title: 'myHome',
            window: win1
        });

        var tabGroup = Titanium.UI.createTabGroup();
        tabGroup.addTab(tab1);
        tabGroup.open();
    } else {
        win1.open();
    }
}


function openWindow(url, anim) {

    var win = Titanium.UI.createWindow({  
        url: url,
		backgroundImage:'images/darkfade.jpg'
    });

    if (Titanium.UI.currentTab != null) {
        Titanium.UI.currentTab.open(win,{animated:anim});
    } else {
        win.open({animated:anim});
    }

}

// create tab group
// var tabGroup = Titanium.UI.createTabGroup();

/**var tab1 = Titanium.UI.createTab({
	title:'myHome',
	window:win1
});**/

win1.orientationModes = [Titanium.UI.PORTRAIT];

Titanium.UI.orientation = Titanium.UI.PORTRAIT;

var logo = Titanium.UI.createImageView({
	image: "images/logo.png",
	width: '59',
	height: '59',
	top: '10'
});

win1.add(logo);

// create the main menu container
var main_menu = Ti.UI.createTableView({
	scrollable:false,
	backgroundColor:'black',
	top: '79'
});

// first option row
var firstItemRow = Ti.UI.createTableViewRow({});

var firstItemLabel = Ti.UI.createLabel({
	left: 9,
	text: "Name"
});

var username = Titanium.UI.createTextField({
	height: 40,
	left:100,
	width:190,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
	value: Titanium.App.Properties.getString('loginName')
});

firstItemRow.add(firstItemLabel);
firstItemRow.add(username);

main_menu.appendRow(firstItemRow);
// end first option row

// second option row
var secondItemRow = Ti.UI.createTableViewRow({});

var secondItemLabel = Ti.UI.createLabel({
	left: 9,
	text: "Passwort"
});

var password = Titanium.UI.createTextField({
	height: 40,
	left:100,
	width:190,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
	clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
	passwordMask:true,
	value: Titanium.App.Properties.getString('loginPassword')
});

secondItemRow.add(secondItemLabel);
secondItemRow.add(password);

main_menu.appendRow(secondItemRow);

win1.add(main_menu);

var imageUrl = 'images/checkbox_unchecked.png';

if(Titanium.App.Properties.getBool('loginAuto') == true){
	imageUrl = 'images/checkbox_checked.png';
}

var checkbox = Titanium.UI.createImageView({
	width: '16',
	height: '16',
	image: imageUrl,
	top: 210,
	left: 30,
	text: 'Benutzername',
	title: 'Passwort'
});

var checkboxtext = Titanium.UI.createLabel({
	text: 'Name und Passwort speichern?',
	top: 203,
	left: 60,
	color: '#fff',
	height: 30
});

win1.add(checkboxtext);
win1.add(checkbox);

var loginBtn = Titanium.UI.createButton({
	title:'Login',
	top:270,
	width:'90%',
	height:35,
	borderRadius:1
});
win1.add(loginBtn);

// create the main menu container
var settings_menu = Ti.UI.createTableView({
	top: 320
});

// first option row
var settingsRow = Ti.UI.createTableViewRow({
	hasChild: true
});

var settingsRowLabel = Ti.UI.createLabel({
	left: 9,
	text: "Settings"
});
settingsRow.add(settingsRowLabel);

settings_menu.appendRow(settingsRow);

win1.add(settings_menu);

// add tabs
//tabGroup.addTab(tab1); 

// open tab group
//tabGroup.open();

// Settings Window
/**var sub_win1 = Ti.UI.createWindow({
	title:'Settings', 
	backgroundImage:'images/darkfade.jpg', 
	url: 'windows/settings.js'
});*/

// add the event to the first item
settingsRow.addEventListener('click', function (e) {
	Titanium.API.info("Oeffne Settings");
	openWindow('windows/settings.js',true);
});


checkbox.addEventListener('click', function(e) {
	if(Titanium.App.Properties.getBool('loginAuto') == true){
		imageUrl = 'images/checkbox_unchecked.png';
		Titanium.App.Properties.setBool('loginAuto', false);
		Titanium.API.info('Setze loginAuto = false');
	} else if(Titanium.App.Properties.getBool('loginAuto') == false){
		imageUrl = 'images/checkbox_checked.png';
		Titanium.App.Properties.setBool('loginAuto', true);
		Titanium.API.info('Setze loginAuto = true');
	}
	checkbox.image = imageUrl;	
});

checkboxtext.addEventListener('click', function(e) {
	if(Titanium.App.Properties.getBool('loginAuto') == true){
		imageUrl = 'images/checkbox_unchecked.png';
		Titanium.App.Properties.setBool('loginAuto', false);
		Titanium.API.info('Setze loginAuto = false');
	} else if(Titanium.App.Properties.getBool('loginAuto') == false){
		imageUrl = 'images/checkbox_checked.png';
		Titanium.App.Properties.setBool('loginAuto', true);
		Titanium.API.info('Setze loginAuto = true');
	}
	checkbox.image = imageUrl;	
});

loginBtn.addEventListener('click', function(e) {
	var db3 = Titanium.Database.install("db/myHome4.sqlite", 'myHome4');
	if(Titanium.App.Properties.getBool('loginAuto') == true){
		Titanium.API.info('Speichere Name und Password in der Datenbank.');
		
		db3.execute("DELETE FROM login");
		db3.execute("INSERT INTO login (id, name, password) VALUES (1, ?, ?)", username.value, password.value);
		Titanium.App.Properties.setString('loginName', username.value);
		Titanium.App.Properties.setString('loginPassword', password.value);
		
	} else {
		db3.execute("DELETE FROM login");
	}
	db3.close();
	
	var url = Titanium.App.Properties.getString('url') + '/services?wsdl'; 
	
	var callparams = {
		    username: username.value,
			password: password.value
		};

	var suds = new SudsClient({
	    endpoint: url,
	    targetNamespace: Titanium.App.Properties.getString('url')
	});
	
	try {
	    suds.invoke('login', callparams, function(xmlDoc) {
	        
			var results = xmlDoc.documentElement.getElementsByTagName('return');
	        
	        if (results && results.length>0) {
	            
				var isAdmin = results.item(0).getElementsByTagName('admin');
				if(isAdmin.item(0).text == "true") {
					Titanium.API.info("isAdmin: true");
				}
								
				var userToken = results.item(0).getElementsByTagName('userToken');
				Titanium.API.info("userToken: " + userToken.item(0).text); 
				
							
	        } else {
	            	var resultsError = xmlDoc.documentElement.getElementsByTagName('S:Fault');
					var errorString = resultsError.item(0).getElementsByTagName('faultstring');
					Titanium.API.info("error: " + errorString.item(0).text);
					alert(errorString.item(0).text);
		        }
		        
		    });
	} catch(e) {
	    alert(e);
		Ti.API.error('Error: ' + e);
	}
});