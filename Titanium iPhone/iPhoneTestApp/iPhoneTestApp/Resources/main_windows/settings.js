// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;


	

// set the data from the database to the array

	

	var row = Ti.UI.createTableViewRow({height:50});
	var tf1 = null;
	tf1 = Titanium.UI.createTextField({
			color:'#336699',
			height:35,
			top:10,
			left:10,
			width:250,
			hintText: Titanium.App.Properties.getString('url'),
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
		});
	row.add(tf1);
	row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
	
var data = [];

data[0] = row;


var tableView = Ti.UI.createTableView({
	data:data,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

// add the tableView to the current window
currentWin.add(tableView);
var loginBtn = Titanium.UI.createButton({
	title:'Save',
	top:110,
	width:90,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
currentWin.add(loginBtn);

loginBtn.addEventListener('click',function(e)
{
	if (tf1.value != '')
	{
		Titanium.API.info('New URL: ' + tf1.value);		
		Titanium.App.Properties.setString('url', tf1.value);
		
		var db = Titanium.Database.install("../db/myHome.sqlite", 'setting');
		var exec = db.execute("UPDATE settings SET URL = " + tf1.value);
		db.close();
	}
	else
	{
		Titanium.API.info('No New URL!');
	}
});