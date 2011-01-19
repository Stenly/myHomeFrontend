Titanium.include('js/functions.js');

var db = Titanium.Database.install("db/myHome.sqlite", 'myHome');
var url = db.execute('SELECT url FROM settings');
Titanium.App.Properties.setString('url', url.fieldByName('url'));
db.close();
Titanium.API.info("Set Global URL: " + Titanium.App.Properties.getString('url'));

Titanium.UI.setBackgroundImage('images/darkfade.jpg');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
    title:'myHome',
	tabBarHidden:true,
	navBarHidden: true
});

var tab1 = Titanium.UI.createTab({
	title:'myHome',
	window:win1
});

win1.orientationModes = [Titanium.UI.PORTRAIT];

Titanium.UI.orientation = Titanium.UI.PORTRAIT;

var logo = Titanium.UI.createImageView({
	image: "images/logo.png",
	width: '59px',
	height: '59px',
	top: '10px'
});

win1.add(logo);

// create the main menu container
var main_menu = Ti.UI.createTableView({
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	scrollable:false,
	backgroundColor:'transparent',
	rowBackgroundColor:'white',
	top: '79px'
});

// first option row
var firstItemRow = Ti.UI.createTableViewRow({});

var firstItemLabel = Ti.UI.createLabel({
	left: 9,
	text: "Name"
});

var username = Titanium.UI.createTextField({
	height: 29,
	left:100,
	width:190,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE
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
	height: 29,
	left:100,
	width:190,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
	clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
	passwordMask:true
});

secondItemRow.add(secondItemLabel);
secondItemRow.add(password);

main_menu.appendRow(secondItemRow);

win1.add(main_menu);

var checkbox = Titanium.UI.createImageView({
	width: '16px',
	height: '16px',
	image: 'images/checkbox_checked.png',
	top: 210,
	left: 30,
	text: 'Benutzername',
	title: 'Passwort'
});

var checkboxtext = Titanium.UI.createLabel({
	text: 'Benutzernamen speichern?',
	top: -25,
	left: 70,
	color: '#fff'
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
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	scrollable:false,
	backgroundColor:'transparent',
	rowBackgroundColor:'white',
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
tabGroup.addTab(tab1); 

// open tab group
tabGroup.open();

// Settings Window
var sub_win1 = Ti.UI.createWindow({title:'Settings', navBarHidden: false});
sub_win1.add(logo);
var sub_table1 = Ti.UI.createTableView({
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	scrollable:false,
	backgroundColor:'transparent',
	rowBackgroundColor:'white',
	top: '79px'
});
var sub_row1 = Ti.UI.createTableViewRow();
var sub_label1 = Ti.UI.createLabel({
	left: 9,
	text: "Login URL"
});
var loginUrl = Titanium.UI.createTextField({
	height: 29,
	left:100,
	width:190,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
	hintText: Titanium.App.Properties.getString('url')
});
sub_row1.add(sub_label1);
sub_row1.add(loginUrl);
sub_table1.appendRow(sub_row1);
sub_win1.add(sub_table1);
var saveBtn = Titanium.UI.createButton({
	title:'Save',
	top:170,
	width:'90%',
	height:35,
	borderRadius:1
});
sub_win1.add(saveBtn);

saveBtn.addEventListener('click',function(e)
{
	if (loginUrl.value != '')
	{
		Titanium.API.info('New URL: ' + loginUrl.value);		
		Titanium.App.Properties.setString('url', loginUrl.value);
		
		var db = Titanium.Database.install("db/myHome.sqlite", 'myHome');
		db.execute("UPDATE settings SET url = ?", loginUrl.value);
		db.close();
	}
	else
	{
		Titanium.API.info('No New URL!');
	}
});

// add the event to the first item
settingsRow.addEventListener('click', function (e) {
	Titanium.API.info("Oeffne Settings");
	tab1.open(sub_win1);
});
