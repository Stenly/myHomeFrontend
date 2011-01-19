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