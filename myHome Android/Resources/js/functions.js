// Android Menü
var rootDir = Titanium.Filesystem.getApplicationDataDirectory();
var activity = Ti.Android.currentActivity;
activity.onCreateOptionsMenu = function(e) {
    var menu = e.menu;
	
	// Funktionen
    var menuItem = menu.add({ title: "Funktionen" });
    //menuItem.setIcon("item1.png");
    menuItem.addEventListener("click", function(e) {
        Ti.API.info("Android Menu: Funktion was clicked!");
		//openWindow(rootDir+'menue.js',"Hauptmenü",true);
    });
	
	// Beenden
    var menuItem = menu.add({ title: "Beenden" });
    //menuItem.setIcon("item1.png");
    menuItem.addEventListener("click", function(e) {
        Ti.API.info(Ti.App.Properties.getInt('countWindow') + "Android Menu: Beenden was clicked! Exit App!!!");
		for(var c=0;c<=Ti.App.Properties.getInt('countWindow');c++) {
			Ti.API.info('Int:' + c);
			win1.close();
			win2.close();
    	}
    });
};

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
        win1.open({modal:true});
    }
}

function openWindow(url, title, anim) {

	var numberOfWindow = Ti.App.Properties.getInt('countWindow') + 1;
	Ti.App.Properties.setInt('countWindow',numberOfWindow);
    var win2 = Titanium.UI.createWindow({
		title:title,
        url: url,
		backgroundImage: 'images/darkfade.jpg'
    });

    if (Titanium.UI.currentTab != null) {
        Titanium.UI.currentTab.open(win2,{animated:anim});
    } else {
        win2.open({animated:anim,modal:true});
    }

}

function addEventToRow(theRow,theTitle, theUrl, theCurrentWindow, theRootWindow)
{
    //theOrientationModes = (typeof theOrientationModes == 'undefined') ? Titanium.UI.PORTRAIT : theOrientationModes;
	
	theRow.addEventListener('click',function(e)
    {
        Ti.API.info("menue click event");
		var detailWindow = Ti.UI.createWindow( {
	        title : theTitle,
	        url: theUrl,
			//orientationModes: [theOrientationModes],
	        _parent: theCurrentWindow,
	        rootWindow : theRootWindow
    	});
	
	detailWindow.open;
	
    });
};