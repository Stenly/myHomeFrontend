// Hauptmenue - Alpha

var main_menu = Titanium.UI.createWindow ({
	title: "Hauptmenü",
	backgroundColor:"black",
	exitOnClose: true,
	orientationModes: [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT]
});

// Android Menü
var activity = Titanium.Android.currentActivity;
activity.onCreateOptionsMenu = function(e) {
    var menu = e.menu;
    var menuItem = menu.add({ title: "Funktionen" });
    menuItem.setIcon("/icons/home.png");
    menuItem.addEventListener("click", function(e) {
        Titanium.API.debug("Funktionen was clicked");
    });
};

main_menu.open({fullscreen:true});

// View-Title
var labelTitle = Titanium.UI.createLabel({
	text:'Hauptmenü',
    width:'auto',
    shadowColor:'#aaa',
    shadowOffset:{x:5,y:5},
    color:'#900',
    font:{fontSize:30},
    textAlign:'center'
});

// myHome-Logo
var image = Titanium.UI.createImageView({
	width:'220',
	height:'53',
	top:'5',
	url:'images/logo_weiss.png'
});

var data = [];

// Listenansicht erstellen / Unterschiedliche Icons fuer Android und Iphone moeglich
//if (Titanium.Platform.name == 'android') {

	data.push({leftImage:'/icons/an_ebene.png', title:'Ebene', hasChild:true, url:'/main_windows/ebene.js'});
	data.push({leftImage:'/icons/an_ebene.png', title:'Räume', hasChild:true, url:'/main_windows/raeume.js'});
	data.push({leftImage:'/icons/an_licht.png', title:'Licht', hasChild:true, url:'/main_windows/licht.js'});
	data.push({leftImage:'/icons/an_heizung.png', title:'Heizung', hasChild:true, url:'/main_windows/heizung.js'});
	data.push({leftImage:'/icons/an_kamera.png', title:'Kamera', hasChild:true, url:'/main_windows/kamera.js'});


 /**
} else if (Titanium.Platform.name == 'iPhone OS') {
	data.push({leftImage:'/icons/an_ebene.png', title:'Ebene', hasChild:true, url:'/main_windows/ebene.js'});
	data.push({leftImage:'/icons/an_ebene.png', title:'Räume', hasChild:true, url:'/main_windows/raeume.js'});
	data.push({leftImage:'/icons/an_licht.png', title:'Licht', hasChild:true, url:'/main_windows/licht.js'});
	data.push({leftImage:'/icons/an_heizung.png', title:'Heizung', hasChild:true, url:'/main_windows/heizung.js'});
	data.push({leftImage:'/icons/an_kamera.png', title:'Kamera', hasChild:true, url:'/main_windows/kamera.js'});
}
**/

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	top:'78'
});

// create table view event listener
tableview.addEventListener('click', function(e) {
	if (e.rowData.url)	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.url,
			title:e.rowData.title
		});
		win.open({fullscreen:true});
	}
});

// add table view to the window
//main_menu.add(labelTitle); Title wird beim Windows direkt erstellt!
main_menu.add(image); //logo
main_menu.add(tableview);
// main_menu.add(scrollBox);