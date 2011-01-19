var sub_win1 = Titanium.UI.currentWindow;;

var logo = Titanium.UI.createImageView({
	image: "../images/logo.png",
	width: '59px',
	height: '59px',
	top: '10px'
});

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
	value: Titanium.App.Properties.getString('url')
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

var statusLabel = Titanium.UI.createLabel({
	color: '#fff',
	top: 210,
	left: 25
});

sub_win1.add(statusLabel);

saveBtn.addEventListener('click',function(e)
{
	if (loginUrl.value != '')
	{
		Titanium.API.info('New URL: ' + loginUrl.value);		
		Titanium.App.Properties.setString('url', loginUrl.value);
		
		var db2 = Titanium.Database.install("../db/myHome4.sqlite", 'myHome4');
		db2.execute("UPDATE url SET url = ? WHERE ID = 1", loginUrl.value);
		db2.close();
		
		statusLabel.text = 'Neue Login URL (' + loginUrl.value + ') gespeichert.';
	}
	else
	{
		Titanium.API.info('No New URL!');
	}
});